// GameContext.tsx
import React, {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState,
} from 'react';

interface IGameContext {
    difficulty: string;
    setDifficulty: Dispatch<SetStateAction<string>>;
    wordType: string;
    setWordType: Dispatch<SetStateAction<string>>;
    customWords: string[];
    setCustomWords: Dispatch<SetStateAction<string[]>>;
    foundWords: string[];
    setFoundWords: Dispatch<SetStateAction<string[]>>;
    wordBank: string[];
    setWordBank: Dispatch<SetStateAction<string[]>>;
    notFoundWords: string[];
    setNotFoundWords: Dispatch<SetStateAction<string[]>>;
}
interface IGameProviderProps {
    children: ReactNode;
}

export const GameContext = createContext<IGameContext | undefined>(undefined);

export const GameProvider: React.FC<IGameProviderProps> = ({ children }) => {
    const [difficulty, setDifficulty] = useState<string>('easy');
    const [wordType, setWordType] = useState<string>('random');
    const [customWords, setCustomWords] = useState<string[]>([]);
    const [foundWords, setFoundWords] = useState<string[]>([]);
    const [wordBank, setWordBank] = useState<string[]>([]);
    const [notFoundWords, setNotFoundWords] = useState<string[]>([]);

    return (
        <GameContext.Provider
            value={{
                difficulty,
                setDifficulty,
                wordType,
                setWordType,
                customWords,
                setCustomWords,
                foundWords,
                setFoundWords,
                wordBank,
                setWordBank,
                notFoundWords,
                setNotFoundWords,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};
