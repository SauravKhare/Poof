import { ERROR_MESSAGES } from "@/constants";

export default function ErrorUI({
  error,
  isPoofed,
}: {
  error: string | null;
  isPoofed: boolean | null;
}) {
  return (
    <>
      {isPoofed && (
        <div className="bg-red-950/50 border border-red-900 p-4 text-center rounded-md">
          <p className="text-red-500 text-sm font-bold">
            {ERROR_MESSAGES.POOFED.title}
          </p>
          <p className="text-zinc-500 text-xs mt-1">
            {ERROR_MESSAGES.POOFED.message}
          </p>
        </div>
      )}
      {error === "room-not-found" && (
        <div className="bg-red-950/50 border border-red-900 p-4 text-center rounded-md">
          <p className="text-red-500 text-sm font-bold">
            {ERROR_MESSAGES.NO_ROOM_FOUND.title}
          </p>
          <p className="text-zinc-500 text-xs mt-1">
            {ERROR_MESSAGES.NO_ROOM_FOUND.message}
          </p>
        </div>
      )}
      {error === "room-full" && (
        <div className="bg-red-950/50 border border-red-900 p-4 text-center rounded-md">
          <p className="text-red-500 text-sm font-bold">
            {ERROR_MESSAGES.ROOM_FULL.title}
          </p>
          <p className="text-zinc-500 text-xs mt-1">
            {ERROR_MESSAGES.ROOM_FULL.message}
          </p>
        </div>
      )}
    </>
  );
}
