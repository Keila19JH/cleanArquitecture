import express, { Router } from 'express';
import path from 'path';
import cors from 'cors';

interface Options {
    port: number,
    routes: Router,
    public_path?: string,
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;


    constructor(options: Options){
        const {port, routes, public_path='public'} = options;

        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start(){

        //middlewares
        this.app.use( express.json() );

        this.app.use( cors() );

        this.app.use( express.urlencoded( { extended: true} ) );

        this.app.use( express.static( this.publicPath ) );

        this.app.use( this.routes );

        //SPA
        this.app.get('*', (req, res) => {
            const indextPath = path.join( __dirname + `../../../${ this.publicPath}/index.html`);
            res.sendFile(indextPath);
        });

        this.app.listen( this.port, () => {
            console.log(`Server running on port ${ this.port }`);
        });


    }

}