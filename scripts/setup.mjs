import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import { faker } from "@faker-js/faker";
const {
  TIDB_USER,
  TIDB_PASSWORD,
  TIDB_HOST,
  TIDB_PORT,
  TIDB_DB_NAME = "hackhost",
  DATABASE_URL,
} = process.env;
// Notice: When using TiDb Cloud Serverless Tier, you **MUST** set the following flags to enable tls connection.
const SSL_FLAGS = "pool_timeout=60&sslaccept=accept_invalid_certs";
// TODO: When TiDB Cloud support return DATABASE_URL, we can remove it.
const databaseURL = DATABASE_URL
  ? `${DATABASE_URL}?${SSL_FLAGS}`
  : `mysql://${TIDB_USER}:${TIDB_PASSWORD}@${TIDB_HOST}:${TIDB_PORT}/${TIDB_DB_NAME}?${SSL_FLAGS}`;

let client = new PrismaClient({
  datasources: {
    db: {
      url: databaseURL,
    },
  },
});
async function setup() {
  try {
    await client.$connect();

    const hasData = (await client.user.count()) > 0;

    if (hasData) {
      const data = await client.user.findMany();
      console.log({ data });
      console.log("Database already exists with data");
      client.$disconnect();
      return;
    }
    await seedUsers(client);
  } catch (error) {}
}

async function seedUsers(client, count = 4) {
  try {
    const records = [...Array(count)].map((value, index) => {
      const id = uuid();
      const name = faker.internet.displayName();
      const email = faker.internet.email();

      return {
        id,
        name,
        email,
      };
    });
    await client.user.createMany({
      data: records,
      skipDuplicates: true,
    });
  } catch (error) {
    console.log("Error seeding users", error);
  }
}

setup()
  .catch((err) => {
    console.log("Setup error", err);
  })
  .finally(async () => {
    await client.$disconnect();
  });

export { setup };
