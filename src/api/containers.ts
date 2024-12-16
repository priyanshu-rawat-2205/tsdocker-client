import { DockerModem } from "../modem";

export class Containers {
    private modem: DockerModem;

    constructor(modem: DockerModem) {
        this.modem = modem;
    }

    // List containers
    async list(query?: string): Promise<any> {
        try {
            let url = '/containers/json'
            if (query){
                url += query
            }
            const response = await this.modem.request(url, 'GET');
            return response;
        } catch (err) {
            return err;
        }

    }
}
