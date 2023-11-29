import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email().optional(),
    password: z.string().min(3).max(16).optional(),
  });


  export const signUpSchema = loginSchema
  .extend({
    userName: z.string().min(7),
    email: z.string().email(),
    password: z.string().min(3).max(30),
  });

  export const updateUserSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(3).max(30),
  })


const attributeSchema = z.object({
  header: z.union([z.array(z.union([z.number(), z.boolean()])), z.number(), z.boolean()]).optional(),
  font: z.string().optional(),
  list: z.enum(['ordered', 'bullet']).optional(),
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
  underline: z.boolean().optional(),
  color: z.string().optional(),
  background: z.string().optional(),
  script: z.enum(['sub', 'super']).optional(),
  align: z.enum(['left', 'center', 'right', 'justify']).optional(),
  image: z.string().optional(),
  blockquote: z.boolean().optional(),
  'code-block': z.boolean().optional(),
  clean: z.boolean().optional(),
});

const insertSchema = z.object({
  attributes: attributeSchema.optional(),
  insert: z.string(),
});

export const docValidationSchema = z.object({
  name: z.string(),
  quillContent: z.array(insertSchema), // Updated to represent an array of Quill editor content
  createdById: z.string(),
});


export type ILogin = z.infer<typeof loginSchema>;
export type IUpdateUser = z.infer<typeof updateUserSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
export type IDocValidation = z.infer<typeof docValidationSchema>;



export type SignUpResponse = {
  message: string;
  status: number;
  res: string; // Assuming email is a string, adjust if needed
};