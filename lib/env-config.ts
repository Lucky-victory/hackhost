import dotenv from 'dotenv';

dotenv.config();

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
