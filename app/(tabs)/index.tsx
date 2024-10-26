import WordSearchScreen from '@/components/play/WordSearchScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const Index: React.FC = () => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <WordSearchScreen />
        </SafeAreaView>
    );
};

export default Index;
