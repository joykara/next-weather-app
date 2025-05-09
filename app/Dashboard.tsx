'use client';
import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import CurrentWeather from '@/components/CurrentWeather';
import Forecast from '@/components/Forecasts';
import WeatherStats from '@/components/WeatherStats';
import { LocationSuggestion, WeatherData } from '@/utils';

const GEO_API_KEY = '3232672d146d85b7a20afb17a17bc435';

export default function Dashboard() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<LocationSuggestion | null>(null);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [isCelsius, setIsCelsius] = useState(true);
    const [loading, setLoading] = useState(false);

    const toggleTemperatureUnit = () => setIsCelsius((prev) => !prev);

    const fetchWeather = async (lat: number, lon: number) => {
        setLoading(true);
        try {
            const res = await fetch(`https://laravel-weather-api.onrender.com/api/weather?lat=${lat}&lon=${lon}`);
            const data = await res.json();
            setWeatherData(data);
        } catch (error) {
            console.error('Failed to fetch weather:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather(-1.286389, 36.817223);
    }, []);

    const fetchSuggestions = async (input: string) => {
        const res = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${GEO_API_KEY}`
        );
        const data = await res.json();
        setSuggestions(data);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        if (value.length > 2) fetchSuggestions(value);
    };

    const handleSearch = async () => {
        if (!selectedLocation) return;
        setLoading(true);
        try {
            const res = await fetch(
                `https://laravel-weather-api.onrender.com/api/weather?lat=${selectedLocation.lat}&lon=${selectedLocation.lon}`
            );
            const data = await res.json();
            setWeatherData(data);
        } catch (error) {
            console.error('Failed to search weather:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-screen h-screen flex flex-col sm:flex-row relative overflow-y-auto text-black dark:text-white">

            {loading ? (
                <div className="flex flex-col justify-center items-center w-full h-full bg-gradient-to-br from-pink-100 via-purple-200 to-white dark:from-pink-6 dark:via-purple-4 dark:to-black transition-colors">
                    <div className="spinner-dot-intermittent [--spinner-color:var(--pink-8)]"></div>
                    <p className="mt-2 text-pink-8">Fetching weather data...</p>
                </div>
            ) : (
                <>
                    {weatherData && (
                        <div className='w-full max-w-sm h-full bg-purple-50 dark:bg-purple-2 shadow-md p-4 text-center'>
                            <CurrentWeather current={weatherData.current} />
                        </div>
                    )}

                    <div className="w-full h-full flex flex-col items-center justify-start gap-4 bg-gradient-to-br from-pink-100 via-purple-200 to-white dark:from-pink-6 dark:via-purple-4 dark:to-black transition-colors">
                        <SearchBar
                            query={query}
                            suggestions={suggestions}
                            onInputChange={handleInputChange}
                            onCitySelect={(city) => {
                                setSelectedLocation(city);
                                setQuery(`${city.name}, ${city.country}`);
                                setSuggestions([]);
                            }}
                            onSearch={handleSearch}
                        />

                        {weatherData && (
                            <div className="w-full max-w-6xl flex flex-col justify-between gap-6 md:gap-8 p-4 md:px-8">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <Forecast forecast={weatherData.forecast}
                                        isCelsius={isCelsius}
                                        toggleTemperatureUnit={toggleTemperatureUnit}
                                    />
                                </div>
                                <WeatherStats
                                    wind={weatherData.current.wind.speed}
                                    humidity={weatherData.current.main.humidity}
                                />
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
