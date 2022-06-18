import { NormalizeConstructor } from '@ioc:Adonis/Core/Helpers';
import { BaseModel } from '@ioc:Adonis/Lucid/Orm';
import I18n from '@ioc:Adonis/Addons/I18n';
import HttpContext from '@ioc:Adonis/Core/HttpContext';

const Functions = <T extends NormalizeConstructor<typeof BaseModel>>(superclass: T) => {
    return class extends superclass {
        public static local = 'en';
        public static getMessage = function (message: string, data: object = {}) {
            let { i18n } = HttpContext.get()!;
            try {
                return I18n.locale(i18n?.locale || this.locale).formatMessage(message, data || {});
            } catch (err) {
                return message;
            }
        };
        public static getResponse = function (err: number, msg: string, data: any = {}, ...option: any[]) {
            let response = {
                success: err,
                message: this.getMessage(msg, data),
                data: data,
            };
            option.map((n) => Object.keys(n).map((m) => (response[m] = n[m])));
            return response;
        };
    };
};

export default Functions;
