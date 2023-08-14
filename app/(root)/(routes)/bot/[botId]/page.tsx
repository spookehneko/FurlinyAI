import prismadb from "@/lib/prismadb"
import { auth, redirectToSignIn } from "@clerk/nextjs"

import BotForm from "./components/BotForm"

interface BotIdPageProps {
    params: {
        botId: string
    }
}

async function BotIdPage({ params } : BotIdPageProps) {
    const { userId } = auth()

    if (!userId) {
        return redirectToSignIn()
    }

    const bot = await prismadb.bot.findUnique({
        where: {
            id: params.botId,
            userId
        }
    })

    const categories = await prismadb.category.findMany()


  return (
    <BotForm initialData={bot} categories={categories} />
  )
}

export default BotIdPage