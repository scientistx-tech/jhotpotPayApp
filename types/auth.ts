export type LoginFormData = {
  phone: string;
  pin: string;
};

export type PhoneFormData = {
  phone: string;
};

export type OtpFormData = {
  otp: string;
};

export type ProfileFormData = {
  name: string;
  phone: string;
  nid?: string;
  email?: string;
  occupation?: string;
  income?: string;
  division?: string;
  address?: string;
  referral?: string;
};

export type PinFormData = {
  pin: string;
};
