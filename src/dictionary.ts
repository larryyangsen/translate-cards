const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

export interface IPhonetic {
    text: string;
    audio: string;
}
export interface IMeaning {
    partOfSpeech: string;
    definitions: {
        definition: string;
        example: string;
        synonyms?: string[];
    }[];
}
export interface IDictionaryData {
    word: string;
    phonetics: IPhonetic[];
    meanings: IMeaning[];
}

const getDicts = async (word: string) => {
    const response = await fetch(`${url}${word}`);
    const data = await response.json();
    return data as IDictionaryData[];
};

export default getDicts;
