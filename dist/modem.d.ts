interface DockerModemConfig {
    socketPath?: string;
    protocol?: "http" | "https";
    host: string;
    port?: number;
}
export declare class DockerModem {
    private protocol?;
    private host;
    private port?;
    private socketPath?;
    constructor(config: DockerModemConfig);
    request(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE'): Promise<any>;
}
export {};
