import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import { json } from "stream/consumers";
import { docValidationSchema } from "@/common/authSchema";
import { Session } from "inspector";
import { contextProps } from "@trpc/react-query/shared";
import Email from "next-auth/providers/email";

export const postRouter = createTRPCRouter({
  saveQuillDocs: publicProcedure
    .input(docValidationSchema)
    .mutation(async ({ ctx, input }) => {
      
      const userId = ctx.session?.user.id;

      if (!userId) {
        throw new Error("User ID not found in session");
      }

      const res = await ctx.db.docs.create({
        data: {
          quillContent: input.quillContent.map((item)=> ({
            insert: item.insert,
            attributes: item.attributes,
          })),
          name: input.name,
          createdById: input.createdById,
        },
      });

      return res;
    }),

    getQuillDocs: publicProcedure
    .query(async ({ ctx, input }) => {
      
      const userEmail = ctx.session?.user.email;

      if (!userEmail) {
        throw new Error("User ID not found in session");
      }

      const res = await ctx.db.user.findUnique({
        where: {
          email:userEmail
        },
        include: {
          docs: true,
        }
      });

      // const formatedDocs = res?.docs.map((doc)=> ({
      //   name: doc.name,
      //   quillContent: doc.quillContent,
      // }))

      return res?.docs;
    }),
});