import { DockerModem } from "../modem";
export declare class Containers {
    private modem;
    constructor(modem: DockerModem);
    list(query?: string): Promise<any>;
}
