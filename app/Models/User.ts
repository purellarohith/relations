import { DateTime } from 'luxon';
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm';
import Hash from '@ioc:Adonis/Core/Hash';
import { compose } from '@ioc:Adonis/Core/Helpers';
import Functions from 'App/Services/Fuctions';
import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import { ResponseContract } from '@ioc:Adonis/Core/Response';
import { UserValidatorType } from 'App/Controllers/Http/UserController';

export default class User extends compose(BaseModel, Functions) {
    @column({ isPrimary: true })
    public id: number;

    @column()
    public username: string;

    @column()
    public email: string;

    @column()
    public password: string;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;

    @beforeSave()
    public static async hashPassword(user: User) {
        if (user.$dirty.password) {
            user.password = await Hash.make(user.password);
        }
    }

    static async login(auth: AuthContract, username: string, password: string, response: ResponseContract) {
        let user = User.query();
        let user_data: UserValidatorType = await user.where('username', username).firstOrFail();
        let token = await auth.attempt(user_data.email, password, { expiresIn: '7days' });
        delete user_data.password;
        return User.getResponse(1, 'user.login.success', user_data, { token });
    }
}
