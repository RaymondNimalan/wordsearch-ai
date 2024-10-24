import WordSearchScreen from '@/components/play/WordSearchScreen';
import { Text, View } from 'react-native';

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text
                style={{
                    color: 'blue',
                }}
            >
                Edit app/index.tsx to edit this screen.
            </Text>
            <WordSearchScreen />
        </View>
    );
}
