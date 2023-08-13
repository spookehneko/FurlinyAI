import prismadb from "@/lib/prismadb"

import BotForm from "./components/BotForm"

interface BotIdPageProps {
    params: {
        botId: string
    }
}

async function BotIdPage({ params } : BotIdPageProps) {
    const bot = await prismadb.bot.findUnique({
        where: {
            id: params.botId
        }
    })

    const categories = await prismadb.category.findMany()


  return (
    <BotForm initialData={bot} categories={categories} />
  )
}

export default BotIdPage