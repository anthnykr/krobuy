import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2022-11-15",
});

export const signupRouter = createTRPCRouter({
  createStripeCustomer: publicProcedure
    // CHECK THIS CODE FROM COPILOT
    .input(
      z.object({
        email: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const customer = await stripe.customers.create({
        email: input.email,
        name: input.name,
      });

      return customer;
    }),
});
