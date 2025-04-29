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
      <button onClick={toggleTemperatureUnit} className='btn btn-secondary btn-sm'>
        {isCelsius ? 'Switch to °F' : 'Switch to °C'}
      </button>
    </div>
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 w-full'>
      {forecast.slice(1, 4).map((day: any, index: number) => {
        const date = new Date(day.dt_txt);
        return (
          <div key={index} className='card-body w-full border text-center rounded-md'>
            <h4>{date.toLocaleDateString()}</h4>
            <img
              width={30}
              height={30}
              className='w-20 h-20 mx-auto'
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
            />
            <p>{formatTemperature(day.main.temp).toFixed(1)}° {isCelsius ? 'C' : 'F'}</p>
            <p>{day.weather[0].description}</p>
          </div>
        );
      })}
    </div>
  </div>
)};

export default Forecast;