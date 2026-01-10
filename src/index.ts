import { Effect, Schema } from "effect";
import { Elysia } from "elysia";

import { runtime } from "./runtime";

const program = Effect.gen(function* () {
	return new Elysia()
		.get("/", () => new Date(), {
			response: {
				200: Schema.standardSchemaV1(Schema.Date),
			},
		})
		.listen(8080, ({ hostname, port }) =>
			runtime.runSync(Effect.log(`Server is running on ${hostname}:${port}`)),
		);
});

const app = await runtime.runPromise(program);

export type App = typeof app;
