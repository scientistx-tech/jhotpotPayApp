import { useState } from 'react';

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
  meta?: any;
  data?: any;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export function useChangePasswordApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<ChangePasswordResponse | null>(null);

  const changePassword = async (token: string, data: ChangePasswordRequest) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await fetch('https://api.jhotpotpay.com/api/v1/auth/change-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token, // No 'Bearer' prefix
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      setResponse(json);
      if (!json.success) {
        setError(json.message || 'Change password failed');
      }
      return json;
    } catch (err: any) {
      setError(err?.message || 'Network error');
      return { success: false, message: err?.message || 'Network error' };
    } finally {
      setIsLoading(false);
    }
  };

  return { changePassword, isLoading, error, response };
}
