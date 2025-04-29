import React from "react";

interface Props {
  wind: number;
  humidity: number;
}

const WeatherStats = ({ wind, humidity }: Props) => {
    const windSpeedKmh = (wind * 3.6).toFixed(1);
    return (
        <div className='flex flex-col sm:flex-row gap-4 w-full'>
            <div className='card bg-gray-2'>
                <div className='card-body'>
                    <h3 className='card-header'>Wind Speed</h3>
                    <p className='text-content2 text-lg'>{windSpeedKmh} km/h</p>
                </div>
            </div>
            <div className='card bg-gray-2'>
                <div className='card-body'>
                    <h3 className='card-header'>Humidity</h3>
                    <p className='text-content2 text-lg'>{humidity}%</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherStats;