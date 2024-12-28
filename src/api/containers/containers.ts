import { DockerModem } from "../modem";
import { ContainerInspectContext, ContainerListContext, ContainerProcessContext } from './context';

export class Container {
    //endpoint: '/containers/json'
    private modem: DockerModem;

    constructor(modem: DockerModem) {
        this.modem = modem;
    }

    public list(): ContainerListContext {
        return new ContainerListContext(this.modem);
    }

    public inspect(containerID: string): ContainerInspectContext {
        return new ContainerInspectContext(this.modem, containerID)
    }

    public processes(containerID: string): ContainerProcessContext {
        return new ContainerProcessContext(this.modem, containerID)
    }

}
