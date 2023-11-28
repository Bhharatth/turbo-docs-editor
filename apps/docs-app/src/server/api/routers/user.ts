import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import Trpc from "@/pages/api/trpc/[trpc]";

export const userRouter = createTRPCRouter({
  signup: publicProcedure
    .input(z.object({ username: z.string(),
                   password: z.string() 
                  }))
    .mutation(async(_opts) => {
        let username = _opts.input.username;
        let password = _opts.input.password;
        let response = await _opts.ctx.prisma.user.create({
            data: {
                username,
                hashedPassword: password
            }
        });

        if(!response.id){
            throw new Error
        }

        let userId:string = response.id || "";

        // const token: string = jwt.sign({ userId: userId }, SECRET, { expiresIn: '1h' });

        return {
            userId
        }
        
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

    //   return ctx.prisma.docs.create({
      
    //   });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.docs.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
