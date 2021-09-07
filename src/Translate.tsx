import React, { useState } from 'react';
import { IDictionaryData } from './dictionary';

const exampleData: IDictionaryData[] = [
    {
        word: 'hello',
        phonetics: [
            {
                text: '/həˈloʊ/',
                audio: 'https://lex-audio.useremarkable.com/mp3/hello_us_1_rr.mp3',
            },
            {
                text: '/hɛˈloʊ/',
                audio: 'https://lex-audio.useremarkable.com/mp3/hello_us_2_rr.mp3',
            },
        ],
        meanings: [
            {
                partOfSpeech: 'exclamation',
                definitions: [
                    {
                        definition: 'Used as a greeting or to begin a phone conversation.',
                        example: 'hello there, Katie!',
                    },
                ],
            },
            {
                partOfSpeech: 'noun',
                definitions: [
                    {
                        definition: 'An utterance of “hello”; a greeting.',
                        example: 'she was getting polite nods and hellos from people',
                        synonyms: [
                            'greeting',
                            'welcome',
                            'salutation',
                            'saluting',
                            'hailing',
                            'address',
                            'hello',
                            'hallo',
                        ],
                    },
                ],
            },
            {
                partOfSpeech: 'intransitive verb',
                definitions: [
                    {
                        definition: 'Say or shout “hello”; greet someone.',
                        example: 'I pressed the phone button and helloed',
                    },
                ],
            },
        ],
    },
];

interface ITranslateProps {
    data?: IDictionaryData;
    top?: number;
    left?: number;
}

const Translate = ({ data, top = 0, left = 0 }: ITranslateProps) => {
    const [meaningIndex, setMeaningIndex] = useState(0);

    const handleGoNextMeaning = () => () => {
        if (!data) return;
        setMeaningIndex((old) => {
            if (old < data.meanings.length - 1) {
                return old + 1;
            }
            return 0;
        });
    };
    const handleGoPrevMeaning = () => () => {
        if (!data) return;
        setMeaningIndex((old) => {
            if (old > 0) {
                return old - 1;
            }
            return data.meanings.length - 1;
        });
    };

    return data ? (
        <div style={{ top, left }} className="bg-gray-700 z-10 p-4 absolute  rounded-2xl w-72 text-white">
            <h3 className="capitalize text-4xl font-bold ">{data.word}</h3>
            <h4 className="space-x-2">
                {data.phonetics.map(({ text }, i) => (
                    <span key={i}>{text}</span>
                ))}
            </h4>
            <div>
                <div className="flex justify-between mt-4">
                    <h3>meanings</h3>
                    {data.meanings.length > 1 && (
                        <div className="space-x-2 flex">
                            <button onClick={handleGoPrevMeaning()}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>
                            <span>{meaningIndex + 1}</span>
                            <button onClick={handleGoNextMeaning()}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-2">
                <h4 className="mb-2">{data.meanings[meaningIndex].partOfSpeech}</h4>
                {data.meanings[meaningIndex].definitions.map(({ definition, example, synonyms = [] }, i) => (
                    <div className="space-y-2" key={i}>
                        <p>{definition}</p>
                        <p>{example}</p>
                        <ul>
                            {synonyms.map((synonym, i) => (
                                <li key={i}>{synonym}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    ) : null;
};
export default Translate;
