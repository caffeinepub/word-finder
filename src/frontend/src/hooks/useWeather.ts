import { useEffect, useState } from "react";

interface WeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  cityName: string;
  catEmoji: string;
  loading: boolean;
  error: string | null;
}

function mapWeatherCode(code: number): { condition: string; catEmoji: string } {
  if (code === 0) return { condition: "Clear Sky", catEmoji: "😸" };
  if (code <= 3) return { condition: "Partly Cloudy", catEmoji: "😼" };
  if (code === 45 || code === 48) return { condition: "Foggy", catEmoji: "🙀" };
  if (code >= 51 && code <= 65) return { condition: "Rainy", catEmoji: "😿" };
  if (code >= 71 && code <= 77) return { condition: "Snowy", catEmoji: "🐱" };
  if (code >= 80 && code <= 82) return { condition: "Showers", catEmoji: "😾" };
  if (code >= 95 && code <= 99)
    return { condition: "Thunderstorm", catEmoji: "🙀" };
  return { condition: "Cloudy", catEmoji: "😺" };
}

const FALLBACK: WeatherData = {
  temp: 22,
  feelsLike: 20,
  humidity: 60,
  windSpeed: 12,
  condition: "Partly Cloudy",
  cityName: "Your City",
  catEmoji: "😸",
  loading: false,
  error: null,
};

export function useWeather(): WeatherData {
  const [data, setData] = useState<WeatherData>({
    ...FALLBACK,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    function handleError() {
      if (!cancelled) setData(FALLBACK);
    }

    async function fetchWeather(lat: number, lon: number) {
      try {
        const [geoRes, weatherRes] = await Promise.all([
          fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
            { headers: { "Accept-Language": "en" } },
          ),
          fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&temperature_unit=celsius`,
          ),
        ]);

        if (!geoRes.ok || !weatherRes.ok) {
          handleError();
          return;
        }

        const [geoJson, weatherJson] = await Promise.all([
          geoRes.json(),
          weatherRes.json(),
        ]);

        if (cancelled) return;

        const addr = geoJson?.address ?? {};
        const cityName: string =
          addr.city || addr.town || addr.village || addr.county || "Your City";

        const cur = weatherJson?.current ?? {};
        const temp = Math.round(cur.temperature_2m ?? 22);
        const feelsLike = Math.round(cur.apparent_temperature ?? 20);
        const humidity = Math.round(cur.relative_humidity_2m ?? 60);
        const windSpeed = Math.round(cur.wind_speed_10m ?? 12);
        const weatherCode: number = cur.weather_code ?? 1;
        const { condition, catEmoji } = mapWeatherCode(weatherCode);

        setData({
          temp,
          feelsLike,
          humidity,
          windSpeed,
          condition,
          cityName,
          catEmoji,
          loading: false,
          error: null,
        });
      } catch {
        if (!cancelled) handleError();
      }
    }

    if (!navigator.geolocation) {
      handleError();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchWeather(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        if (!cancelled) handleError();
      },
      { timeout: 8000 },
    );

    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}
