import { Base64UUID } from "base64-uuid";
import slugify from "slugify";

import { v4 as uuid } from 'uuid'
export class Utils{

    static genUUID(removeDashes = false) {
        return removeDashes? uuid().split('-').join(''):uuid()
    }
    static shortId(len=10) {
        return Base64UUID.generate(len)
    }
    static slugify(text: string, addID = true) {
        const slug = slugify(text, {
          lower: true,
          remove: /[*+~.()'"!:@]/g,strict:true
        });
    
        return addID ? `${slug}-${this.shortId()}`:slug
    }
}
