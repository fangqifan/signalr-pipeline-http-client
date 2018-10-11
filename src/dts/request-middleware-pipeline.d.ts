export declare class Middleware {
    constructor(e: any);

    invoke(): void;

    next(t: any, ...args: any[]): any;

    setNextMiddleware(e: any): void;

}

export declare class MiddlewareContext {
    constructor(e: any, ...args: any[]);

    static prototype: {
        data: any;
        middlewareManager: any;
    };

}

export declare class MiddlewareManager {
    constructor();

    clear(): void;

    registerInstance(t: any): any;

    registerType(t: any, ...args: any[]): any;

    request(...args: any[]): any;

}

export as namespace RequestMiddlewarePipeline;