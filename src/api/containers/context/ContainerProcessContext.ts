import { DockerModem } from "../../modem";

export class ContainerProcessContext {
    /* 
        This endpoint is not supported in windows
        kindly use it only in linux/unix environment

        This will only run on running container on exited
        and stopped containers it'll give status 4**
    */

    private modem: DockerModem;
    private endpoint: string;
    private query: {ps_args?: string} = {}

    constructor(modem: DockerModem, id: string){
        this.modem = modem;
        this.endpoint = `/containers/${id}/top`
    }

    public args(value: string): this {
        this.query.ps_args = JSON.stringify(value);
        return this
    }

    public async exec(){
        return await this.modem.request(this.endpoint, 'GET', this.query)
    }
}