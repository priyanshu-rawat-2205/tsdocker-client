import { DockerModem } from "../../modem";

type ContainerListQuery = {
  all?: '0' | '1' | 'true' | 'false';
  limit?: string;
  size?: '0' | '1' | 'true' | 'false';
  filters?: string;
};

export class ContainerListContext {
  private modem: DockerModem;
  private query: ContainerListQuery = {};
  private endpoint: string = '/containers/json';

  constructor(modem: DockerModem) {
    this.modem = modem;
  }

  public all(): this {
    this.query.all = '1';
    return this;
  }

  public limit(value: number | string): this {
    this.query.limit = value.toString();
    return this;
  }

  public size(): this {
    this.query.size = '1';
    return this;
  }

  public filters(value: Record<string, any>): this {
    this.query.filters = JSON.stringify(value);
    return this;
  }

  public async exec(): Promise<any[]> {
    return await this.modem.request(this.endpoint, 'GET', this.query);
  }
}
