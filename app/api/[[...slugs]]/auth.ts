import { redis } from "@/lib/redis";
import Elysia from "elysia";

function createAuthError(message: string) {
  const error = new Error(message);
  error.name = "AuthError";
  return error;
}

export const authMiddleware = new Elysia({ name: "auth" })
  .error({ AuthError: createAuthError })
  .onError(({ error, code, set }) => {
    if (code === "AuthError") {
      set.status = 401;
      return { error: "Unauthorized", message: error.message };
    }
  })
  .derive({ as: "scoped" }, async ({ query, cookie }) => {
    const roomID = query.roomID;
    const token = cookie["x-auth-token"].value as string | undefined;

    if (!roomID || !token) {
      throw createAuthError("Missing room ID or token.");
    }

    const connected = await redis.hget<string[]>(`meta:${roomID}`, "connected");

    if (!connected?.includes(token)) {
      throw createAuthError("Invalid token.");
    }

    return { auth: { roomID, token, connected } };
  });
