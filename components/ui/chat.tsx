"use client";

import { useUser } from "@/contexts/user-context";
import { eden } from "@/lib/eden";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useRealtime } from "@/lib/realtime-client";
import { useRouter } from "next/navigation";

export function Chat({ roomId }: { roomId: string }) {
  const { username } = useUser();
  const router = useRouter();
  const { data: messages, refetch } = useQuery({
    queryKey: ["messages", roomId],
    queryFn: async () => {
      const res = await eden.messages.get({
        query: { roomID: roomId },
      });
      return res.data;
    },
  });

  useRealtime({
    channels: [roomId],
    events: ["chat.message", "chat.poof"],
    onData: ({ event }) => {
      if (event === "chat.message") {
        refetch();
      }
      if (event === "chat.poof") {
        router.push("/?poofed=true");
        const localUserExist = window.localStorage.getItem("POOF_USER");
        if (localUserExist) window.localStorage.removeItem("POOF_USER");
      }
    },
  });

  return (
    <div className="flex flex-col overflow-y-auto h-screen p-4 space-y-4 md:w-3/5 md:mx-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {messages?.messages.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-zinc-600 text-sm font-mono">
            No messages yet, start the conversation.
          </p>
        </div>
      )}
      {messages?.messages.map((message) => (
        <div
          key={message.id}
          className={`flex flex-col ${message.sender === username ? "items-end" : "items-start"}`}
        >
          <div className="md:max-w-[80%] group">
            <div className="flex items-baseline gap-3 mb-1">
              <span
                className={`text-xs font-bold font-mono ${message.sender === username ? "text-green-500" : "text-blue-500"}`}
              >
                {message.sender === username ? "YOU" : message.sender}
              </span>
              <span className="text-[10px] text-zinc-600 font-mono">
                {format(message.timestamp, "HH:mm")}
              </span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed break-all font-sans bg-zinc-800 px-2 py-1 rounded-md max-w-3xs md:max-w-96">
              {message.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
