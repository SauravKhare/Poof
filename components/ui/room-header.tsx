"use client";

import { useEffect, useState } from "react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { formatTime } from "@/lib/format-time";
import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { eden } from "@/lib/eden";

function RoomHeader({ roomId }: { roomId: string }) {
  const path = usePathname();
  const router = useRouter();

  const pathName = path;
  const roomUrl = `${window.location.origin}${pathName}`;
  const { isCopied, copy } = useCopyToClipboard();

  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const prettyTime = formatTime(timeRemaining);
  const time =
    timeRemaining !== null && timeRemaining < 60
      ? "text-red-500"
      : "text-amber-500";

  const { data: ttlData } = useQuery({
    queryKey: ["TTL", roomId],
    queryFn: async () => {
      const res = await eden.room.ttl.get({ query: { roomID: roomId } });
      return res.data;
    },
  });

  const { mutate: poof } = useMutation({
    mutationKey: ["poof", roomId],
    mutationFn: async () => {
      await eden.room.poof.delete(null, { query: { roomID: roomId } });
    },
  });

  useEffect(() => {
    if (ttlData?.ttl !== undefined) {
      setTimeRemaining(ttlData.ttl);
    }
  }, [ttlData]);

  useEffect(() => {
    if (timeRemaining === null || timeRemaining < 0) return;
    if (timeRemaining === 0) router.push("/?poofed=true");
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining, router]);

  return (
    <header className="border-b border-zinc-800 p-4 flex items-center justify-between bg-zinc-900/30">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-zinc-500 uppercase font-mono">
            Room ID
          </span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-green-500  font-mono">
              {roomId ?? ""}
            </span>
            <button
              type="button"
              onClick={() => copy(roomUrl)}
              className="text-[10px] font-mono bg-zinc-800 hover:bg-zinc-700 px-3 py-0.5 rounded text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              {isCopied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
        <div className="h-8 w-px bg-zinc-800"></div>
        <div className="flex flex-col">
          <span className="text-xs text-zinc-500 uppercase  font-mono">
            Automatic Poofing in
          </span>
          <span
            className={`text-sm font-bold flex items-center gap-2 font-mono ${time}`}
          >
            {prettyTime}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => poof()}
        className="text-xs bg-zinc-800 text-zinc-400 hover:bg-red-600 px-3 py-1.5 rounded hover:text-white font-bold transition-all group flex items-center gap-2 disabled:opacity-50"
      >
        <span className="group-hover:animate-pulse">💣</span> Poof!
      </button>
    </header>
  );
}

export { RoomHeader };
