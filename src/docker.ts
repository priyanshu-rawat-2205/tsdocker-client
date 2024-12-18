import { DockerModem } from "./api";
import { Container } from "./api";

export class Docker {
    private modem: DockerModem;

    constructor(socketPath: string){
        this.modem = new DockerModem({socketPath: socketPath, host: 'localhost'})
    }

    public container(): Container {
        return new Container(this.modem)
    }
}