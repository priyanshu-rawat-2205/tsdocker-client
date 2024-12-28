import { DockerModem } from "../../modem";

export class ContainerInspectContext {
    private modem: DockerModem;
    private query: {size? : string} = {};
    private endpoint: string;

    constructor(modem: DockerModem, id: string){
        this.endpoint = `/containers/${id}/json`
        this.modem = modem
    }

    public size() : this {
        this.query.size = '1'
        return this
    }

    public async exec(): Promise<any[]> {
        return await this.modem.request(this.endpoint, 'GET', this.query);
    }

}