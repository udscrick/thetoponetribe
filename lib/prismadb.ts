import { PrismaClient } from '@prisma/client';

declare global{
    var prisma: PrismaClient | undefined;
}

//Check if prisma is already defined in the global scope, if not then create a new client
const prismadb = globalThis.prisma || new PrismaClient();


if(process.env.NODE_ENV !== 'production') globalThis.prisma = prismadb

export default prismadb;