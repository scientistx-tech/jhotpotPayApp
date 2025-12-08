import { z } from 'zod';

export const loginSchema = z.object({
  phone: z.string().length(11, 'মোবাইল নম্বর সঠিক নয়').regex(/^\+?[0-9]{8,15}$/, 'মোবাইল নম্বর সঠিক নয়'),
  pin: z.string().min(4, 'পিন ৪ সংখ্যা হতে হবে').max(6, 'পিন দীর্ঘ'),
});

export const phoneSchema = z.object({
  phone: z.string().length(11, 'মোবাইল নম্বর সঠিক নয়').regex(/^\+?[0-9]{8,15}$/, 'মোবাইল নম্বর সঠিক নয়'),
});

export const otpSchema = z.object({
  otp: z.string().length(6, 'OTP 6 সংখ্যার হতে হবে'),
});

export const profileSchema = z.object({
    name: z.string().min(1, "Name is required"),
  // phone: z.string().length(11, "Phone is not valid"), // adjust validation if needed
  password: z.string().min(6, "Password must be at least 6 characters"),
  nid: z.string().min(5, "NID is required"),
  email: z.string().email("Invalid email").optional().nullable(),
  occupation: z.string().min(1, "Occupation is required"),
  income: z.string().min(1, "Income is required").default("0"),
  division: z.string().min(1, "Division is required"),
  address: z.string().min(1, "Address is required"),
  referralCode: z.string().optional().nullable(),
  // otpId: z.string().uuid(),
});


 export const RegisterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().length(11, "Phone is not valid"), // adjust validation if needed
  password: z.string().min(6, "Password must be at least 6 characters"),
  nid: z.string().min(5, "NID is required"),
  email: z.string().email("Invalid email").optional().nullable(),
  occupation: z.string().min(1, "Occupation is required"),
  income: z.number().min(0, "Income must be >= 0").default(0),
  division: z.string().min(1, "Division is required"),
  address: z.string().min(1, "Address is required"),
  referralCode: z.string().optional().nullable(),
  otpId: z.string().uuid(),
});

export const pinSchema = z.object({
  pin: z.string().length(4, 'Pin must be 4 digits'),
});

export const customerSchema = z.object({
  name: z.string().min(1, 'গ্রাহক নাম প্রয়োজন'),
  phone: z.string().length(11, 'মোবাইল নম্বর সঠিক নয়').regex(/^\+?[0-9]{8,15}$/, 'মোবাইল নম্বর সঠিক নয়'),
  email: z.string().email('ইমেইল সঠিক নয়').optional().or(z.literal('')),
  address: z.string().min(1, 'ঠিকানা প্রয়োজন'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type PhoneSchema = z.infer<typeof phoneSchema>;
export type CustomerSchema = z.infer<typeof customerSchema>;
export type OtpSchema = z.infer<typeof otpSchema>;
export type ProfileSchema = z.infer<typeof profileSchema>;
export type PinSchema = z.infer<typeof pinSchema>;
