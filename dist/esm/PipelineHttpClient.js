// Copyright (c) fangqifan@kirinsoft.cn. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { HttpClient, HttpError, HttpResponse } from "@aspnet/signalr";
var PipelineHttpClient = /** @class */ (function (_super) {
    __extends(PipelineHttpClient, _super);
    function PipelineHttpClient(request) {
        var _this = _super.call(this) || this;
        _this.requestMethod = request;
        return _this;
    }
    /** @inheritDoc */
    PipelineHttpClient.prototype.send = function (request) {
        var _this = this;
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
        return new Promise(function (resolve, reject) {
            var requestObj = {};
            requestObj.url = request.url;
            requestObj.method = request.method;
            requestObj.dataType = "text";
            requestObj.header = {
                "content-type": "text/plain;charset=UTF-8",
            };
            requestObj.data = request.content || "";
            var headers = request.headers;
            if (headers) {
                Object.keys(headers)
                    .forEach(function (header) {
                    requestObj.header[header] = headers[header];
                });
            }
            if (request.responseType) {
                requestObj.responseType = request.responseType;
            }
            _this.requestMethod(requestObj)
                .then(function (result) {
                resolve(new HttpResponse(result.statusCode, result.statusCode.toString(), result.data));
            })
                .catch(function () {
                reject(new HttpError("request failed.", 0));
            });
        });
    };
    return PipelineHttpClient;
}(HttpClient));
export { PipelineHttpClient };
//# sourceMappingURL=PipelineHttpClient.js.map