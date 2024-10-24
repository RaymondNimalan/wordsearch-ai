import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import {
    GestureHandlerRootView,
    TapGestureHandler,
} from 'react-native-gesture-handler';
import { wordSearchGame } from './wordSearchData';

const gridSize = 10;
// const letters = Array.from({ length: gridSize }, () =>
//     Array.from({ length: gridSize }, () =>
//         String.fromCharCode(Math.floor(Math.random() * 26) + 65)
//     )
// );

const letters = wordSearchGame.matrix;
const words = wordSearchGame.words;

const WordSearch: React.FC = () => {
    const [selectedLetters, setSelectedLetters] = useState<boolean[][]>(
        Array.from({ length: gridSize }, () => Array(gridSize).fill(false))
    );
    console.log(letters);
    console.log('words', words);

    const [startPosition, setStartPosition] = useState<{
        row: number;
        col: number;
    } | null>(null);
    const [endPosition, setEndPosition] = useState<{
        row: number;
        col: number;
    } | null>(null);

    const handleLetterPress = (row: number, col: number) => {
        if (!startPosition) {
            setStartPosition({ row, col });
            const newSelectedLetters = [...selectedLetters];
            newSelectedLetters[row][col] = true;
            setSelectedLetters(newSelectedLetters);
        } else {
            setEndPosition({ row, col });
            highlightLetters(startPosition, { row, col });
        }
    };

    const highlightLetters = (
        start: { row: number; col: number },
        end: { row: number; col: number }
    ) => {
        const newSelectedLetters = [...selectedLetters];

        const startRow = start.row;
        const endRow = end.row;
        const startCol = start.col;
        const endCol = end.col;

        if (startRow === endRow) {
            const minCol = Math.min(startCol, endCol);
            const maxCol = Math.max(startCol, endCol);

            for (let c = minCol; c <= maxCol; c++) {
                newSelectedLetters[startRow][c] = true;
            }
        } else if (startCol === endCol) {
            const minRow = Math.min(startRow, endRow);
            const maxRow = Math.max(startRow, endRow);

            for (let r = minRow; r <= maxRow; r++) {
                newSelectedLetters[r][startCol] = true;
            }
        } else if (
            Math.abs(startRow - endRow) === Math.abs(startCol - endCol)
        ) {
            const rowStep = startRow < endRow ? 1 : -1;
            const colStep = startCol < endCol ? 1 : -1;
            const steps = Math.abs(startRow - endRow);

            for (let i = 0; i <= steps; i++) {
                newSelectedLetters[startRow + i * rowStep][
                    startCol + i * colStep
                ] = true;
            }
        } else if (startRow - endRow === endCol - startCol) {
            const rowStep = startRow < endRow ? 1 : -1;
            const colStep = startCol > endCol ? -1 : 1;
            const steps = Math.abs(startRow - endRow);

            for (let i = 0; i <= steps; i++) {
                newSelectedLetters[startRow + i * rowStep][
                    startCol + i * colStep
                ] = true;
            }
        }

        setSelectedLetters(newSelectedLetters);
        const selectedWord = extractWord(start, end);

        if (selectedWord) {
            Alert.alert('Selected Word', selectedWord);
        }
        resetSelection();
    };

    const extractWord = (
        start: { row: number; col: number },
        end: { row: number; col: number }
    ) => {
        const selectedWord = [];

        if (start.row === end.row) {
            const minCol = Math.min(start.col, end.col);
            const maxCol = Math.max(start.col, end.col);

            for (let c = minCol; c <= maxCol; c++) {
                selectedWord.push(letters[start.row][c]);
            }
            if (end.col < start.col) {
                return selectedWord.reverse().join('');
            }
        } else if (start.col === end.col) {
            const minRow = Math.min(start.row, end.row);
            const maxRow = Math.max(start.row, end.row);

            for (let r = minRow; r <= maxRow; r++) {
                selectedWord.push(letters[r][start.col]);
            }

            if (end.row < start.row) {
                return selectedWord.reverse().join('');
            }
        } else if (
            Math.abs(start.row - end.row) === Math.abs(start.col - end.col)
        ) {
            const steps = Math.abs(start.row - end.row);
            const rowStep = start.row < end.row ? 1 : -1;
            const colStep = start.col < end.col ? 1 : -1;

            for (let i = 0; i <= steps; i++) {
                selectedWord.push(
                    letters[start.row + i * rowStep][start.col + i * colStep]
                );
            }
            if (end.row < start.row && end.col > start.col) {
                return selectedWord.reverse().join('');
            }
        } else if (start.row - end.row === end.col - start.col) {
            const steps = Math.abs(start.row - end.row);
            const rowStep = start.row < end.row ? 1 : -1;
            const colStep = start.col > end.col ? -1 : 1;

            for (let i = 0; i <= steps; i++) {
                selectedWord.push(
                    letters[start.row + i * rowStep][start.col + i * colStep]
                );
            }
            if (end.row < start.row && end.col > start.col) {
                return selectedWord.reverse().join('');
            }
        }

        return selectedWord.join('');
    };

    const resetSelection = () => {
        setSelectedLetters(
            Array.from({ length: gridSize }, () => Array(gridSize).fill(false))
        );
        setStartPosition(null);
        setEndPosition(null);
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.grid}>
                {letters.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((letter, colIndex) => (
                            <TapGestureHandler
                                key={colIndex}
                                onActivated={() =>
                                    handleLetterPress(rowIndex, colIndex)
                                }
                            >
                                <View
                                    style={[
                                        styles.cell,
                                        selectedLetters[rowIndex][colIndex] &&
                                            styles.selected,
                                    ]}
                                >
                                    <Text style={styles.letter}>{letter}</Text>
                                </View>
                            </TapGestureHandler>
                        ))}
                    </View>
                ))}
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    grid: {
        width: 300,
        height: 300,
        borderWidth: 1,
        borderColor: '#000',
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
    },
    selected: {
        backgroundColor: 'yellow',
    },
    letter: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default WordSearch;
