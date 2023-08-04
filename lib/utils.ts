import { Base64UUID } from 'base64-uuid';
import slugify from 'slugify';
import dotenv from 'dotenv';

dotenv.config();

import { v4 as uuid } from 'uuid';
import { USER_AUTH_TYPE } from '@prisma/client';
import { HACKATHON_SUB_STATUS, User } from '@/const';
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
    static formatCurrency(amount: number = 0) {
        return (+amount).toLocaleString();
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
    static isSameUser(userLeft: Partial<User>, userRight: Partial<User>) {
        return userLeft?.id === userRight?.id;
    }
}

export class MailHandler {
    static sendMailer() {}
}

export const envConfigs = {
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    nextauth: {
        url: process.env.NEXTAUTH_URL,
    },
    cloudinary: {
        preset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
    },
};
