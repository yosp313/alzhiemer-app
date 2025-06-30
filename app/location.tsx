import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Compass, MapPin, Navigation, RefreshCw } from "lucide-react-native";
import Colors from "@/constants/Colors";
import useLocation from "@/hooks/useLocation";
import Button from "@/components/Button";

export default function LocationScreen() {
  const { location, errorMsg, loading, getLocation } = useLocation();

  useEffect(() => {
    getLocation();
  }, []);

  const formatCoordinate = (value: number | undefined) => {
    if (value === undefined) return "N/A";
    return value.toFixed(6);
  };

  const LocationCard = ({ icon, label, value, unit = "" }: {
    icon: React.ReactNode;
    label: string;
    value: string;
    unit?: string;
  }) => (
    <View style={styles.locationCard}>
      <View style={styles.cardIcon}>
        {icon}
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardLabel}>{label}</Text>
        <Text style={styles.cardValue}>
          {value}
          {unit && <Text style={styles.cardUnit}>{unit}</Text>}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <MapPin size={32} color={Colors.primary} strokeWidth={2} />
        </View>
        <Text style={styles.title}>Your Location</Text>
        <Text style={styles.subtitle}>Real-time GPS coordinates</Text>
      </View>

      {loading
        ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Getting your location...</Text>
          </View>
        )
        : errorMsg
        ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMsg}</Text>
            <Button
              title="Try Again"
              onPress={getLocation}
              variant="primary"
              style={styles.retryButton}
            />
          </View>
        )
        : location
        ? (
          <View style={styles.locationInfo}>
            <View style={styles.coordinatesGrid}>
              <LocationCard
                icon={
                  <Navigation
                    size={20}
                    color={Colors.primary}
                    strokeWidth={2}
                  />
                }
                label="Latitude"
                value={formatCoordinate(location.latitude)}
              />

              <LocationCard
                icon={
                  <Compass size={20} color={Colors.secondary} strokeWidth={2} />
                }
                label="Longitude"
                value={formatCoordinate(location.longitude)}
              />

              {location.accuracy !== undefined && (
                <LocationCard
                  icon={
                    <MapPin size={20} color={Colors.warning} strokeWidth={2} />
                  }
                  label="Patient is inside location."
                  value={""}
                  unit=""
                />
              )}

              {Platform.OS !== "web" && location.altitude !== undefined && (
                <LocationCard
                  icon={
                    <Navigation
                      size={20}
                      color={Colors.accent}
                      strokeWidth={2}
                    />
                  }
                  label="Altitude"
                  value={location.altitude.toFixed(0)}
                  unit="meters"
                />
              )}
            </View>

            <Button
              title="Refresh Location"
              onPress={getLocation}
              variant="secondary"
              style={styles.refreshButton}
            />
          </View>
        )
        : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Location not available</Text>
            <Button
              title="Get My Location"
              onPress={getLocation}
              variant="primary"
              style={styles.getLocationButton}
            />
          </View>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  header: {
    alignItems: "center",
    paddingVertical: 32,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: `${Colors.primary}10`,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 8,
    color: Colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  errorText: {
    fontSize: 16,
    color: Colors.accent,
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "500",
  },
  retryButton: {
    minWidth: 140,
  },
  locationInfo: {
    flex: 1,
  },
  coordinatesGrid: {
    gap: 16,
    marginBottom: 32,
  },
  locationCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.surfaceSecondary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: "600",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardValue: {
    fontSize: 18,
    color: Colors.text,
    fontWeight: "700",
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  cardUnit: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: "500",
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },
  refreshButton: {
    marginTop: "auto",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  getLocationButton: {
    minWidth: 180,
  },
});
