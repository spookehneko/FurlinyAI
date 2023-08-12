const { PrismaClient } = require("@prisma/client")

const db = new PrismaClient()

async function main() {
    try {
        await db.category.createMany({
            data: [
                { name: "Famous People" },
                { name: "Games" },
                { name: "Game Characters" },
                { name: "Anime" },
                { name: "Movies & TV" },
            ]
        })
    } catch (err) {
        console.error("Error seeding default categories", err)
    } finally {
        await db.$disconnect()
    }
}

main()