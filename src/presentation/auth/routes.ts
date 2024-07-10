import { Request, Response, Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl } from "../../infrastruture/datasources/auth.datasource.impl";
import { AuthRepositoryImpl } from "../../infrastruture/repositories/auth.repository.impl";


export class AuthRoutes {

    static get routes(): Router {
        const router = Router();

        const datasource = new AuthDatasourceImpl();
        const repository = new AuthRepositoryImpl(datasource);
    
        const controller = new AuthController(repository);

        router.post('/login', controller.loginUser );

        router.post('/register', (req: Request, res: Response) => {
            res.json({
                msg: 'usuario registrado correctamente'
            })
        });

        router.get('/renew', (req: Request, res: Response) => {
            res.json({
                msg: 'usuario renovado correctamente'
            })
        });

        return router;
    }

}