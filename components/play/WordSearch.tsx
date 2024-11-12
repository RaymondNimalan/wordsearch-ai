import { GameContext } from '@/context/GameProvider';
import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import {
    GestureHandlerRootView,
    PanGestureHandler,
    State,
} from 'react-native-gesture-handler';
import { wordSearchGame } from './wordSearchData';

const gridSize = 8;
const letters = wordSearchGame.matrix;
const words = wordSearchGame.words;

const WordSearch: React.FC = () => {
    const [selectedLetters, setSelectedLetters] = useState<boolean[][]>(
        Array.from({ length: gridSize }, () => Array(gridSize).fill(false))
    );
    const [foundLetters, setFoundLetters] = useState<boolean[][]>(
        Array.from({ length: gridSize }, () => Array(gridSize).fill(false))
    );

    const {
        wordBank,
        setWordBank,
        foundWords,
        setFoundWords,
        notFoundWords,
        setNotFoundWords,
    } = useContext(GameContext);

    const [startPosition, setStartPosition] = useState<{
        row: number;
        col: number;
    } | null>(null);
    const [currentPath, setCurrentPath] = useState<
        { row: number; col: number }[]
    >([]);

    const handlePanGestureEvent = (event) => {
        if (!startPosition) return;

        const { translationX, translationY } = event.nativeEvent;
        const targetRow = startPosition.row + Math.round(translationY / 30);
        const targetCol = startPosition.col + Math.round(translationX / 30);

        if (
            isWithinBounds(targetRow, targetCol) &&
            isStraightLine(startPosition, { row: targetRow, col: targetCol })
        ) {
            const alreadySelected = currentPath.some(
                (cell) => cell.row === targetRow && cell.col === targetCol
            );
            if (!alreadySelected) {
                highlightLetters(startPosition, {
                    row: targetRow,
                    col: targetCol,
                });
                setCurrentPath((prevPath) => [
                    ...prevPath,
                    { row: targetRow, col: targetCol },
                ]);
            }
        }
    };

    const handlePanGestureStateChange = (event) => {
        const { state, x, y } = event.nativeEvent;

        if (state === State.BEGAN) {
            const row = Math.floor(y / 30);
            const col = Math.floor(x / 30);
            if (isWithinBounds(row, col)) {
                setStartPosition({ row, col });
                markLetter(row, col);
                setCurrentPath([{ row, col }]);
            }
        } else if (state === State.END && startPosition) {
            checkSelectedWord(currentPath);
            resetSelection();
        }
    };

    const isWithinBounds = (row, col) => {
        return row >= 0 && row < gridSize && col >= 0 && col < gridSize;
    };

    const isStraightLine = (start, end) => {
        return (
            start.row === end.row || // horizontal
            start.col === end.col || // vertical
            Math.abs(start.row - end.row) === Math.abs(start.col - end.col) // diagonal
        );
    };

    const markLetter = (row, col) => {
        const newSelectedLetters = [...selectedLetters];
        newSelectedLetters[row][col] = true;
        setSelectedLetters(newSelectedLetters);
    };

    const highlightLetters = (start, end) => {
        const newSelectedLetters = Array.from({ length: gridSize }, () =>
            Array(gridSize).fill(false)
        );
        if (start.row === end.row) {
            const minCol = Math.min(start.col, end.col);
            const maxCol = Math.max(start.col, end.col);
            for (let c = minCol; c <= maxCol; c++) {
                newSelectedLetters[start.row][c] = true;
            }
        } else if (start.col === end.col) {
            const minRow = Math.min(start.row, end.row);
            const maxRow = Math.max(start.row, end.row);
            for (let r = minRow; r <= maxRow; r++) {
                newSelectedLetters[r][start.col] = true;
            }
        } else {
            const rowStep = start.row < end.row ? 1 : -1;
            const colStep = start.col < end.col ? 1 : -1;
            const steps = Math.abs(start.row - end.row);
            for (let i = 0; i <= steps; i++) {
                newSelectedLetters[start.row + i * rowStep][
                    start.col + i * colStep
                ] = true;
            }
        }
        setSelectedLetters(newSelectedLetters);
    };

    const checkSelectedWord = (path) => {
        const selectedWord = path
            .map(({ row, col }) => letters[row][col])
            .join('');

        console.log(selectedWord);
        const reversedWord = selectedWord.split('').reverse().join('');

        if (notFoundWords.includes(selectedWord)) {
            Alert.alert('Selected Word', selectedWord);
            setFoundWords([...foundWords, selectedWord]);
            setNotFoundWords(
                notFoundWords.filter((word) => word !== selectedWord)
            );
            highlightFoundWord(path);
        }
    };

    const highlightFoundWord = (path) => {
        const newFoundLetters = [...foundLetters];
        path.forEach(({ row, col }) => {
            newFoundLetters[row][col] = true;
        });
        setFoundLetters(newFoundLetters);
    };

    const resetSelection = () => {
        setSelectedLetters(
            Array.from({ length: gridSize }, () => Array(gridSize).fill(false))
        );
        setStartPosition(null);
        setCurrentPath([]);
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <PanGestureHandler
                onGestureEvent={handlePanGestureEvent}
                onHandlerStateChange={handlePanGestureStateChange}
            >
                <View style={styles.grid}>
                    {letters.map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.row}>
                            {row.map((letter, colIndex) => (
                                <View
                                    key={colIndex}
                                    style={[
                                        styles.cell,
                                        foundLetters[rowIndex][colIndex]
                                            ? styles.found
                                            : selectedLetters[rowIndex][
                                                  colIndex
                                              ]
                                            ? styles.selected
                                            : null,
                                    ]}
                                >
                                    <Text style={styles.letter}>{letter}</Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FEF08A',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '85%',
        aspectRatio: 1,
        borderRadius: 12,
        justifyContent: 'center',
        alignSelf: 'center',
        transform: [{ translateX: -12 }],
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        width: '11%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,
        borderRadius: 12,
        borderWidth: 1.5,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        transform: [{ translateY: -2 }],
    },
    selected: {
        backgroundColor: '#ffeb3b',
        borderColor: '#fbc02d',
        borderWidth: 1,
    },
    found: {
        backgroundColor: '#ff5722',
        borderColor: '#e64a19',
        borderWidth: 1,
    },
    letter: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#212121',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});

export default WordSearch;
