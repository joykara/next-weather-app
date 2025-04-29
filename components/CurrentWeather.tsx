import React from "react";
// import Image from "next/image";
import { CurrentWeatherData } from "@/utils";

interface Props {
    current: CurrentWeatherData;
}

const CurrentWeather = ({ current }: Props) => {
    const weather = current.weather[0];

    return (
        <div className="h-full w-full flex flex-col items-center justify-between rounded text-center p-4">
            <h2 className="text-xl font-semibold mb-2">Current Weather in {current.name}</h2>
            <div className="flex flex-col items-center gap-4">
                <img
                    width={30}
                    height={30}
                    className="w-32 h-32 object-contain"
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt={weather.description}
                />
                <div className="mt-4">
                    <p className="text-3xl font-bold">{Math.round(current.main.temp)}°C</p>
                    <p>{weather.main} - {weather.description}</p>
                </div>
            </div>
                <p className='text-lg text-pink-8 mt-2'>
                    {new Date().toLocaleDateString(undefined, {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    })}<br />
                    {current?.name || 'City'}
                </p>
        </div>
    );
};

export default CurrentWeather;