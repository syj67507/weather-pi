import { useEffect, useState } from "react";
import axios from "axios";

function getAQIBandFromValue(value: number): string {
    if (value === 1) {
        return "Good";
    }
    if (value === 2) {
        return "Moderate";
    }
    if (value === 3) {
        return "Unhealthy for sensitive group";
    }
    if (value === 4) {
        return "Unhealthy";
    }
    if (value === 5) {
        return "Very Unhealthy";
    }
    if (value === 6) {
        return "Hazardous";
    }
    return "Unknown"
}

function getUVFromValue(value: number): { band: string; meaning: string; } {
    if (value <= 2.5) {
        return { band: "Low", meaning: "Safe to be outdoors" };
    }
    if (value <= 5.5) {
        return { band: "Moderate", meaning: "Sun protection recommended" };
    }
    if (value <= 7.5) {
        return { band: "High", meaning: "Sun protection required" };
    }
    if (value <= 10.5) {
        return { band: "Very High", meaning: "Sun protection required" };
    }
    return { band: "Extreme", meaning: "Stay inside" };
}


/**
 * Parses raw weather data that is returned from the API into data that I care about
 * @param {object} rawWeatherData 
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseWeatherData(rawWeatherData: any): WeatherData {
    const {
        maxtemp_c,
        maxtemp_f,
        mintemp_c,
        mintemp_f,
        daily_chance_of_rain
    } = rawWeatherData.forecast.forecastday[0].day;

    const {
        condition,
        wind_mph,
        wind_kph,
        humidity,
        uv,
        air_quality,
        temp_f,
        temp_c,
    } = rawWeatherData.current;

    const data = {
        location: {
            city: rawWeatherData.location.name,
        },
        forecast: {
            maxtemp_c,
            maxtemp_f,
            mintemp_c,
            mintemp_f,
            daily_chance_of_rain,
        },
        current: {
            is_day: rawWeatherData.current.is_day,
            condition: condition.text,
            conditionIcon: condition.icon,
            conditionCode: condition.code,
            wind_mph,
            wind_kph,
            humidity,
            uvValue: uv,
            uvBand: getUVFromValue(uv).band,
            uvMeaning: getUVFromValue(uv).meaning,
            airQualityValue: air_quality["us-epa-index"],
            airQualityBand: getAQIBandFromValue(air_quality["us-epa-index"]),
            temp_f,
            temp_c,
        },
    }

    return data;
}


export interface WeatherData {
    location: {
        city: string;
    };
    forecast: {
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
        daily_chance_of_rain: number;
    },
    current: {
        is_day: number;
        condition: string;
        conditionCode: number;
        conditionIcon: string;
        wind_mph: number;
        wind_kph: number;
        humidity: number;
        uvValue: number;
        uvBand: string;
        uvMeaning: string;
        airQualityBand: string;
        airQualityValue: number;
        temp_f: number;
        temp_c: number;
    },
}

const baseUrl = "http://api.weatherapi.com/v1";
const longLat = "33.956990,-84.245970";
const key = "d7b82b31e5974acc946201135241307";

export function useGetWeatherData() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<{ error: string } | null>(null);

    useEffect(() => {
        async function getWeatherData() {
            setLoading(true);
            const response = await axios.get(`${baseUrl}/forecast.json`,{
                params: {
                    q: longLat,
                    key: key, 
                    aqi: "yes",
                }
            })
            setData(parseWeatherData(response.data));
        }

        getWeatherData()
            .catch((e) => {
                console.error(e);
                setData(null);
                setError({
                    error: "Some error"
                })
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    return { loading, data, error };
}