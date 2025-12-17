import { redis } from "@/lib/redis";
import { Elysia } from "elysia";
import { nanoid } from "nanoid";
import { authMiddleware } from "./auth";
import { z } from "zod/v4";
import { type Message, realtime } from "@/lib/realtime";

const room = new Elysia({ prefix: "/room" })
  .post("/new", async () => {
    const roomID = nanoid();

    await redis.hset(`meta:${roomID}`, {
      connected: [],
      createdAt: Date.now(),
    });

    await redis.expire(`meta:${roomID}`, Number(process.env.ROOM_TTL) ?? 600);

    return { roomID };
  })
  .use(authMiddleware)
  .get(
    "/ttl",
    async ({ auth }) => {
      const TTL = await redis.ttl(`meta:${auth.roomID}`);
      return { ttl: TTL > 0 ? TTL : 0 };
    },
    {
      query: z.object({
        roomID: z.string(),
      }),
    },
  )
  .delete(
    "/poof",
    async ({ auth }) => {
      await realtime.channel(auth.roomID).emit("chat.poof", { idPoofed: true });
      await Promise.all([
        redis.del(auth.roomID),
        redis.del(`meta:${auth.roomID}`),
        redis.del(`messages:${auth.roomID}`),
      ]);
    },
    {
      query: z.object({
        roomID: z.string(),
      }),
    },
  );

const messages = new Elysia({ prefix: "/messages" })
  .use(authMiddleware)
  .post(
    "/",
    async ({ auth, body }) => {
      const { sender, text } = body;
      const { roomID } = auth;

      const roomExists = await redis.exists(`meta:${roomID}`);

      if (!roomExists) {
        throw new Error("Room does not exist");
      }
      const message: Message = {
        id: nanoid(),
        sender,
        text,
        timestamp: Date.now(),
        roomID,
      };

      await redis.rpush(`messages:${roomID}`, {
        ...message,
        token: auth.token,
      });
      await realtime.channel(roomID).emit("chat.message", message);

      const timeRemaining = await redis.ttl(`meta:${roomID}`);

      await Promise.all([
        redis.expire(`messages:${roomID}`, timeRemaining),
        redis.expire(`history:${roomID}`, timeRemaining),
        redis.expire(roomID, timeRemaining),
      ]);
    },
    {
      query: z.object({
        roomID: z.string(),
      }),
      body: z.object({
        sender: z.string().max(100),
        text: z.string().max(1000),
      }),
    },
  )
  .get(
    "/",
    async ({ auth }) => {
      const messages = await redis.lrange<Message>(
        `messages:${auth.roomID}`,
        0,
        -1,
      );

      return {
        messages: messages.map((message) => ({
          ...message,
          token: message.token === auth.token ? auth.token : undefined,
        })),
      };
    },
    {
      query: z.object({
        roomID: z.string(),
      }),
    },
  );

const app = new Elysia({ prefix: "/api" }).use(room).use(messages);

export type app = typeof app;

export const GET = app.fetch;
export const POST = app.fetch;
export const DELETE = app.fetch;
