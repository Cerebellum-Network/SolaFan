export type GuardType<T> = T extends (x: any, ...rest: any) => x is infer U ? U : never;
