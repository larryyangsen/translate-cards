import React, { useState } from 'react';
import { IDictionaryData } from './dictionary';

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
        <div style={{ top, left }} className="bg-gray-700 z-10 p-4 absolute  rounded-2xl  text-white">
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
                            <button className="hover:opacity-70" onClick={handleGoPrevMeaning()}>
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
                            <button className="hover:opacity-60" onClick={handleGoNextMeaning()}>
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
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <div style={{ top, left }} className="bg-gray-700 z-10 p-4 absolute  rounded-2xl  text-white">
            No Results
        </div>
    );
};
export default Translate;
