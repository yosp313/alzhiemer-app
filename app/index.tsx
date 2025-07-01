import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowRight, MapPin, Pill } from "lucide-react-native";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";

export default function HomeScreen() {
  const navigateToMedicine = () => {
    alert("Please take your medicine as prescribed.");
  };

  const navigateToLocation = () => {
    router.push("/location");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Alzheimer Smart Assistive Glasses</Text>
            <Text style={styles.subtitle}>
              Your companion for managing Alzheimer's with ease and care
            </Text>
          </View>
        </View>

        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconWrapper}>
                <Pill size={24} color={Colors.primary} strokeWidth={2} />
              </View>
              <ArrowRight
                size={20}
                color={Colors.textTertiary}
                strokeWidth={2}
              />
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Medication</Text>
              <Text style={styles.cardDescription}>
                Get reminders and information about your medications
              </Text>
            </View>

            <Button
              title="Get Medicine"
              onPress={navigateToMedicine}
              variant="primary"
              style={styles.cardButton}
            />
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconWrapper, styles.secondaryIcon]}>
                <MapPin size={24} color={Colors.secondary} strokeWidth={2} />
              </View>
              <ArrowRight
                size={20}
                color={Colors.textTertiary}
                strokeWidth={2}
              />
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Get Location</Text>
              <Text style={styles.cardDescription}>
                Access your precise coordinates and location details instantly
              </Text>
            </View>

            <Button
              title="Get Location"
              onPress={navigateToLocation}
              variant="primary"
              style={styles.cardButton}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Secure • Fast • Reliable
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: "center",
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: Colors.text,
    marginBottom: 12,
    textAlign: "center",
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 26,
    paddingHorizontal: 10,
    fontWeight: "400",
  },
  cardsContainer: {
    flex: 1,
    gap: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 24,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: `${Colors.primary}10`,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryIcon: {
    backgroundColor: `${Colors.secondary}10`,
  },
  cardContent: {
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  cardDescription: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
    fontWeight: "400",
  },
  cardButton: {
    height: 52,
    borderRadius: 14,
  },
  footer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: Colors.textTertiary,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
});
