"use client"

import { Bot } from "@prisma/client"
import { ElementRef, useEffect, useRef, useState } from "react";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";

interface ChatMessagesProps {
    messages: ChatMessageProps[];
    isLoading: boolean;
    bot: Bot;
}

function ChatMessages({
    messages = [],
    isLoading,
    bot
}: ChatMessagesProps) {
  const scrollRef = useRef<ElementRef<"div">>(null)
  const [fakeLoading, setFakeLoading] = useState(messages.length === 0 ? true : false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages.length])

  return (
    <div className="flex-1 overflow-y-auto pr-4">
        <ChatMessage isLoading={fakeLoading} src={bot.src} role="system" content={`Hello, I am ${bot.name}, ${bot.description}`} />
        {messages.map((message) => (
          <ChatMessage key={message.content} role={message.role} content={message.content} src={bot.src} />
        ))}
        {isLoading && (
          <ChatMessage role="system" src={bot.src} isLoading />
        )}
        <div ref={scrollRef} />
    </div>
  )
}

export default ChatMessages