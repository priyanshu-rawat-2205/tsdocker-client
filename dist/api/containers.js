"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Containers = void 0;
class Containers {
    constructor(modem) {
        this.modem = modem;
    }
    // List containers
    async list(query) {
        try {
            let url = '/containers/json';
            if (query) {
                url += query;
            }
            const response = await this.modem.request(url, 'GET');
            return response;
        }
        catch (err) {
            return err;
        }
    }
}
exports.Containers = Containers;
