"use client";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import createRandomUsername from "@/lib/username-generator";

import { useState, useEffect } from "react";

export default function UserName() {
  const [userName, setUserName] = useState("XXXXX-XXXXX-XXXXX");

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
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="bg-zinc-950 border border-zinc-600/50 p-3 rounded-md">
          <p className="font-mono text-xl font-medium text-poof-glow-primary">{userName}</p>
        </div>
      </TooltipTrigger>
      <TooltipContent className="bg-purple-800 text-white after:bg-purple-800 before:bg-purple-800 after:text-purple-800">
        <p>Copy!</p>
      </TooltipContent>
    </Tooltip>
  );
}