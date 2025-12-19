"use client";

import { eden } from "@/lib/eden";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import UserName from "@/components/functional/user-name";
import ErrorUI from "@/components/ui/error-ui";

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
    <main className="flex min-h-screen items-center justify-center px-4 md:px-0">
      <div className="w-full max-w-xl space-y-8 shadow-xl">
        <ErrorUI error={error} isPoofed={isPoofed} />
        <p className="font-sans text-3xl text-white text-center font-medium">
          Chat. Vanish.{" "}
          <span className="font-mono text-poof-glow-secondary font-bold">
            Poof!💨
          </span>
        </p>
        <div className="bg-zinc-900/60 border border-zinc-800/80 p-6 rounded-md space-y-4">
          <p className="font-sans text-white">You are</p>
          <UserName />
          <Button
            onClick={() => createRoom()}
            className="w-full bg-white py-5 text-black text-md uppercase font-sans font-medium transition-colors cursor-pointer hover:bg-purple-700 hover:text-white"
          >
            Create a new room
          </Button>
        </div>
      </div>
    </main>
  );
}
