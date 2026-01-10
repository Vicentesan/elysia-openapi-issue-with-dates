import { Layer, Logger, ManagedRuntime } from "effect";

const MainLive = Layer.mergeAll(Logger.pretty);

export const runtime = ManagedRuntime.make(MainLive);
