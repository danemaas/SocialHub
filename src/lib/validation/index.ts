import * as z from "zod";

export const SignUpValidationSchema = z.object({
  name: z.string().min(2, { message: "minimum of 2 characters" }),
  username: z.string().min(2, { message: "minimum of 2 characters" }),
  email: z.string().email(),
  password: z.string().min(8, { message: "minimum of 8 characters" }),
});

export const SigninValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "minimum of 8 characters" }),
});

export const PostValidation = z.object({
  caption: z
    .string()
    .min(5, {
      message: "Must be at least 5 characters.",
    })
    .max(2200),
  file: z.custom<File[]>(),
  location: z
    .string()
    .min(2, {
      message: "Must be at least 2 characters.",
    })
    .max(100),
  tags: z.string(),
});
