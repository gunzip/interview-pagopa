import { IncomingMessage, ServerResponse } from "http";
import { HTTP_CODES } from "../Models/Models";

/**
 * Handler is the base Class to handle Incoming Request and Outgoing Response
 * 
 */
export class Handler {

    protected req: IncomingMessage;
    protected res: ServerResponse;

    public constructor(req: IncomingMessage, res: ServerResponse) {
        this.req = req;
        this.res = res;
    }

    protected async handleVerbNotFound() {
        this.res.statusCode = HTTP_CODES.NOT_FOUND;
        this.res.write('Wrong Verb for method');
    }

    public async handleMethodNotFound() {
        this.res.statusCode = HTTP_CODES.NOT_FOUND;
        this.res.write('Wrong method');
    }

    /* istanbul ignore next */
    protected async getBody<T>(): Promise<T> {
        return new Promise((resolve, reject) => {
            let body = '';
            this.req.on('data', (data: string) => {
                body += data;
            });

            this.req.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                } catch (err) {
                    reject(err);
                }
            });

            this.req.on('error', (err: any) => {
                reject(err)
            });
        });
    }
}