// import { GameContext } from '@/context/GameProvider';
// import React, { useContext, useState } from 'react';
// import { Alert, StyleSheet, Text, View } from 'react-native';
// import {
//     GestureHandlerRootView,
//     TapGestureHandler,
// } from 'react-native-gesture-handler';
// import { wordSearchGame } from './wordSearchData';

// const gridSize = 10;
// // const letters = Array.from({ length: gridSize }, () =>
// //     Array.from({ length: gridSize }, () =>
// //         String.fromCharCode(Math.floor(Math.random() * 26) + 65)
// //     )
// // );

// const letters = wordSearchGame.matrix;
// const words = wordSearchGame.words;

// const WordSearch: React.FC = () => {
//     const [selectedLetters, setSelectedLetters] = useState<boolean[][]>(
//         Array.from({ length: gridSize }, () => Array(gridSize).fill(false))
//     );
//     // console.log(letters);
//     console.log('words', words);

//     const {
//         wordBank,
//         setWordBank,
//         foundWords,
//         setFoundWords,
//         notFoundWords,
//         setNotFoundWords,
//     } = useContext(GameContext);

//     // useEffect(() => {
//     //     setWordBank(words);
//     //     console.log('word bank:', wordBank);
//     // }, []);

//     // useEffect(() => {
//     //     console.log('words found:', foundWords);
//     // }, [foundWords]);

//     const [startPosition, setStartPosition] = useState<{
//         row: number;
//         col: number;
//     } | null>(null);
//     const [endPosition, setEndPosition] = useState<{
//         row: number;
//         col: number;
//     } | null>(null);

//     const handleLetterPress = (row: number, col: number) => {
//         if (!startPosition) {
//             setStartPosition({ row, col });
//             const newSelectedLetters = [...selectedLetters];
//             newSelectedLetters[row][col] = true;
//             setSelectedLetters(newSelectedLetters);
//         } else {
//             setEndPosition({ row, col });
//             highlightLetters(startPosition, { row, col });
//         }
//     };

//     const highlightLetters = (
//         start: { row: number; col: number },
//         end: { row: number; col: number }
//     ) => {
//         const newSelectedLetters = [...selectedLetters];

//         const startRow = start.row;
//         const endRow = end.row;
//         const startCol = start.col;
//         const endCol = end.col;

//         if (startRow === endRow) {
//             const minCol = Math.min(startCol, endCol);
//             const maxCol = Math.max(startCol, endCol);

//             for (let c = minCol; c <= maxCol; c++) {
//                 newSelectedLetters[startRow][c] = true;
//             }
//         } else if (startCol === endCol) {
//             const minRow = Math.min(startRow, endRow);
//             const maxRow = Math.max(startRow, endRow);

//             for (let r = minRow; r <= maxRow; r++) {
//                 newSelectedLetters[r][startCol] = true;
//             }
//         } else if (
//             Math.abs(startRow - endRow) === Math.abs(startCol - endCol)
//         ) {
//             const rowStep = startRow < endRow ? 1 : -1;
//             const colStep = startCol < endCol ? 1 : -1;
//             const steps = Math.abs(startRow - endRow);

//             for (let i = 0; i <= steps; i++) {
//                 newSelectedLetters[startRow + i * rowStep][
//                     startCol + i * colStep
//                 ] = true;
//             }
//         } else if (startRow - endRow === endCol - startCol) {
//             const rowStep = startRow < endRow ? 1 : -1;
//             const colStep = startCol > endCol ? -1 : 1;
//             const steps = Math.abs(startRow - endRow);

//             for (let i = 0; i <= steps; i++) {
//                 newSelectedLetters[startRow + i * rowStep][
//                     startCol + i * colStep
//                 ] = true;
//             }
//         }

//         setSelectedLetters(newSelectedLetters);
//         const selectedWord = extractWord(start, end);

//         if (selectedWord) {
//             // Alert.alert('Selected Word', selectedWord);
//             console.log('selectedWord:', selectedWord);
//         }
//         if (notFoundWords.includes(selectedWord)) {
//             Alert.alert('Selected Word', selectedWord);
//             // foundWords.push(selectedWord);
//             setFoundWords([...foundWords, selectedWord]);
//             setNotFoundWords(
//                 notFoundWords.filter((word) => word !== selectedWord)
//             );
//         }
//         resetSelection();
//     };

//     const extractWord = (
//         start: { row: number; col: number },
//         end: { row: number; col: number }
//     ) => {
//         const selectedWord = [];

//         if (start.row === end.row) {
//             const minCol = Math.min(start.col, end.col);
//             const maxCol = Math.max(start.col, end.col);

//             for (let c = minCol; c <= maxCol; c++) {
//                 selectedWord.push(letters[start.row][c]);
//             }
//             if (end.col < start.col) {
//                 return selectedWord.reverse().join('');
//             }
//         } else if (start.col === end.col) {
//             const minRow = Math.min(start.row, end.row);
//             const maxRow = Math.max(start.row, end.row);

//             for (let r = minRow; r <= maxRow; r++) {
//                 selectedWord.push(letters[r][start.col]);
//             }

//             if (end.row < start.row) {
//                 return selectedWord.reverse().join('');
//             }
//         } else if (
//             Math.abs(start.row - end.row) === Math.abs(start.col - end.col)
//         ) {
//             const steps = Math.abs(start.row - end.row);
//             const rowStep = start.row < end.row ? 1 : -1;
//             const colStep = start.col < end.col ? 1 : -1;

//             for (let i = 0; i <= steps; i++) {
//                 selectedWord.push(
//                     letters[start.row + i * rowStep][start.col + i * colStep]
//                 );
//             }
//             if (end.row < start.row && end.col > start.col) {
//                 return selectedWord.reverse().join('');
//             }
//         } else if (start.row - end.row === end.col - start.col) {
//             const steps = Math.abs(start.row - end.row);
//             const rowStep = start.row < end.row ? 1 : -1;
//             const colStep = start.col > end.col ? -1 : 1;

//             for (let i = 0; i <= steps; i++) {
//                 selectedWord.push(
//                     letters[start.row + i * rowStep][start.col + i * colStep]
//                 );
//             }
//             if (end.row < start.row && end.col > start.col) {
//                 return selectedWord.reverse().join('');
//             }
//         }

//         return selectedWord.join('');
//     };

//     const resetSelection = () => {
//         setSelectedLetters(
//             Array.from({ length: gridSize }, () => Array(gridSize).fill(false))
//         );
//         setStartPosition(null);
//         setEndPosition(null);
//     };

//     return (
//         <GestureHandlerRootView style={styles.container}>
//             <View style={styles.grid}>
//                 {letters.map((row, rowIndex) => (
//                     <View key={rowIndex} style={styles.row}>
//                         {row.map((letter, colIndex) => (
//                             <TapGestureHandler
//                                 key={colIndex}
//                                 onActivated={() =>
//                                     handleLetterPress(rowIndex, colIndex)
//                                 }
//                             >
//                                 <View
//                                     style={[
//                                         styles.cell,
//                                         selectedLetters[rowIndex][colIndex] &&
//                                             styles.selected,
//                                     ]}
//                                 >
//                                     <Text style={styles.letter}>{letter}</Text>
//                                 </View>
//                             </TapGestureHandler>
//                         ))}
//                     </View>
//                 ))}
//             </View>
//         </GestureHandlerRootView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     grid: {
//         width: 300,
//         height: 300,
//         borderWidth: 1,
//         borderColor: '#000',
//         borderRadius: 8,
//     },
//     row: {
//         flexDirection: 'row',
//     },
//     cell: {
//         width: 30,
//         height: 30,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 8,
//         // borderWidth: 1,
//         // borderColor: '#000',
//     },
//     selected: {
//         backgroundColor: 'yellow',
//     },
//     letter: {
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default WordSearch;

// import { GameContext } from '@/context/GameProvider';
// import React, { useContext, useState } from 'react';
// import { Alert, StyleSheet, Text, View } from 'react-native';
// import {
//     GestureHandlerRootView,
//     PanGestureHandler,
//     State,
// } from 'react-native-gesture-handler';
// import { wordSearchGame } from './wordSearchData';

// const gridSize = 10;
// const letters = wordSearchGame.matrix;
// const words = wordSearchGame.words;

// const WordSearch: React.FC = () => {
//     const [selectedLetters, setSelectedLetters] = useState<boolean[][]>(
//         Array.from({ length: gridSize }, () => Array(gridSize).fill(false))
//     );

//     const {
//         wordBank,
//         setWordBank,
//         foundWords,
//         setFoundWords,
//         notFoundWords,
//         setNotFoundWords,
//     } = useContext(GameContext);

//     const [startPosition, setStartPosition] = useState<{
//         row: number;
//         col: number;
//     } | null>(null);

//     const handlePanGestureEvent = (event) => {
//         const { translationX, translationY } = event.nativeEvent;

//         if (startPosition) {
//             const targetRow = startPosition.row + Math.round(translationY / 30);
//             const targetCol = startPosition.col + Math.round(translationX / 30);

//             if (
//                 isStraightLine(startPosition, {
//                     row: targetRow,
//                     col: targetCol,
//                 })
//             ) {
//                 highlightLetters(startPosition, {
//                     row: targetRow,
//                     col: targetCol,
//                 });
//             }
//         }
//     };

//     const handlePanGestureStateChange = (event) => {
//         const { state, x, y } = event.nativeEvent;

//         if (state === State.BEGAN) {
//             // Calculate grid coordinates where the gesture started
//             const row = Math.floor(y / 30);
//             const col = Math.floor(x / 30);
//             setStartPosition({ row, col });
//             markLetter(row, col);
//         } else if (state === State.END && startPosition) {
//             // Finalize selection
//             const row = Math.floor(y / 30);
//             const col = Math.floor(x / 30);
//             checkSelectedWord(startPosition, { row, col });
//             resetSelection();
//         }
//     };

//     const isStraightLine = (start, end) => {
//         return (
//             start.row === end.row ||
//             start.col === end.col ||
//             Math.abs(start.row - end.row) === Math.abs(start.col - end.col)
//         );
//     };

//     const markLetter = (row, col) => {
//         const newSelectedLetters = [...selectedLetters];
//         newSelectedLetters[row][col] = true;
//         setSelectedLetters(newSelectedLetters);
//     };

//     const highlightLetters = (start, end) => {
//         const newSelectedLetters = [...selectedLetters];
//         if (start.row === end.row) {
//             const minCol = Math.min(start.col, end.col);
//             const maxCol = Math.max(start.col, end.col);
//             for (let c = minCol; c <= maxCol; c++) {
//                 newSelectedLetters[start.row][c] = true;
//             }
//         } else if (start.col === end.col) {
//             const minRow = Math.min(start.row, end.row);
//             const maxRow = Math.max(start.row, end.row);
//             for (let r = minRow; r <= maxRow; r++) {
//                 newSelectedLetters[r][start.col] = true;
//             }
//         } else {
//             const rowStep = start.row < end.row ? 1 : -1;
//             const colStep = start.col < end.col ? 1 : -1;
//             const steps = Math.abs(start.row - end.row);
//             for (let i = 0; i <= steps; i++) {
//                 newSelectedLetters[start.row + i * rowStep][
//                     start.col + i * colStep
//                 ] = true;
//             }
//         }
//         setSelectedLetters(newSelectedLetters);
//     };

//     const checkSelectedWord = (start, end) => {
//         const selectedWord = extractWord(start, end);
//         if (notFoundWords.includes(selectedWord)) {
//             Alert.alert('Selected Word', selectedWord);
//             setFoundWords([...foundWords, selectedWord]);
//             setNotFoundWords(
//                 notFoundWords.filter((word) => word !== selectedWord)
//             );
//         }
//     };

//     const extractWord = (start, end) => {
//         const selectedWord = [];
//         if (start.row === end.row) {
//             const minCol = Math.min(start.col, end.col);
//             const maxCol = Math.max(start.col, end.col);
//             for (let c = minCol; c <= maxCol; c++) {
//                 selectedWord.push(letters[start.row][c]);
//             }
//         } else if (start.col === end.col) {
//             const minRow = Math.min(start.row, end.row);
//             const maxRow = Math.max(start.row, end.row);
//             for (let r = minRow; r <= maxRow; r++) {
//                 selectedWord.push(letters[r][start.col]);
//             }
//         } else {
//             const rowStep = start.row < end.row ? 1 : -1;
//             const colStep = start.col < end.col ? 1 : -1;
//             const steps = Math.abs(start.row - end.row);
//             for (let i = 0; i <= steps; i++) {
//                 selectedWord.push(
//                     letters[start.row + i * rowStep][start.col + i * colStep]
//                 );
//             }
//         }
//         return selectedWord.join('');
//     };

//     const resetSelection = () => {
//         setSelectedLetters(
//             Array.from({ length: gridSize }, () => Array(gridSize).fill(false))
//         );
//         setStartPosition(null);
//     };

//     return (
//         <GestureHandlerRootView style={styles.container}>
//             <PanGestureHandler
//                 onGestureEvent={handlePanGestureEvent}
//                 onHandlerStateChange={handlePanGestureStateChange}
//             >
//                 <View style={styles.grid}>
//                     {letters.map((row, rowIndex) => (
//                         <View key={rowIndex} style={styles.row}>
//                             {row.map((letter, colIndex) => (
//                                 <View
//                                     key={colIndex}
//                                     style={[
//                                         styles.cell,
//                                         selectedLetters[rowIndex][colIndex] &&
//                                             styles.selected,
//                                     ]}
//                                 >
//                                     <Text style={styles.letter}>{letter}</Text>
//                                 </View>
//                             ))}
//                         </View>
//                     ))}
//                 </View>
//             </PanGestureHandler>
//         </GestureHandlerRootView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     grid: {
//         width: 300,
//         height: 300,
//         borderWidth: 1,
//         borderColor: '#000',
//         borderRadius: 8,
//     },
//     row: {
//         flexDirection: 'row',
//     },
//     cell: {
//         width: 30,
//         height: 30,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 8,
//     },
//     selected: {
//         backgroundColor: 'yellow',
//     },
//     letter: {
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default WordSearch;

import { GameContext } from '@/context/GameProvider';
import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import {
    GestureHandlerRootView,
    PanGestureHandler,
    State,
} from 'react-native-gesture-handler';
import { wordSearchGame } from './wordSearchData';

const gridSize = 10;
const letters = wordSearchGame.matrix;
const words = wordSearchGame.words;

const WordSearch: React.FC = () => {
    const [selectedLetters, setSelectedLetters] = useState<boolean[][]>(
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

    const handlePanGestureEvent = (event) => {
        if (!startPosition) return;

        const { translationX, translationY } = event.nativeEvent;
        const targetRow = startPosition.row + Math.round(translationY / 30);
        const targetCol = startPosition.col + Math.round(translationX / 30);

        // Ensure we're within grid bounds and in a straight line from the start position
        if (
            isWithinBounds(targetRow, targetCol) &&
            isStraightLine(startPosition, { row: targetRow, col: targetCol })
        ) {
            highlightLetters(startPosition, { row: targetRow, col: targetCol });
        }
    };

    const handlePanGestureStateChange = (event) => {
        const { state, x, y } = event.nativeEvent;

        if (state === State.BEGAN) {
            // Calculate grid coordinates where the gesture started
            const row = Math.floor(y / 30);
            const col = Math.floor(x / 30);
            if (isWithinBounds(row, col)) {
                setStartPosition({ row, col });
                markLetter(row, col);
            }
        } else if (state === State.END && startPosition) {
            // Calculate final coordinates within bounds
            const row = Math.floor(y / 30);
            const col = Math.floor(x / 30);
            if (isWithinBounds(row, col)) {
                checkSelectedWord(startPosition, { row, col });
            }
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
            // Horizontal
            const minCol = Math.min(start.col, end.col);
            const maxCol = Math.max(start.col, end.col);
            for (let c = minCol; c <= maxCol; c++) {
                newSelectedLetters[start.row][c] = true;
            }
        } else if (start.col === end.col) {
            // Vertical
            const minRow = Math.min(start.row, end.row);
            const maxRow = Math.max(start.row, end.row);
            for (let r = minRow; r <= maxRow; r++) {
                newSelectedLetters[r][start.col] = true;
            }
        } else {
            // Diagonal
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

    const checkSelectedWord = (start, end) => {
        const selectedWord = extractWord(start, end);
        console.log(selcted);
        if (notFoundWords.includes(selectedWord)) {
            Alert.alert('Selected Word', selectedWord);
            setFoundWords([...foundWords, selectedWord]);
            setNotFoundWords(
                notFoundWords.filter((word) => word !== selectedWord)
            );
        }
    };

    const extractWord = (start, end) => {
        const selectedWord = [];
        if (start.row === end.row) {
            // Horizontal
            const minCol = Math.min(start.col, end.col);
            const maxCol = Math.max(start.col, end.col);
            for (let c = minCol; c <= maxCol; c++) {
                selectedWord.push(letters[start.row][c]);
            }
        } else if (start.col === end.col) {
            // Vertical
            const minRow = Math.min(start.row, end.row);
            const maxRow = Math.max(start.row, end.row);
            for (let r = minRow; r <= maxRow; r++) {
                selectedWord.push(letters[r][start.col]);
            }
        } else {
            // Diagonal
            const rowStep = start.row < end.row ? 1 : -1;
            const colStep = start.col < end.col ? 1 : -1;
            const steps = Math.abs(start.row - end.row);
            for (let i = 0; i <= steps; i++) {
                selectedWord.push(
                    letters[start.row + i * rowStep][start.col + i * colStep]
                );
            }
        }
        return selectedWord.join('');
    };

    const resetSelection = () => {
        setSelectedLetters(
            Array.from({ length: gridSize }, () => Array(gridSize).fill(false))
        );
        setStartPosition(null);
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
                                        selectedLetters[rowIndex][colIndex] &&
                                            styles.selected,
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
    },
    grid: {
        width: 300,
        height: 300,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 8,
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
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
