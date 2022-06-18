import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MyReporter } from 'App/Validators/Reporters/MyReporter'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}
  public reporter = MyReporter

  public schema = schema.create({
    username: schema.string({}, [
      rules.minLength(3),
      rules.maxLength(50),
      rules.unique({ table: 'users', column: 'username' }),
    ]),
    email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string({}, [
      rules.minLength(8),
      rules.maxLength(100),
      rules.confirmed('confirm_password'),
    ]),
    confirm_password: schema.string({}, [rules.confirmed('password')]),
  })

  public messages = this.ctx.i18n.validatorMessages('user.register')
}
