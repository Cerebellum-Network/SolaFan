export type GetFirstArgumentType<Fn> = Fn extends (first: infer FirstArgument, ...args: unknown[]) => unknown
  ? FirstArgument
  : unknown;

export type GetPromiseResult<P> = P extends Promise<infer R> ? R : never;
