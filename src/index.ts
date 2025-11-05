import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";
import { z } from "zod";

new Elysia()
	.use(
		openapi({
			mapJsonSchema: {
				zod: z.toJSONSchema,
			},
		}),
	)
	.get(
		"/error/hello/:name",
		({ params, status }) => {
			const date = new Date();

			return status(200, {
				name: params.name,
				date,
			});
		},
		{
			// Issue: z.date() does not properly serialize to OpenAPI schema
			// The response schema is not visible in the generated OpenAPI documentation
			// because z.date() doesn't translate well to JSON Schema format
			response: {
				200: z.object({
					name: z.string(),
					date: z.date(),
				}),
			},
		},
	)
	.get(
		"/hello/:name",
		({ params, status }) => {
			const date = new Date();

			return status(200, {
				name: params.name,
				// TypeScript error: Type 'Date' is not assignable to type 'string'
				// z.iso.date() expects an ISO date string, but we're passing a Date object
				date,
			});
		},
		{
			// Solution: z.iso.date() properly serializes to OpenAPI schema as a string format
			// The response schema is correctly displayed in the OpenAPI documentation
			// However, runtime values must be ISO date strings, not Date objects
			response: {
				200: z.object({
					name: z.string(),
					date: z.iso.date(),
				}),
			},
		},
	)
	.listen(3000, ({ port, hostname }) =>
		console.log(`Server started on http://${hostname}:${port}`),
	);
