import { Suspense } from "react";
import { Lobby } from "@/components/ui/lobby";

export default function Home() {
  return (
    <Suspense>
      <Lobby />
    </Suspense>
  );
}
