import { RoomChatInput } from "@/components/functional/room-chat-input";
import { Chat } from "@/components/ui/chat";
import { RoomHeader } from "@/components/ui/room-header";

export default async function Room({
  params,
}: {
  params: Promise<{ ID: string }>;
}) {
  const { ID } = await params;

  return (
    <main className="flex flex-col h-screen max-h-screen overflow-hidden">
      <RoomHeader roomId={ID} />
      <Chat roomId={ID} />
      <RoomChatInput roomId={ID} />
    </main>
  );
}
