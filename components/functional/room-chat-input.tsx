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

    sendMessage(text);
  }

  return (
    <div className="p-4 border-t border-zinc-800 bg-zinc-900/30">
      <div className="flex gap-4 md:w-3/5 mx-auto">
        <div className="flex-1 relative group">
          <form ref={formRef} action={handleMessage} className="flex gap-3">
            <input
              type="text"
              name="text"
              className="w-full bg-black border border-zinc-800 focus:border-zinc-700 focus:outline-none transition-colors text-zinc-100 placeholder:text-sinc-700 py-3 px-4 text-sm rounded-md"
              placeholder="Type your message...."
            />
            <button
              type="submit"
              disabled={isPending}
              className="bg-zinc-800 text-zinc-400 px-6 text-sm font-bold hover:text-zinc-200 hover:bg-poof-glow-secondary transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-md"
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
