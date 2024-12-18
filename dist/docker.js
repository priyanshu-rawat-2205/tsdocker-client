"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Docker = void 0;
const api_1 = require("./api");
const api_2 = require("./api");
class Docker {
    constructor(socketPath) {
        this.modem = new api_1.DockerModem({ socketPath: socketPath, host: 'localhost' });
    }
    container() {
        return new api_2.Container(this.modem);
    }
}
exports.Docker = Docker;
