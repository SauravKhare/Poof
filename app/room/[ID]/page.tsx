import { RoomChatInput } from "@/components/functional/room-chat-input";
import { RoomHeader } from "@/components/ui/room-header";

export default async function Room({
  params,
}: {
  params: Promise<{ ID: string }>
}) {
  const { ID } = await params;

  return (
    <main className="flex flex-col h-screen max-h-screen overflow-hidden">
      <RoomHeader roomId={ID} />
      <div className="flex-1 overflow-y-auto p-4 space-y-4"></div>
      <RoomChatInput />
    </main >
  );
}