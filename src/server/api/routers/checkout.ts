import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2022-11-15",
});

export const checkoutRouter = createTRPCRouter({
  createStripeSession: protectedProcedure
    // CHECK THIS CODE FROM COPILOT
    .input(
      z.object({
        product: z.object({
          name: z.string(),
          quantity: z.number(),
          priceId: z.string().optional(),
          productId: z.string().optional(),
          billingPeriod: z.string(),
        }),
        fromUrl: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });

      // find user in database and their stripeId
      const stripeId = user?.stripeId;

      // success url
      const success_url = "";

      const createParams: any = {
        line_items: [
          {
            price: input.product.priceId,
            quantity: input.product.quantity,
          },
        ],
        mode: "payment",
        success_url,
        cancel_url: input.fromUrl,
        customer: stripeId,
      };

      const session = await stripe.checkout.sessions.create(createParams);

      return session;
    }),
});
