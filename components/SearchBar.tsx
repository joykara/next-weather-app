'use client';
import React from 'react';

interface SearchBarProps {
    query: string;
    suggestions: any[];
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCitySelect: (city: any) => void;
    onSearch: () => void;
}

const SearchBar = ({ query, suggestions, onInputChange, onCitySelect, onSearch }: SearchBarProps) => (
    <div className='flex gap-3 sm:gap-4 items-center justify-start w-full h-[5dvh] mt-4 mb-8'>
        <div className='relative'>
            <input
                type='text'
                value={query}
                onChange={onInputChange}
                placeholder='Search for a city...'
                className='input input-secondary input-md w-full'
            />

            {suggestions.length > 0 && (
                <ul className='bg-white dark:bg-backgroundSecondary border shadow-md rounded-md max-h-60 overflow-auto mt-2 mb-4 absolute top-10'>
                    {suggestions.map((city, idx) => (
                        <li
                            key={idx}
                            className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                            onClick={() => onCitySelect(city)}
                        >
                            {city.name}, {city.state ? `${city.state}, ` : ''}{city.country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
        <button className='btn btn-secondary btn-sm md:btn-md w-fit self-center' onClick={onSearch}>
            GO
        </button>
    </div>
);

export default SearchBar;