import { DockerModem } from "./api";
import { Container } from "./api";

export class Docker {
    private modem: DockerModem;

    constructor(modem: DockerModem){
        this.modem = modem
    }

    public container(): Container {
        return new Container(this.modem)
    }
}