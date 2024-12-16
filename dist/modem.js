"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DockerModem = void 0;
const http = __importStar(require("http"));
class DockerModem {
    constructor(config) {
        this.protocol = config.protocol;
        this.host = config.host;
        this.port = config.port;
        this.socketPath = config.socketPath;
    }
    async request(endpoint, method) {
        return new Promise((resolve, reject) => {
            const socketPath = this.socketPath;
            const options = {
                socketPath: socketPath,
                path: endpoint,
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const req = http.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
                        try {
                            resolve(JSON.parse(data)); // Parse JSON response
                        }
                        catch (err) {
                            reject(`Failed to parse JSON: ${err}`);
                        }
                    }
                    else {
                        reject(`Request failed with status code: ${res.statusCode}`);
                    }
                });
            });
            req.on('error', (err) => {
                reject(`Request error: ${err.message}`);
            });
            req.end();
        });
    }
}
exports.DockerModem = DockerModem;
