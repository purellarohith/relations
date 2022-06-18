import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import UserValidator from 'App/Validators/UserValidator';

export interface UserValidatorType {
    email: string;
    username: string;
    password?: string;
    confirm_password?: string;
}

export default class UserController {
    public async store({ request }: HttpContextContract) {
        let user_data: UserValidatorType = await request.validate(UserValidator);
        let user = User;
        delete user_data.confirm_password;
        await user.create(user_data);
        delete user_data.password;
        return User.getResponse(1, 'user.success', user_data);
    }

    public async login({ request, auth, response }: HttpContextContract) {
        let user = User;
        let { user_name, password } = await request.all();
        if (user_name && password) {
            return user.login(auth, user_name, password, response);
        } else {
            return User.getResponse(0, 'user.login.fail');
        }
    }
}
