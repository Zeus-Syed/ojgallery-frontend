import React from 'react';
import { NavigationContainer, Pressable } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton, HeaderTitle } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

import login from '../screens/login';
import starter from '../screens/starter';
import register from '../screens/register';
import home from '../screens/home';
import settings from '../screens/settings';
import upload from '../screens/upload';
import tagged from '../screens/tagged';

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNav = () => {
    return (
        <Tab.Navigator initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home-sharp'
                            : 'home-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings-sharp' : 'settings-outline';
                    } else if (route.name === 'Tagged') {
                        iconName = focused ? 'grid-sharp' : 'grid-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={20} color={color} />;
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: '#003f5c',
                    height: 60
                },
                headerShown: false,
                tabBarLabelStyle: { bottom: 10 }
            })}
        >
            <Tab.Screen name="Home" component={home} />
            <Tab.Screen name="Tagged" component={tagged} />
            <Tab.Screen name="Settings" component={settings} />
        </Tab.Navigator>
    );
}

const AppNavigator = () => {
    const { authToken } = useSelector(state => state.authenticationReducer)
    const isSignedIn = authToken != "" ? true : false;
    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName={isSignedIn ? "App" : "Starter"} >
                {isSignedIn ?
                    (
                        <>
                            <RootStack.Screen name="App" component={AppNav}
                                options={{ headerShown: false }} />
                            <RootStack.Screen name="Upload" component={upload} />

                        </>
                    )
                    :
                    (
                        <>
                            <RootStack.Screen name="Starter" component={starter}
                                options={{ headerShown: false }} />
                            <RootStack.Screen name="Signin" component={login}
                                options={{ headerShown: false }} />
                            <RootStack.Screen name="Register" component={register}
                            />
                        </>
                    )
                }
            </RootStack.Navigator>
        </NavigationContainer>
    )

}

export default AppNavigator;