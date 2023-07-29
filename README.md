# HackHost
## Inspiration
The inspiration behind HackHost came from the realization that there were no open-source alternatives for hosting hackathons, sparked by TiDB's idea list. We aimed to fill this gap and empower organizers to effortlessly manage hackathon events.

## What it does
HackHost is an open-source platform that simplifies hackathon hosting. It offers a user-friendly interface built with chakra-ui, Next.js, Prisma, and TiDB Serverless. The app provides seamless authentication using next-auth.js, cloudinary for asset management, and Redux Toolkit for state management. Organizers can create, customize, and manage hackathons, while participants can easily register, form teams, and submit projects.

## How we built it
HackHost was meticulously crafted using Next.js 13, making the most of Prisma's ease of use, and the rapid development capabilities of chakra-ui library. We learned to navigate and leverage these tools effectively to create a robust platform.

## Challenges we ran into
During development, we encountered challenges with Next.js 13's app directory setup, requiring 'use client' inclusion in all pages for chakra-ui components to function correctly. However, we persevered, finding effective solutions to ensure a seamless user experience.

## Accomplishments that we're proud of
We are immensely proud of successfully creating an open-source hackathon hosting platform that fills a crucial void in the hackathon community. Learning to utilize Prisma for the first time was a significant achievement, enabling us to build a solid foundation for HackHost. Moreover, mastering the chakra-ui library allowed us to develop applications faster and with exceptional design.

## What we learned
Throughout the development journey, we learned the power of Prisma's simplicity and effectiveness, which greatly contributed to the success of HackHost. Additionally, chakra-ui proved to be a game-changer, enhancing the overall user experience and speeding up the application development process.

## What's next for HackHost
Looking ahead, we plan to enhance HackHost further by implementing email notifications for users, introducing a user connection feature with the ability to follow others, and creating a comprehensive dashboard for organizers to gain deeper insights into their hackathons. The journey has just begun, and we are excited to continue refining HackHost based on valuable feedback and contributions from the community.


# Try it out
To run HackHost locally, the following environment variables are required

For TiDB Connection you can provide
```sh
TIDB_HOST=<YOUR TiDB HOST>
TIDB_PORT=<YOUR TiDB PORT>
TIDB_USER=<YOUR TiDB USER>
TIDB_PASSWORD=<YOUR TiDB PASSWORD>
TIDB_DB_NAME=<YOUR DATABASE NAME>
SSL_FLAGS=pool_timeout=60&sslaccept=accept_invalid_certs
```
or a Database URL 
```sh
DATABASE_URL=<=mysql://<TiDB_USER>:<TiDB_PASSWORD>@<TiDB_HOST>:<TiDB_PORT>/<DB_NAME>?sslaccept=accept_invalid_certs
>
```
In other to upload images, you will need to provide the following:
```sh
NEXT_PUBLIC_CLOUDINARY_CLOUDNAME=<your cloudinary cloud name>
NEXT_PUBLIC_CLOUDINARY_PRESET=<your cloudinary preset>
```
Then for authentication, provide the following
```sh
NEXTAUTH_SECRET=<A SECRET HERE>
GITHUB_CLIENT_ID=<GITHUB CLIENT ID HERE>
GITHUB_CLIENT_SECRET=<GITHUB CLIENT SECRET HERE>
GOOGLE_CLIENT_ID=<GOOGLE CLIENT SECRET ID>
GOOGLE_CLIENT_SECRET=<GOOGLE CLIENT SECRET HERE>
NEXTAUTH_URL=http://localhost:3000
```

## Run the app
Once you have setup you environment variables

Run the following commands.
```sh
npm install
npm run prisma:gen
npm run dev
```
Your application should be up and running on http://localhost:3000
