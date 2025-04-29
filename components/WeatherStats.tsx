import { TimerIcon } from "@radix-ui/react-icons";
import React from "react";

interface Props {
    wind: number;
    humidity: number;
}

const WeatherStats = ({ wind, humidity }: Props) => {
    const windSpeedKmh = (wind * 3.6).toFixed(1);
    return (
        <div className='flex flex-col items-center justify-between sm:flex-row gap-4 w-full'>
            <div className='card bg-purple-2 w-full sm:w-1/2'>
                <div className='card-body items-center gap-4 sm:gap-6'>
                    <h3 className='card-header text-content2'>Wind Speed</h3>
                    <p className='text-xl sm:text-3xl'>{windSpeedKmh} km/h</p>
                    <TimerIcon className="text-yellow-9" />
                </div>
            </div>
            <div className='card bg-purple-2 w-full sm:w-1/2'>
                <div className='card-body items-center gap-4 sm:gap-6'>
                    <h3 className='card-header text-content2'>Humidity</h3>
                    <p className='text-xl sm:text-3xl'>{humidity}%</p>
                    <progress className="progress progress-flat-warning" value={humidity} max="100"></progress>
                </div>
            </div>
        </div>
    );
};

export default WeatherStats;