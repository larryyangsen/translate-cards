import React, { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce/lib';
import getDicts, { IDictionaryData } from './dictionary';
import Translate from './Translate';

const words = `Sed ut perspiciatis hello omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`;

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

function App() {
    const ref = useRef<HTMLDivElement>(null);
    const [search, setSearch] = useState('hello');
    const [leftTop, setLeftTop] = useState({ left: 0, top: 0 });
    const [highlightedWords, setHighlightedWords] = useState(highlightWords(search, words.split(' '), ref));
    const [dicts, setDicts] = useState<IDictionaryData[]>([]);

    const handleInputChanged = useDebouncedCallback((e: React.FocusEvent<HTMLInputElement>) => {
        setSearch(e.target.value ?? '');
    }, 200)

    useEffect(() => {
        const highlighted = highlightWords(search, words.split(' '), ref);
        setHighlightedWords(highlighted);
        setDicts([]);
        const fetchDicts = async () => {
            try {
                const data = await getDicts(search);
                setDicts(data);
            } catch (e) {
                setDicts([]);
            }
        };
        fetchDicts();
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
            <Translate data={dicts?.[0]} top={leftTop.top} left={leftTop.left} />
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
}

export default App;
