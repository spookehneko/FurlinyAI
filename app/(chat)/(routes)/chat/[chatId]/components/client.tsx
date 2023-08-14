"use client"

import { Bot, Message } from "@prisma/client"
import ChatHeader from "@/components/ChatHeader";

interface ChatClientProps {
    bot: Bot & {
        messages: Message[];
        _count: {
            messages: number;
        }
    }
}

function ChatClient({ bot }: ChatClientProps) {
  return (
    <div className="flex flex-col h-full p-4 space-y-2">
        <ChatHeader bot={bot} />
    </div>
  )
}

export default ChatClient