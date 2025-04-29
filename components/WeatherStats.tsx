import { TimerIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

interface Props {
    wind: number;
    humidity: number;
}

const WeatherStats = ({ wind, humidity }: Props) => {
    const [isKmh, setIsKmh] = useState<boolean>(true);

    const toggleUnit = () => setIsKmh(prev => !prev);
    const windSpeed = isKmh ? `${(wind * 3.6).toFixed(1)} km/h` : `${wind.toFixed(1)} m/s`;

    return (
        <div className='flex flex-col items-center justify-between sm:flex-row gap-4 w-full'>
            <div className='card bg-purple-50 dark:bg-purple-2 w-full sm:w-1/2'>
                <div className='card-body items-center gap-4 sm:gap-6'>
                    <h3 className='card-header text-content2'>Wind Speed</h3>
                    <p className='text-xl sm:text-3xl'>{windSpeed}</p>
                    <button onClick={toggleUnit} className="btn btn-ghost btn-sm text-black hover:bg-yellow-3" title="Toggle units">
                        <TimerIcon className="text-yellow-9 w-5 h-5" /> {isKmh ? ' km/h' : ' m/s'}
                    </button>
                </div>
            </div>

            <div className='card bg-purple-50 dark:bg-purple-2 w-full sm:w-1/2'>
                <div className='card-body items-center gap-4 sm:gap-6'>
                    <h3 className='card-header text-content2'>Humidity</h3>
                    <p className='text-xl sm:text-3xl'>{humidity}%</p>
                    <progress className="progress progress-flat-warning" value={humidity} max="100" />
                </div>
            </div>
        </div>
    );
};

export default WeatherStats;