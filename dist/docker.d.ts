import { Container } from "./api";
export declare class Docker {
    private modem;
    constructor(socketPath: string);
    container(): Container;
}
