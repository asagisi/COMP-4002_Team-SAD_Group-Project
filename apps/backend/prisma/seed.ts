import { PrismaClient } from "@prisma/client";
import { showSeedData, buildUserShowSeedData } from "./seedData";

const prisma = new PrismaClient();

async function main() {
    await prisma.userShow.deleteMany();
    await prisma.show.deleteMany();
    await prisma.user.deleteMany();

    const user = await prisma.user.create({
        data: { clerkUserId: "dev_seed_user_001" },
    });

    const createdShows = await prisma.show.createManyAndReturn({
        data: showSeedData,
        skipDuplicates: true,
    });

    const titleToId = Object.fromEntries(
        createdShows.map((s) => [s.title, s.id])
    );

    const userShowData = buildUserShowSeedData(titleToId, user.id);

    const createdUserShows = await prisma.userShow.createManyAndReturn({
        data: userShowData,
        skipDuplicates: true,
    });

    console.log(`Created ${createdShows.length} shows`);
    console.log(`Created ${createdUserShows.length} user shows`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
