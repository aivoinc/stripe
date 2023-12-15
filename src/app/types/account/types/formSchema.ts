import { z } from "zod";

export const formSchema = z.object({
  firstNameKana: z.string().min(1, "必須項目です"),
  lastNameKana: z.string().min(1, "必須項目です"),
  firstNameKanji: z.string().min(1, "必須項目です"),
  lastNameKanji: z.string().min(1, "必須項目です"),
  dob: z.string().datetime().min(1, "必須項目です"),
  addrKanaLine2: z.string().optional(),
  addrKanaLine1: z.string().min(1, "必須項目です"),
  addrKanaZip: z.string().min(1, "必須項目です"),
  addrKanaCity: z.string().min(1, "必須項目です"),
  addrKanaState: z.string().min(1, "必須項目です"),
  addrKanjiLine2: z.string().optional(),
  addrKanjiLine1: z.string().min(1, "必須項目です"),
  addrKanjiZip: z.string().min(1, "必須項目です"),
  addrKanjiCity: z.string().min(1, "必須項目です"),
  addrKanjiState: z.string().min(1, "必須項目です"),
  phone: z.string().min(1, "必須項目です").regex(/[0-9]/, "半角数字で入力してください"),
  verifyDocFront: z.custom<FileList>().transform((file) => file[0]),
  verifyDocBack: z.custom<FileList>().transform((file) => file[0]),
});

export type FormFields = z.infer<typeof formSchema>;
