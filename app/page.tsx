import UserName from "@/components/functional/user-name";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-900">
      <div className="w-full max-w-xl space-y-8 shadow-xl">
        <p className="font-sans text-3xl text-poof-glow-primary text-center">Chat. Vanish. <span className="font-mono text-poof-glow-secondary">Poof!</span></p>
        <div className="bg-zinc-800/50 border border-zinc-600/50 p-6 backdrop-blur-md rounded-md space-y-4">
          <p className="font-sans text-white">You are :</p>
          <UserName />
          <Button className="w-full bg-white py-5 text-black text-md uppercase font-sans transition-colors cursor-pointer hover:bg-purple-700 hover:text-white">Create room</Button>
        </div>
      </div>
    </main>
  );
}
