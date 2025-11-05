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
	// this throw an error
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
			response: {
				200: z.object({
					name: z.string(),
					date: z.date(),
				}),
			},
		},
	)
	.listen(3000, ({ port, hostname }) =>
		console.log(`Server started on http://${hostname}:${port}`),
	);
