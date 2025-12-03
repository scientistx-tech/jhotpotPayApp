import { z } from 'zod';

export const loginSchema = z.object({
  phone: z.string().min(8, 'মোবাইল নম্বর সঠিক নয়').regex(/^\+?[0-9]{8,15}$/, 'মোবাইল নম্বর সঠিক নয়'),
  pin: z.string().min(4, 'পিন ৪ সংখ্যা হতে হবে').max(6, 'পিন দীর্ঘ'),
});

export const phoneSchema = z.object({
  phone: z.string().min(8, 'মোবাইল নম্বর সঠিক নয়').regex(/^\+?[0-9]{8,15}$/, 'মোবাইল নম্বর সঠিক নয়'),
});

export const otpSchema = z.object({
  otp: z.string().length(6, 'OTP 6 সংখ্যার হতে হবে'),
});

export const profileSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(8),
  nid: z.string().optional(),
  email: z.string().email().optional(),
  occupation: z.string().optional(),
  income: z.string().optional(),
  division: z.string().optional(),
  address: z.string().optional(),
  referral: z.string().optional(),
});

export const pinSchema = z.object({
  pin: z.string().length(4, 'Pin must be 4 digits'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type PhoneSchema = z.infer<typeof phoneSchema>;
export type OtpSchema = z.infer<typeof otpSchema>;
export type ProfileSchema = z.infer<typeof profileSchema>;
export type PinSchema = z.infer<typeof pinSchema>;
