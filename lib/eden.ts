import { treaty } from "@elysiajs/eden";
import type { app } from "../app/api/[[...slugs]]/route";

const host =
  process.env.NODE_ENV === "development"
    ? "localhost:3000"
    : "poof-rho.vercel.app";

// this require .api to enter /api prefix
export const eden = treaty<app>(host).api;
