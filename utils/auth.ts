// utils/auth.ts
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';

export async function saveToken(token: string) {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function getToken() {
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

export async function removeToken() {
  return await SecureStore.deleteItemAsync(TOKEN_KEY);
}

// Log out the current user by removing the stored auth token.
export async function logout() {
  try {
    await removeToken();
  } catch (err) {
    // If removal fails, log a warning — callers handle navigation.
    console.warn('logout: failed to remove token', err);
  }
}
