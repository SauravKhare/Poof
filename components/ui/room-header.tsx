"use client";

import { useState } from "react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { formatTime } from "@/lib/format-time";

function RoomHeader({ roomId }: { roomId: string }) {

  const roomUrl = window.location.href;
  const { isCopied, copy } = useCopyToClipboard();

  const [timeRemaining, setTimeRemaining] = useState<number | null>(51);
  const prettyTime = formatTime(timeRemaining);
  const time = timeRemaining !== null && timeRemaining < 60 ? "text-red-500" : "text-amber-500"


  return (
    <header className="border-b border-zinc-800 p-4 flex items-center justify-between bg-zinc-900/30">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-zinc-500 uppercase font-mono">
            Room ID
          </span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-green-500  font-mono">{roomId ?? ""}</span>
            <button type="button" onClick={() => copy(roomUrl)} className="text-[10px] font-mono bg-zinc-800 hover:bg-zinc-700 px-3 py-0.5 rounded text-zinc-400 hover:text-zinc-200 transition-colors">{isCopied ? "Copied" : "Copy"}</button>
          </div>
        </div>
        <div className="h-8 w-px bg-zinc-800"></div>
        <div className="flex flex-col">
          <span className="text-xs text-zinc-500 uppercase  font-mono">Automatic Poofing in</span>
          <span className={`text-sm font-bold flex items-center gap-2 font-mono ${time}`}>{prettyTime}</span>
        </div>
      </div>
      <button type="button" className="text-xs bg-zinc-800 text-zinc-400 hover:bg-red-600 px-3 py-1.5 rounded hover:text-white font-bold transition-all group flex items-center gap-2 disabled:opacity-50">
        <span className="group-hover:animate-pulse">💣</span> Poof!
      </button>
    </header>
  );
}

export { RoomHeader };