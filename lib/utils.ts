import { Base64UUID } from "base64-uuid";
import slugify from "slugify";
import dotenv from "dotenv";
import {
  MdAttachMoney,
  MdEuro,
  MdCurrencyRupee,
  MdCurrencyPound,
} from "react-icons/md";
dotenv.config();

import { v4 as uuid } from "uuid";
import { USER_AUTH_TYPE } from "@prisma/client";
export class Utils {
  static genUUID(removeDashes = false) {
    return removeDashes ? uuid().split("-").join("") : uuid();
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
      isGoogle: authType === "GOOGLE",
      isGithub: authType === "GITHUB",
      isCredentials: authType === "CREDENTIALS",
    };
  }
  static formatCurrency(amount: number = 0) {
  
   
    return  (+amount).toLocaleString()
    
  }
  static getCurrencySymbol(currency='USD'){
    const currencyCodes = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      INR: '₹',
      NGN: '₦',
    };
return currencyCodes[currency as keyof typeof currencyCodes]

  }
  
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
};
