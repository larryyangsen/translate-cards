import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useDebouncedCallback } from 'use-debounce';
import getDicts from './dictionary';
import Translate from './Translate';

const words = `The Legend of Zelda: Breath of the Wild’s sheer freedom and sense of adventure is a remarkable achievement. Right from the start, the vast landscape of Hyrule is thrown completely open to you, and it constantly finds ways to pique your curiosity with mysterious landmarks, complex hidden puzzles, and enemy camps to raid for treasure and weapons. The fact that you can tackle any one of these things at your own pace and almost never get pulled to the main path is liberating, but the way all of Breath of the Wild’s systems fit elegantly into complex light survival game is even more impressive. I’ve been running around for over 50 hours and I still have plenty of mysteries left to track down and lots of wonderfully crafted puzzles to solve. I’m in awe of the scope and scale of this adventure, and I often find myself counting the hours until I can get back in.`;

const highlightWords = (search: string, words: string[], ref: React.RefObject<HTMLDivElement>) => {
    let hasSearched = false;
    const highlightedWords = words.map((word, i) => {
        if (!!search && !hasSearched && word.toLowerCase().replace(/\W/, '') === search.toLowerCase()) {
            hasSearched = true;
            return (
                <span className="highlighted bg-gray-500 text-gray-200 p-1 mr-1 rounded-md" key={i}>
                    {word}
                </span>
            );
        }
        return word + ' ';
    });
    return [
        hasSearched,
        <div ref={ref} className="p-8 break-normal space-x-1 leading-8 border-2 mt-4 text-gray-400 rounded-lg bg-white">
            {highlightedWords}
        </div>,
    ];
};
const Card = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [search, setSearch] = useState('legend');
    const [leftTop, setLeftTop] = useState({ left: 0, top: 0 });
    const [[hasSearched, highlightedWords], setHighlightedWords] = useState(
        highlightWords(search, words.split(' '), ref)
    );
    const { data: dicts = [] } = useQuery(['dict', search], () => getDicts(search));
    const handleInputChanged = useDebouncedCallback((e: React.FocusEvent<HTMLInputElement>) => {
        setSearch(e.target.value ?? '');
    }, 200);

    useEffect(() => {
        setHighlightedWords(highlightWords(search, words.split(' '), ref));
    }, [search]);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current?.querySelector('.highlighted')?.getBoundingClientRect();
            if (rect) {
                setLeftTop({ left: rect.left, top: rect.top + 25 });
            }
        }
    }, [highlightedWords]);

    return (
        <div className="container  font-sans min-h-screen flex mx-auto">
            {hasSearched && <Translate data={dicts?.[0]} top={leftTop.top} left={leftTop.left} />}
            <div className="w-1/2 flex  flex-col m-auto">
                <h1 className="text-5xl">Find Term and Dictionary</h1>
                <div className="relative w-full mt-4">
                    <input
                        onChange={handleInputChanged}
                        type="text"
                        placeholder="Search the term in article"
                        className="px-12 py-4 w-full border-none focus:ring-0 focus:border-none shadow-lg rounded-xl"
                    />
                    <button className="absolute left-0 top-0 p-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                    {highlightedWords}
                </div>
            </div>
        </div>
    );
};

export default Card;
