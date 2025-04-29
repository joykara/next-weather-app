'use client';
import React from 'react';
import type { LocationSuggestion } from '@/utils';
import ThemeToggle from './ThemeToggler';

interface SearchBarProps {
    query: string;
    suggestions: LocationSuggestion[];
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCitySelect: (city: LocationSuggestion) => void;
    onSearch: () => void;
}

const SearchBar = ({ query, suggestions, onInputChange, onCitySelect, onSearch }: SearchBarProps) => (
    <div className='flex gap-3 sm:gap-4 items-center justify-start w-full max-w-6xl h-[5dvh] mt-4 sm:mt-6 mb-4 p-4 md:p-8'>
        <div className='relative'>
            <input
                type='text'
                value={query}
                onChange={onInputChange}
                placeholder='Search for a city...'
                className='input bg-purple-100 dark:bg-purple-1 border-pink-100 dark:border-pink-1 input-md w-full'
            />

            {suggestions.length > 0 && (
                <ul className='bg-purple-2 border shadow-md rounded-md max-h-60 overflow-auto mt-2 mb-4 absolute top-10'>
                    {suggestions.map((city, idx) => (
                        <li
                            key={idx}
                            className='px-4 py-2 hover:bg-pink-2 cursor-pointer'
                            onClick={() => onCitySelect(city)}
                        >
                            {city.name}, {city.state ? `${city.state}, ` : ''}{city.country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
        <button className='btn btn-secondary btn-sm md:btn-md bg-pink-7 hover:btn-success w-fit self-center' onClick={onSearch}>
            GO
        </button>
        <ThemeToggle />
    </div>
);

export default SearchBar;