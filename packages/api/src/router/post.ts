import { z } from "zod";

import { generateId } from "@acme/db/utils";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.selectFrom("Post").selectAll().execute();
    return posts;
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .selectFrom("Post")
        .where("Post.id", "=", input.id)
        .executeTakeFirstOrThrow();
    }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .insertInto("Post")
        .values({
          id: generateId(),
          title: input.title,
          content: input.content,
        })
        .executeTakeFirstOrThrow();
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .deleteFrom("Post")
        .where("id", "=", input)
        .executeTakeFirstOrThrow();
    }),
});
