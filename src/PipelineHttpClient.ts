// Copyright (c) fangqifan@kirinsoft.cn. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

import { HttpClient, HttpError, HttpRequest, HttpResponse } from "@aspnet/signalr";
import { Contracts } from "./dts/miniapp-middleware-contracts";
import { MiddlewareManager } from "./dts/request-middleware-pipeline";

export class PipelineHttpClient extends HttpClient {
    private manager: MiddlewareManager;
    private contracts: Contracts;

    public constructor(manager: MiddlewareManager, contracts: Contracts) {
        super();
        this.manager = manager;
        this.contracts = contracts;
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
            const contextData: any = {};
            const requestObj: any = {};

            contextData[this.contracts.WxRequestOptions] = requestObj;

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

            this.manager.request({})
                .then((data: any) => {
                    if (data[this.contracts.WxResponse].statusCode >= 200 && data[this.contracts.WxResponse].statusCode < 300) {
                        resolve(new HttpResponse(data[this.contracts.WxResponse].statusCode, data[this.contracts.WxResponse].statusCode.toString(), data[this.contracts.WxResponseData]));
                    } else {
                        reject(new HttpError("request failed.", data[this.contracts.WxResponse].statusCode));
                    }
                })
                .catch(() => {
                    reject(new HttpError("request failed.", 0));
                });
        });
    }
}
