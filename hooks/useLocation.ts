import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Platform } from "react-native";

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number;
  altitudeAccuracy?: number;
  heading?: number;
  speed?: number;
}

export default function useLocation() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getLocation = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setLoading(false);
        return;
      }

      const locationResult = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLocation({
        latitude: locationResult.coords.latitude,
        longitude: locationResult.coords.longitude,
        accuracy: locationResult.coords.accuracy ?? undefined,
        altitude: locationResult.coords.altitude ?? undefined,
        altitudeAccuracy: locationResult.coords.altitudeAccuracy ?? undefined,
        heading: locationResult.coords.heading ?? undefined,
        speed: locationResult.coords.speed ?? undefined,
      });
    } catch (error) {
      setErrorMsg("Could not fetch location");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    location,
    errorMsg,
    loading,
    getLocation,
  };
}
