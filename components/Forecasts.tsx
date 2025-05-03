// import Image from 'next/image';
import React from 'react';
import { ForecastData } from "@/utils";

interface Props {
  forecast: ForecastData[];
  isCelsius: boolean;
  toggleTemperatureUnit: () => void;
}

const Forecast = ({ forecast, isCelsius, toggleTemperatureUnit }: Props) => {
  function formatTemperature(temp: number) {
    return isCelsius ? temp : (temp * 9) / 5 + 32;
  }

  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <h3 className='text-lg font-semibold'>3-Day Forecast</h3>
        <button onClick={toggleTemperatureUnit} className='btn btn-secondary btn-sm bg-pink-7 sm:absolute top-6 right-4'>
          {isCelsius ? '°F' : '°C'}
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full'>
        {forecast.map((day, index) => {
          const date = new Date(day.date);

          return (
            <div key={index} className='card-body bg-purple-50 dark:bg-purple-2 w-full text-center rounded-md'>
              <h4>{date.toLocaleDateString()}</h4>
              <img
                width={30}
                height={30}
                className='w-20 h-20 mx-auto'
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.description}
              />
              <p>{formatTemperature(day.min_temp).toFixed(1)}° - {formatTemperature(day.max_temp).toFixed(1)}° {isCelsius ? 'C' : 'F'}</p>
              <p>{day.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
