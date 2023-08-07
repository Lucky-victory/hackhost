import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
export async function GET(request: Request) {
    try {
        // var transporter = nodemailer.createTransport({
        //   service: "gmail",
        //   auth: {
        //     user: "teachmeagric@gmail.com",
        //     pass: "@#Myagric.247",
        //   },
        // });

        // var mailOptions = {
        //   from: "luckyvictory54@gmail.com",
        //   to: "skrrpapa14@gmail.com",
        //   subject: "Sending Email using Node.js",
        //   text: "That was easy!",
        // };

        // transporter.sendMail(mailOptions, function (error, info) {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     console.log("Email sent: " + info.response);
        //   }
        // });
        return NextResponse.json({
            message: 'Mail sent',
        });
    } catch (error) {
        throw NextResponse.json({
            message: 'error sending mail',
        });
    }
}
