import { DockerModem } from "./modem";
declare class ContainerListContext {
    private modem;
    private query;
    private endpoint;
    constructor(modem: DockerModem, endpoint: string);
    all(): this;
    limit(value: number | string): this;
    filters(value: Record<string, any>): this;
    exec(): Promise<any[]>;
}
export declare class Container {
    private modem;
    private endpoint;
    constructor(modem: DockerModem);
    list(): ContainerListContext;
}
export {};
