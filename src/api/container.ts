import { DockerModem } from "./modem";

type ContainerListQuery = {
  all?: '0' | '1' | 'true' | 'false';
  limit?: string;
  filters?: string;
};


class ContainerListContext {
    private modem: DockerModem;
    private query: ContainerListQuery = {};
    private endpoint: string;

    constructor(modem: DockerModem, endpoint: string) {
        this.modem = modem;
        this.endpoint = endpoint;
    };

    public all(): this {
        this.query.all = '1';
        return this;
    }

    public limit(value: number | string): this {
        this.query.limit = value.toString();
        return this;
    }

    public filters(value: Record<string, any>): this {
        this.query.filters = JSON.stringify(value);
        return this;
    }

    public async exec(): Promise<any[]> {
        return await this.modem.request(this.endpoint, 'GET', this.query)
    }

}

export class Container {
    private modem: DockerModem;
    private endpoint: string = '/containers/json'

    constructor(modem: DockerModem) {
        this.modem = modem;
    }

    public list(): ContainerListContext {
        return new ContainerListContext(this.modem, this.endpoint);
    }
}
