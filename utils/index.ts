export interface LocationSuggestion {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
  }
  
export interface WeatherData {
    current: CurrentWeatherData;
    forecast: ForecastData[];
}

export interface CurrentWeatherData {
    name: string;
    coord: {
        lat: number;
        lon: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level?: number;
        grnd_level?: number;
    };
    wind: {
        speed: number;
        deg: number;
        gust?: number;
    };
    clouds: {
        all: number;
    };
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    dt: number;
    visibility: number;
}

export interface ForecastData {
    date: string;
    min_temp: number;
    max_temp: number;
    description: string;
    icon: string;
}