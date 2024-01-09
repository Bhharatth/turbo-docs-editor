import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import { json } from "stream/consumers";
import { deleteDocValidationSchema, docValidationSchema, insertSchema, updateDocValidationSchema } from "@/common/authSchema";
import { Session } from "inspector";
import { contextProps } from "@trpc/react-query/shared";
import Email from "next-auth/providers/email";
import { TRPCError } from "@trpc/server";

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
          quillContent: input.quillContent.map((item) => ({
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
          email: userEmail
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
  getSingleQuillDoc: publicProcedure.input(z.object({ docId: z.string() }))
    .query(async ({ ctx, input }) => {

      const userSession = ctx.session?.user;

      if (!userSession) {
        throw new Error("User ID not found in session");
      }

      const res = await ctx.db.docs.findUnique({
        where: {
          id: parseInt(input.docId),
          createdBy: { id: userSession.id }
        },


      });

      if(!res){
        throw new TRPCError({
          message: "can find docs right now",
          code: "NOT_FOUND"
        });
      }


      const transformedData = {
        name: res.name,
        quillContent: res.quillContent.map((item: any) => ({
          insert: item.insert,
          attributes: item.attributes,
        })),
        createdById: res.createdById,
      };
  
      return transformedData.quillContent;
    }),

    updateQuillDoc: publicProcedure.input(updateDocValidationSchema)
    .mutation(async ({ ctx, input }) => {

      const userId = ctx.session?.user.id;

      if (!userId) {
        throw new Error("User ID not found in session");
      }

      const updatedDoc = await ctx.db.docs.update({
        where: {
          id: parseInt(input.docId),
          createdById: userId,
        },
        data: {
          quillContent: input?.updatedData?.quillContent?.map((item) => ({
            insert: item.insert,
            attributes: item.attributes,
          })),
          // name: input.updatedData.name,
        },
      });
      

      if(!updatedDoc){
        throw new TRPCError({
          message: "Unable to update document",
          code: "UNPROCESSABLE_CONTENT",
        });
      }
  
      return updatedDoc;
    }),

    deleteQuillDoc: publicProcedure.input(z.object({docsId: z.number()}))
    .mutation(async ({ ctx, input }) => {

      const userId = ctx.session?.user.id;

      if (!userId) {
        throw new Error("User ID not found in session");
      }

      const deletedDoc = await ctx.db.docs.delete({
        where: {
          id: input.docsId,
          createdById: userId,
        },
      });
      

      if(!deletedDoc){
        throw new TRPCError({
          message: "Unable to delete document",
          code: "UNPROCESSABLE_CONTENT",
        });
      }
  
      return {
        message: "Document deleted successfully",
        deletedDoc,
      };
    }),
   
});