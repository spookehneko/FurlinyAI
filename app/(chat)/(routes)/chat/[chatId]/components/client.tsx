"use client"

import { Bot, Message } from "@prisma/client"

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { useCompletion } from "ai/react";

import ChatHeader from "@/components/ChatHeader";
import ChatForm from "@/components/ChatForm";
import ChatMessages from "@/components/ChatMessages";
import { ChatMessageProps } from "@/components/ChatMessage";

interface ChatClientProps {
    bot: Bot & {
        messages: Message[];
        _count: {
            messages: number;
        }
    }
}

function ChatClient({ bot }: ChatClientProps) {
  const router = useRouter()
  const [messages, setMessages] = useState<ChatMessageProps[]>(bot.messages)

  const {
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    setInput
  } = useCompletion({
    api: `/api/chat/${bot.id}`,
    onFinish(prompt, completion) {
      const systemMessage: ChatMessageProps = {
        role: "system",
        content: completion
      }

      setMessages((current) => [...current, systemMessage])
      setInput("")

      router.refresh()
    }
  })

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage: ChatMessageProps = {
      role: "user",
      content: input,
    }

    setMessages((current) => [...current, userMessage])

    handleSubmit(e)
  }

  return (
    <div className="flex flex-col h-full p-4 space-y-2">
        <ChatHeader bot={bot} />
        <ChatMessages bot={bot} isLoading={isLoading} messages={messages} />
        <ChatForm isLoading={isLoading} input={input} handleInputChange={handleInputChange} onSubmit={onSubmit} />
    </div>
  )
}

export default ChatClient