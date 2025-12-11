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
    'Instant and secure transactions anytime, anywhere.',
    'User-friendly wallet experience for all ages.',
    '24/7 customer support and agent assistance.',
    'Powerful tools for business owners and retailers.',
    'Fast recharge, cash-in, cash-out, and money transfers.',
    'Lowest cost and highest flexibility in the industry.',
  ];

  const handleSubmit = () => {
    console.log('About page submit clicked');
  };

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
        <ThemedText style={styles.headerTitle}>About Jhotpot Pay</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* About Section */}
        <View style={[styles.card, { backgroundColor: bg }]}>
          <ThemedText style={styles.sectionTitlePink}>About JhotPot Pay</ThemedText>
          <ThemedText style={styles.descriptionText}>
            Jhotpot Pay is a next-generation digital financial solution designed for fast, secure, and effortless transactions. We empower users, agents, and businesses with seamless and instant mobile financial services.
          </ThemedText>
        </View>

        {/* Our Mission */}
        <View style={[styles.card, { backgroundColor: bg }]}>
          <ThemedText style={styles.sectionTitleBlue}>OUR MISSION</ThemedText>
          <View style={[styles.boxContainer, { borderColor: tint }]}>
            <ThemedText style={styles.boxText}>
              To build a digital payment ecosystem that is fast, reliable, and accessible for everyone – from regular users to professional agents and business owners across Bangladesh.
            </ThemedText>
          </View>
        </View>

        {/* Our Vision */}
        <View style={[styles.card, { backgroundColor: bg }]}>
          <ThemedText style={styles.sectionTitleBlue}>OUR VISION</ThemedText>
          <View style={[styles.boxContainer, { borderColor: tint }]}>
            <ThemedText style={styles.boxText}>
              Bringing financial empowerment to millions by offering a secure, user-friendly, and innovative digital wallet experience with world-class technology.
            </ThemedText>
          </View>
        </View>

        {/* What Makes Us Different */}
        <View style={[styles.card, { backgroundColor: bg }]}>
          <ThemedText style={[styles.sectionTitleDark, { color: tint }]}>What Makes Us Different</ThemedText>
          
          {features.map((feature, index) => (
            <View key={index} style={[styles.featureBox, { borderColor: tint }]}>
              <ThemedText style={styles.featureText}>{feature}</ThemedText>
            </View>
          ))}
        </View>

        {/* Submit Button */}
        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: tint }]}
            onPress={handleSubmit}
          >
            <ThemedText style={styles.submitButtonText}>SUBMIT</ThemedText>
          </TouchableOpacity>
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
