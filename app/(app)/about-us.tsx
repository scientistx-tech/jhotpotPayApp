import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function AboutUsPage() {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const bg = useThemeColor({}, 'background');

  const features = [
    'যেকোনো সময়, যেকোনো জায়গা থেকে তাৎক্ষণিক ও নিরাপদ লেনদেন।',
    'সব বয়সের মানুষের জন্য সহজ ও ব্যবহারবান্ধব ওয়ালেট অভিজ্ঞতা।',
    '২৪/৭ কাস্টমার সাপোর্ট এবং এজেন্ট সহায়তা।',
    'ব্যবসায়ী ও রিটেইলারদের জন্য শক্তিশালী টুলস।',
    'দ্রুত রিচার্জ, ক্যাশ-ইন, ক্যাশ-আউট এবং টাকা পাঠানোর সুবিধা।',
    'ইন্ডাস্ট্রিতে সর্বনিম্ন খরচ ও সর্বোচ্চ সুবিধা।',
  ];

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={tint} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Jhotpot Pay সম্পর্কে</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* About Section */}
        <View style={[styles.card, { backgroundColor: bg }]}>
          <ThemedText style={styles.sectionTitlePink}>Jhotpot Pay সম্পর্কে</ThemedText>
          <ThemedText style={styles.descriptionText}>
            Jhotpot Pay একটি আধুনিক ডিজিটাল ফিনান্সিয়াল সলিউশন, যা দ্রুত, নিরাপদ এবং সহজ লেনদেনের জন্য তৈরি। আমরা ব্যবহারকারী, এজেন্ট এবং ব্যবসায়ীদের জন্য নিরবচ্ছিন্ন ও তাৎক্ষণিক মোবাইল ফিনান্সিয়াল সেবা নিশ্চিত করি।
          </ThemedText>
        </View>

        {/* Our Mission */}
        <View style={[styles.card, { backgroundColor: bg }]}>
          <ThemedText style={styles.sectionTitleBlue}>আমাদের লক্ষ্য</ThemedText>
          <View style={[styles.boxContainer, { borderColor: tint }]}>
            <ThemedText style={styles.boxText}>
              বাংলাদেশজুড়ে সাধারণ ব্যবহারকারী থেকে শুরু করে পেশাদার এজেন্ট ও ব্যবসায়ীদের জন্য দ্রুত, নির্ভরযোগ্য এবং সবার জন্য সহজলভ্য একটি ডিজিটাল পেমেন্ট ইকোসিস্টেম গড়ে তোলা।
            </ThemedText>
          </View>
        </View>

        {/* Our Vision */}
        <View style={[styles.card, { backgroundColor: bg }]}>
          <ThemedText style={styles.sectionTitleBlue}>আমাদের ভিশন</ThemedText>
          <View style={[styles.boxContainer, { borderColor: tint }]}>
            <ThemedText style={styles.boxText}>
              বিশ্বমানের প্রযুক্তি ব্যবহার করে নিরাপদ, সহজ ও উদ্ভাবনী ডিজিটাল ওয়ালেট অভিজ্ঞতার মাধ্যমে লক্ষ লক্ষ মানুষের আর্থিক ক্ষমতায়ন নিশ্চিত করা।
            </ThemedText>
          </View>
        </View>

        {/* What Makes Us Different */}
        <View style={[styles.card, { backgroundColor: bg }]}>
          <ThemedText style={[styles.sectionTitleDark, { color: tint }]}>
            আমাদের আলাদা করে তোলে যা
          </ThemedText>

          {features.map((feature, index) => (
            <View key={index} style={[styles.featureBox, { borderColor: tint }]}>
              <ThemedText style={styles.featureText}>{feature}</ThemedText>
            </View>
          ))}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </ThemedView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionTitlePink: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF1744',
    marginBottom: 12,
    textAlign: 'center',
  },
  sectionTitleBlue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#248AEF',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  sectionTitleDark: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4B5563',
    textAlign: 'center',
  },
  boxContainer: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#F0F7FF',
  },
  boxText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#4B5563',
    textAlign: 'center',
  },
  featureBox: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    backgroundColor: '#F8FAFD',
  },
  featureText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#4B5563',
  },
  buttonSection: {
    marginTop: 8,
    marginBottom: 16,
  },
  submitButton: {
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
});
