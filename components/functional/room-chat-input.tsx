"use client";

import { useUser } from "@/contexts/user-context";
import { eden } from "@/lib/eden";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";

function RoomChatInput({ roomId }: { roomId: string }) {
  const { username } = useUser();
  const formRef = useRef<HTMLFormElement>(null);

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (text: string) => {
      await eden.messages.post(
        { sender: username, text },
        { query: { roomID: roomId } },
      );
    },
  });

  async function handleMessage(formData: FormData): Promise<void> {
    const raw = formData.get("text");
    if (raw == null) return;
    const text = typeof raw === "string" ? raw : "";

    if (!text.trim()) return;

    // Trigger the mutation
    sendMessage(text);
  }

  return (
    <div className="p-4 border-t border-zinc-800 bg-zinc-900/30">
      <div className="flex gap-4">
        <div className="flex-1 relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500 animate-pulse">
            {">"}
          </span>
          <form ref={formRef} action={handleMessage} className="flex gap-3">
            <input
              type="text"
              name="text"
              className="w-full bg-black border border-zinc-800 focus:border-zinc-700 focus:outline-none transition-colors text-zinc-100 placeholder:text-sinc-700 py-3 pl-8 pr-4 text-sm"
              placeholder="Type your message...."
            />
            <button
              type="submit"
              disabled={isPending}
              className="bg-zinc-800 text-zinc-400 px-6 text-sm font-bold hover:text-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              SEND
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export { RoomChatInput };
