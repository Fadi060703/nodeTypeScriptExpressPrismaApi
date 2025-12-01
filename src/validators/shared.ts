import { z } from "zod";
import { AccTypeSchema } from "./accType";

export const baseUserSchema = z.object({
  id: z.number().positive(),
  email: z.string().email(),
  accountType: AccTypeSchema,
});

export const baseTeamSchema = z.object({
  id: z.number().positive(),
  name: z.string(),
});
