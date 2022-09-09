import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const client = new PrismaClient();
export default client;