import * as http from 'http'
import * as qs from 'qs';
import { WebSocket } from 'ws';

interface DockerModemConfig {
    socketPath?: string;
    protocol?: "http" | "https";
    host: string;
    port?: number;
}

export class DockerModem {
  private protocol?: string;
  private host: string;
  private port?: number;
  private socketPath?: string;

  constructor(config: DockerModemConfig) {
    this.protocol = config.protocol;
    this.host = config.host;
    this.port = config.port;
    this.socketPath = config.socketPath;
  }

  public async request(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    queryParams?: Record<string, any>
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const queryString = queryParams ? qs.stringify(queryParams) : undefined;
      const fullPath = queryString ? `${endpoint}?${queryString}` : endpoint;

      const socketPath = this.socketPath;

      const options: http.RequestOptions = {
        socketPath: socketPath,
        path: fullPath,
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const req = http.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            try {
              resolve(JSON.parse(data)); // Parse JSON response
            } catch (err) {
              reject(`Failed to parse JSON: ${err}`);
            }
          } else {
            reject(`Request failed with status code: ${res.statusCode}`);
          }
        });
      });

      req.on('error', (err) => {
        reject(`Request error: ${err.message}`);
      });

      req.end();
    });
  }
}