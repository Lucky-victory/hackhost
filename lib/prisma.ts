import { PrismaClient } from '@prisma/client';

const client = new PrismaClient({ log: ['info', 'query', 'error'] });

async function main() {
    const user = await client.user.create({
        data: { name: 'Lucky', email: 'lucky@test.com' },
    });
    console.log({ user });
}
main()
    .catch((err) => {
        console.log({ err });
    })
    .finally(async () => {
        await client.$disconnect();
    });
