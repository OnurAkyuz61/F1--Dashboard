// Weather Service using Open-Meteo API
// Free, no API key required

export interface WeatherData {
  temperature: number;
  condition: string;
  conditionCode: number;
}

// Map Open-Meteo weather codes to human-readable conditions
function getWeatherCondition(code: number): string {
  // WMO Weather interpretation codes (WW)
  // https://open-meteo.com/en/docs
  if (code === 0) return "Clear Sky";
  if (code === 1 || code === 2 || code === 3) return "Partly Cloudy";
  if (code === 45 || code === 48) return "Foggy";
  if (code === 51 || code === 53 || code === 55) return "Drizzle";
  if (code === 56 || code === 57) return "Freezing Drizzle";
  if (code === 61 || code === 63 || code === 65) return "Rain";
  if (code === 66 || code === 67) return "Freezing Rain";
  if (code === 71 || code === 73 || code === 75) return "Snow";
  if (code === 77) return "Snow Grains";
  if (code === 80 || code === 81 || code === 82) return "Rain Showers";
  if (code === 85 || code === 86) return "Snow Showers";
  if (code === 95) return "Thunderstorm";
  if (code === 96 || code === 99) return "Thunderstorm with Hail";
  
  return "Unknown";
}

/**
 * Get current weather for a track location
 * @param latitude - Latitude of the circuit
 * @param longitude - Longitude of the circuit
 * @returns Weather data or null if fetch fails
 */
export async function getTrackWeather(
  latitude: number,
  longitude: number
): Promise<WeatherData | null> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;
    
    console.log(`[getTrackWeather] Fetching weather for lat: ${latitude}, long: ${longitude}`);
    
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.current_weather) {
      console.warn(`[getTrackWeather] No current_weather data in response`);
      return null;
    }

    const weather = data.current_weather;
    const condition = getWeatherCondition(weather.weathercode);

    console.log(`[getTrackWeather] Weather fetched: ${weather.temperature}°C, ${condition}`);

    return {
      temperature: Math.round(weather.temperature),
      condition,
      conditionCode: weather.weathercode,
    };
  } catch (error) {
    console.error(`[getTrackWeather] Failed to fetch weather:`, error);
    return null;
  }
}

