import { ThemedView } from '@/components/themed-view';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function BkashWebviewScreen() {
  const { url } = useLocalSearchParams<{ url: string }>();

  if (!url) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.center}><Text>Invalid payment URL</Text></View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <WebView source={{ uri: url }} style={{ flex: 1 }} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
