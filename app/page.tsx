"use client";

import { eden } from "@/lib/eden";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import UserName from "@/components/functional/user-name";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <Lobby />
    </Suspense>
  );
}

export function Lobby() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isPoofed = searchParams.get("poofed") === "true";
  const error = searchParams.get("error");

  const { mutate: createRoom } = useMutation({
    mutationFn: async () => {
      const res = await eden.room.new.post();
      if (res.status === 200) {
        router.push(`/room/${res.data?.roomID}`);
      }
    },
  });

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-900">
      <div className="w-full max-w-xl space-y-8 shadow-xl">
        {isPoofed && (
          <div className="bg-red-950/50 border border-red-900 p-4 text-center">
            <p className="text-red-500 text-sm font-bold">Poofed!</p>
            <p className="text-zinc-500 text-xs mt-1">
              All messages were permanently deleted.
            </p>
          </div>
        )}
        {error === "room-not-found" && (
          <div className="bg-red-950/50 border border-red-900 p-4 text-center">
            <p className="text-red-500 text-sm font-bold">Room not found!</p>
            <p className="text-zinc-500 text-xs mt-1">
              This room may have expired or never existed.
            </p>
          </div>
        )}
        {error === "room-full" && (
          <div className="bg-red-950/50 border border-red-900 p-4 text-center">
            <p className="text-red-500 text-sm font-bold">Room full!</p>
            <p className="text-zinc-500 text-xs mt-1">
              This room is at maximum capacity.
            </p>
          </div>
        )}
        <p className="font-sans text-3xl text-poof-glow-primary text-center">
          Chat. Vanish.{" "}
          <span className="font-mono text-poof-glow-secondary">Poof!</span>
        </p>
        <div className="bg-zinc-800/50 border border-zinc-600/50 p-6 backdrop-blur-md rounded-md space-y-4">
          <p className="font-sans text-white">You are :</p>
          <UserName />
          <Button
            onClick={() => createRoom()}
            className="w-full bg-white py-5 text-black text-md uppercase font-sans transition-colors cursor-pointer hover:bg-purple-700 hover:text-white"
          >
            Create room
          </Button>
        </div>
      </div>
    </main>
  );
}
