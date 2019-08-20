// Copyright (c) fangqifan@kirinsoft.cn. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

import { HttpClient, HttpError, HttpRequest, HttpResponse } from "@aspnet/signalr";

export class PipelineHttpClient extends HttpClient {
    private requestMethod: (requestObj: any) => Promise<{ statusCode: any, data: any }>;

    public constructor(request: (requestObj: any) => Promise<{ statusCode: any, data: any }>) {
        super();
        this.requestMethod = request;
    }

    /** @inheritDoc */
    public send(request: HttpRequest): Promise<HttpResponse> {
        // Check that abort was not signaled before calling send
        if (request.abortSignal && request.abortSignal.aborted) {
            return Promise.reject(new Error("request is aborted"));
        }

        if (!request.method) {
            return Promise.reject(new Error("No method defined."));
        }
        if (!request.url) {
            return Promise.reject(new Error("No url defined."));
        }

        return new Promise<HttpResponse>((resolve, reject) => {
            const requestObj: any = {};

            requestObj.url = request.url;
            requestObj.method = request.method;
            requestObj.dataType = "text";
            requestObj.header = {
                "content-type": "text/plain;charset=UTF-8",
            };
            requestObj.data = request.content || "";

            const headers = request.headers;
            if (headers) {
                Object.keys(headers)
                    .forEach((header) => {
                        requestObj.header[header] = headers[header];
                    });
            }

            if (request.responseType) {
                requestObj.responseType = request.responseType;
            }

            this.requestMethod(requestObj)
                .then((result: any) => {
                    resolve(new HttpResponse(result.statusCode, result.statusCode.toString(), result.data));
                })
                .catch(() => {
                    reject(new HttpError("request failed.", 0));
                });
        });
    }
}
