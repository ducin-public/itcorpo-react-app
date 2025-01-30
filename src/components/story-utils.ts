export function assertExists<T>(t: T): asserts t is NonNullable<T> {
    if (t === null || t === undefined) {
        throw new Error(`Expected 't' to be defined, but received ${t}`);
    }
}

export function getArgsPropsOrDie<TArgs, K extends keyof TArgs>(args: TArgs | undefined, k: K): NonNullable<TArgs[K]> {
    // assertExists(args);
    if (args === null || args === undefined) {
        throw new Error(`Expected 'args' to be defined, but received ${args}`);
    }

    // assertExists(args[k]);
    const propValue = args[k];
    if (propValue === null || propValue === undefined) {
        throw new Error(`Expected 'args.${k.toString()}' to be defined, but received ${propValue}`);
    }
    return propValue;
}
