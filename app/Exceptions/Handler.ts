import Logger from '@ioc:Adonis/Core/Logger';
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class ExceptionHandler extends HttpExceptionHandler {
    constructor() {
        super(Logger);
    }
    public async handle(error: any, { response, i18n, logger }: HttpContextContract) {
        logger.info(error);
        if (error.code === 'E_VALIDATION_FAILURE') {
            console.log(error.messages);
            // error.messages.message = error.messages;
            return response.status(200).json({ success: 0, message: error.messages.message });
        }
        if (error.code === 'E_ROW_NOT_FOUND') {
            // error.messages.message = error.messages.data[0].message;
            return response.status(200).json({ success: 0, message: error.message });
        }
        return response.status(200).send({ success: 0, message: error.message });
    }
}
