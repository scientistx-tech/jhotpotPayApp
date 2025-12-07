import { Stack } from 'expo-router';

export default function IndexLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="recharge/enter-number"
        options={{
          presentation: 'modal',
          animationEnabled: true,
        }}
      />
      <Stack.Screen
        name="recharge/internet"
        options={{
          presentation: 'modal',
          animationEnabled: true,
        }}
      />
      <Stack.Screen
        name="recharge/call-rate"
        options={{
          presentation: 'modal',
          animationEnabled: true,
        }}
      />
      <Stack.Screen
        name="recharge/amount"
        options={{
          presentation: 'modal',
          animationEnabled: true,
        }}
      />
    </Stack>
  );
}
