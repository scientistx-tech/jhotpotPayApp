import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as MediaLibrary from 'expo-media-library';
import { useRef } from 'react';
import { Alert, ScrollView, Share, StyleSheet, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';

export default function QrScreen() {
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');
  const userName = 'Omul Ahmed';
  const walletId = 'JP-548921';
  const viewShotRef = useRef(null);

  const handleShare = async () => {
    await Share.share({
      message: `Scan my Jhotpot Pay QR to pay ${userName} (ID: ${walletId}).`,
    });
  };

  const handleDownload = async () => {
    try {
      // Capture QR code view
      const uri = await viewShotRef.current.capture();
      // Request media library permissions
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please allow access to save images.');
        return;
      }
      // Save to gallery
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Download', asset, false);
      Alert.alert('Saved', 'QR code image saved to your gallery.');
    } catch (error) {
      Alert.alert('Error', 'Could not save QR code.');
    }
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: bg }]}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { backgroundColor: '#fff' }]}>
          <ThemedText style={styles.title}>আমার QR কোড</ThemedText>
          <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1.0 }} style={[styles.qrBox, { borderColor: tint }]}>
            <QRCode
              value={`JP:${walletId}`}
              size={180}
              color={tint}
              backgroundColor="#F8FAFD"
            />
          </ViewShot>
          <ThemedText style={styles.subtitle}>পেমেন্ট পেতে কোডটি স্ক্যান করুন</ThemedText>
        </View>

        <View style={[styles.card, { backgroundColor: '#fff' }]}>
          <View style={styles.infoRow}>
            <ThemedText style={styles.label}>নাম</ThemedText>
            <ThemedText style={styles.value}>{userName}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <ThemedText style={styles.label}>ওয়ালেট আইডি</ThemedText>
            <ThemedText style={styles.value}>{walletId}</ThemedText>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionButton, { borderColor: tint }]}
            onPress={handleDownload}
          >
            <Ionicons name="download-outline" size={20} color={tint} />
            <ThemedText style={[styles.actionText, { color: tint }]}>Download</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: tint }]}
            onPress={handleShare}
          >
            <Ionicons name="share-social-outline" size={20} color="#fff" />
            <ThemedText style={[styles.actionText, { color: '#fff' }]}>Share</ThemedText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.primaryButton, { backgroundColor: tint }]} onPress={handleShare}>
          <Ionicons name="qr-code-outline" size={20} color="#fff" />
          <ThemedText style={styles.primaryText}>Share My QR</ThemedText>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  card: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
    color: '#11181C',
  },
  qrBox: {
    borderWidth: 2,
    borderRadius: 16,
    padding: 24,
    backgroundColor: '#F8FAFD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
    marginTop: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E8ED',
  },
  label: {
    fontSize: 13,
    color: '#4B5563',
    fontWeight: '600',
  },
  value: {
    fontSize: 14,
    color: '#11181C',
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  primaryButton: {
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  primaryText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
});