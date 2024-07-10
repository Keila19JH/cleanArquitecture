import { userData } from "../../data/data";
import { AuthDatasource, CustomError, LoginUserDto, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user.mapper";



export class AuthDatasourceImpl implements AuthDatasource {

    
    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        
        const {email, password} = loginUserDto;
       
        const user = userData.find( user => user.email === email && user.password === password );
        
        if (!user) throw CustomError.badRequest('User does not exists');

        return UserMapper.userEntityFromObject(user);
    }


    
} 