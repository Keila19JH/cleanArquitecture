import {  Response, Request } from "express"
import { AuthRepository, CustomError, LoginUser, LoginUserDto } from "../../domain"




export class AuthController {
    constructor(
        private readonly authRepository: AuthRepository
    ){}

    private handleError = (error: unknown, res: Response) => {
        if( error instanceof CustomError){
            return res.status(error.statusCode).json({
                error: error.message
            });
        }

        return res.status(500).json({error: 'Internal Server Error'})
    }


    loginUser = (req: Request, res: Response) => {

        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if( error ) return res.status(400).json({ error: error});


        new LoginUser( this.authRepository )
            .execute( loginUserDto! )
            .then( data => res.json(data) )
            .catch( error => this.handleError(error, res));

    }




}