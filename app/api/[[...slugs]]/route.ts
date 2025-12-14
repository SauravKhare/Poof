import { redis } from '@/lib/redis';
import { Elysia } from 'elysia'
import { nanoid } from 'nanoid';


const room = new Elysia({ prefix: '/room' }).post("/new", async () => {
  const roomID = nanoid();

  await redis.hset(`meta:${roomID}`, {
    connected: [],
    createdAt: Date.now(),
  });

  await redis.expire(`meta:${roomID}`, Number(process.env.ROOM_TTL) ?? 600);

  return { roomID };
});

const app = new Elysia({ prefix: '/api' }).use(room);

export type app = typeof app;

export const GET = app.fetch;
export const POST = app.fetch;