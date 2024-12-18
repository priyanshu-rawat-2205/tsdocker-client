"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
class ContainerListContext {
    constructor(modem, endpoint) {
        this.query = {};
        this.modem = modem;
        this.endpoint = endpoint;
    }
    ;
    all() {
        this.query.all = '1';
        return this;
    }
    limit(value) {
        this.query.limit = value.toString();
        return this;
    }
    filters(value) {
        this.query.filters = JSON.stringify(value);
        return this;
    }
    async exec() {
        return await this.modem.request(this.endpoint, 'GET', this.query);
    }
}
class Container {
    constructor(modem) {
        this.endpoint = '/containers/json';
        this.modem = modem;
    }
    list() {
        return new ContainerListContext(this.modem, this.endpoint);
    }
}
exports.Container = Container;
