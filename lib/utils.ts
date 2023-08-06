import { DefaultUser } from 'next-auth';
import { Base64UUID } from 'base64-uuid';
import slugify from 'slugify';

import { v4 as uuid } from 'uuid';
import { USER_AUTH_TYPE } from '@prisma/client';
import { HACKATHON_SUB_STATUS, USER_ROLE, User } from '@/const';
import { format, isValid } from 'date-fns';
export class Utils {
    static genUUID(removeDashes = false) {
        return removeDashes ? uuid().split('-').join('') : uuid();
    }
    static shortId(len = 10) {
        return Base64UUID.generate(len);
    }
    static slugify(text: string, addID = true) {
        const slug = slugify(text, {
            lower: true,
            remove: /[*+~.()'"!:@]/g,
            strict: true,
        });

        return addID ? `${slug}-${this.shortId()}` : slug;
    }
    static checkAuthType(authType: USER_AUTH_TYPE) {
        return {
            isGoogle: authType === 'GOOGLE',
            isGithub: authType === 'GITHUB',
            isCredentials: authType === 'CREDENTIALS',
        };
    }
    static checkHackathonSubStatus(
        subStatus: keyof typeof HACKATHON_SUB_STATUS
    ) {
        return {
            isEnded: subStatus === 'ENDED',
            isOngoing: subStatus === 'ONGOING',
            isUpcoming: subStatus === 'UPCOMING',
        };
    }
    static checkUserRole(user: Partial<User> | DefaultSession['user']) {
        return {
            isAdmin: user?.role === 'ADMIN',
            isMod: user?.role === 'MOD',
            isBasic: user?.role === 'BASIC',
        };
    }
    static formatCurrency(amount: number = 0) {
        return (+amount).toLocaleString();
    }
    static genUsername(name = '') {
        return slugify(`${name} ${this.shortId(4)}`, { replacement: '_' });
    }
    static getCurrencySymbol(currency = 'USD') {
        const currencyCodes = {
            USD: '$',
            EUR: '€',
            GBP: '£',
            INR: '₹',
            NGN: '₦',
        };
        return currencyCodes[currency as keyof typeof currencyCodes];
    }
    static dynamicBorderColor = (
        hackathonStatus: keyof typeof HACKATHON_SUB_STATUS
    ) => {
        let color = '';
        switch (hackathonStatus) {
            case 'ONGOING':
                color = 'teal';
                break;
            case 'ENDED':
                color = 'gray.500';
                break;

            default:
                color = 'red.500';
                break;
        }
        return color;
    };
    static isSameUser(
        userLeft?: User|null,
        userRight?: DefaultSession['user']
    ) {
        return userLeft?.id === userRight?.id;
    }
    static formatDate(
        date: Date | string | number,
        dateFormat = 'dd/MM/yyyy HH:mm'
    ) {
        const _date = new Date(date);
        if (isValid(_date)) {
            return format(_date, dateFormat);
        }
        return '';
    }
}

export class MailHandler {
    static sendMailer() {}
}
