import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

const renderScene = SceneMap({
    login: LoginScreen,
    register: RegisterScreen,
});

export default function AuthTabs() {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'login', title: 'Sign In' },
        { key: 'register', title: 'Register' },
    ]);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={props =>
                <TabBar
                    {...props}
                    style={{ backgroundColor: 'white' }}
                    indicatorStyle={{ backgroundColor: '#28a745' }}
                    labelStyle={{ color: 'black' }}
                />
            }
        />
    );
}
