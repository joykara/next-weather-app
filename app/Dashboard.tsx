'use client';
import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import CurrentWeather from '@/components/CurrentWeather';
import Forecast from '@/components/Forecasts';
import WeatherStats from '@/components/WeatherStats';
import { WeatherData } from '@/utils';

const GEO_API_KEY = '3232672d146d85b7a20afb17a17bc435';

export default function Dashboard() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<any>(null);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [isCelsius, setIsCelsius] = useState(true); // lifted state

    const toggleTemperatureUnit = () => setIsCelsius((prev) => !prev);

    const fetchWeather = async (lat: number, lon: number) => {
        const res = await fetch(`http://localhost:8000/api/weather?lat=${lat}&lon=${lon}`);
        const data = await res.json();
        console.log('fetchWeather WeatherData', data);
        setWeatherData(data);
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

    const handleInputChange = (value: string) => {
        setQuery(value);
        if (value.length > 2) fetchSuggestions(value);
    };

    const handleSearch = async () => {
        if (!selectedLocation) return;

        const res = await fetch(
            `http://localhost:8000/api/weather?lat=${selectedLocation.lat}&lon=${selectedLocation.lon}`
        );
        const data = await res.json();
        setWeatherData(data);
    };

    return (
        <div className="w-screen h-screen flex flex-col-reverse sm:flex-row gap-8">
            {weatherData && (
                <div className='w-full max-w-sm h-full border-r border-purple-100 shadow-md p-4 text-center'>
                    <CurrentWeather current={weatherData.current} />
                </div>
            )}

            <div className="w-full md:w-3/4 max-w-6xl flex flex-col items-center gap-4 p-4">
                <SearchBar
                    query={query}
                    suggestions={suggestions}
                    onInputChange={handleInputChange}
                    onSelectLocation={(city) => {
                        setSelectedLocation(city);
                        setQuery(`${city.name}, ${city.country}`);
                        setSuggestions([]);
                    }}
                    onSearch={handleSearch}
                />

                {weatherData && (
                    <div className="w-full max-w-6xl grid gap-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            <Forecast forecast={weatherData.forecast.slice(1, 4)}
                                isCelsius={isCelsius}
                                toggleTemperatureUnit={toggleTemperatureUnit}
                            />
                        </div>
                        <WeatherStats
                            wind={weatherData.current.wind.speed}
                            humidity={weatherData.current.main.humidity}
                        />
                    </div>
                )}</div>
        </div>
    );
}
