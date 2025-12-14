"use client";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import createRandomUsername from "@/lib/username-generator";

import { useState, useEffect } from "react";

export default function UserName() {
  const [userName, setUserName] = useState("XXXXX-XXXXX-XXXXX");
  const [isOpen, setIsOpen] = useState(false);

  const { isCopied, copy } = useCopyToClipboard();

  async function handleCopy() {
    copy(userName);
    setIsOpen(true);
  };

  function usernamePersist() {
    const isUserPresent = localStorage.getItem("POOF_USER");

    if (isUserPresent) {
      setUserName(isUserPresent);
    } else {
      const username = createRandomUsername();
      localStorage.setItem("POOF_USER", username)
      setUserName(username);
    }
  }

  useEffect(() => {
    usernamePersist();
  });

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger asChild>
          <button type="button" className="bg-zinc-950 border border-zinc-600/50 p-3 rounded-md w-full" onClick={handleCopy}>
            <span className="font-mono text-xl font-medium text-poof-glow-primary">{userName}</span>
          </button>
        </TooltipTrigger>
        <TooltipContent className="bg-poof-glow-secondary text-white">
          <p>{isCopied ? "Copied! ✅" : "Copy"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}