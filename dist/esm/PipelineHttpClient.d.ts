import { HttpClient, HttpRequest, HttpResponse } from "@aspnet/signalr";
export declare class PipelineHttpClient extends HttpClient {
    private requestMethod;
    constructor(request: (requestObj: any) => Promise<{
        statusCode: any;
        data: any;
    }>);
    /** @inheritDoc */
    send(request: HttpRequest): Promise<HttpResponse>;
}
