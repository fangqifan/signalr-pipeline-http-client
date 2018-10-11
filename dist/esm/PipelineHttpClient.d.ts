import { HttpClient, HttpRequest, HttpResponse } from "@aspnet/signalr";
import { Contracts } from "./dts/miniapp-middleware-contracts";
import { MiddlewareManager } from "./dts/request-middleware-pipeline";
export declare class PipelineHttpClient extends HttpClient {
    private manager;
    private contracts;
    constructor(manager: MiddlewareManager, contracts: Contracts);
    /** @inheritDoc */
    send(request: HttpRequest): Promise<HttpResponse>;
}
