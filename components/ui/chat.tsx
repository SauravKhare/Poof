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
      }
    },
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages?.messages.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-zinc-600 text-sm font-mono">
            No messages yet, start the conversation.
          </p>
        </div>
      )}
      {messages?.messages.map((message) => (
        <div key={message.id} className="flex flex-col items-start">
          <div className="max-w-[80%] group">
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
            <p className="text-sm text-zinc-300 leading-relaxed break-all font-mono">
              {message.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
