import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const cartRouter = createTRPCRouter({
  addToCart: protectedProcedure
    .input(
      z.object({
        productName: z.string(),
        quantity: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { productName, quantity } = input;
      const { session, prisma } = ctx;

      const email = session.user.email;

      if (!email) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to add items to your cart",
        });
      }

      try {
        const cart = await prisma.item.create({
          data: {
            productName,
            quantity,
            user: {
              connect: {
                email,
              },
            },
          },
        });
        return cart;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),

  getCart: protectedProcedure.query(async ({ ctx }) => {
    const { session, prisma } = ctx;

    const email = session.user.email;

    if (!email) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to view your cart",
      });
    }

    try {
      const cart = await prisma.item.findMany({
        where: {
          user: {
            email,
          },
        },
      });
      return cart;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  }),
});
