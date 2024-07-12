import { Request, Response, Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl } from "../../infrastruture/datasources/auth.datasource.impl";
import { AuthRepositoryImpl } from "../../infrastruture/repositories/auth.repository.impl";
import { AuthMiddleware } from "../middlewares/auth.middleware";


export class AuthRoutes {

    static get routes(): Router {
        const router = Router();

        const datasource = new AuthDatasourceImpl();
        const repository = new AuthRepositoryImpl(datasource);
    
        const controller = new AuthController(repository);

        router.post('/login', controller.loginUser );

        router.post('/register', controller.registerUser);

        router.get(
            '/renew',
            [ AuthMiddleware.validateJWT ], 
            controller.renew
        );

        return router;
    }

}