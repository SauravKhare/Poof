import { redis } from "@/lib/redis";
import type { InferRealtimeEvents } from "@upstash/realtime";
import { Realtime } from "@upstash/realtime";
import z from "zod/v4";

const message = z.object({
  id: z.string(),
  sender: z.string(),
  text: z.string(),
  timestamp: z.number(),
  roomID: z.string(),
  token: z.string().optional(),
});

const schema = {
  chat: {
    message,
    poof: z.object({
      idPoofed: z.literal(true),
    }),
  },
};

export const realtime = new Realtime({ schema, redis });
export type RealtimeEvents = InferRealtimeEvents<typeof realtime>;
export type Message = z.infer<typeof message>;
