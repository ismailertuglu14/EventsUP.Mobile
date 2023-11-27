/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';

import SplashScreen from './src/presentation/authentication/splash/Splash';
import NavigationPath from './src/core/navigation/navigation_paths';
import Home from './src/presentation/home/Home';
import { Signin } from './src/presentation/authentication/signin/Signin';
import { Provider } from 'react-redux';
import { store } from './src/features/redux/store';
import Settings from './src/presentation/home/Settings/Settings';
import CommentsScreen from './src/presentation/home/PostComments/Comments';
import ProfileScreen from './src/presentation/home/Profile/Profile';
import DirectMessages from './src/presentation/home/DirectMessages/DirectMessages';
import UpcomingEvents from './src/presentation/home/UpcomingEvents/UpcomingEvents';
import PopularCommunities from './src/presentation/home/PopularCommunities/PopularCommunities';
import EventDetail from './src/presentation/home/Event/EventDetail';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  useEffect(() => {
    console.log("çalıştı")
  }, [])
  return (

    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name={NavigationPath.SIGNIN} component={Signin} options={{ headerShown: false }} />
          <Stack.Screen name={NavigationPath.HOME} component={Home} options={{ headerShown: false }} />
          <Stack.Screen name={NavigationPath.SETTINGS} component={Settings} options={{ headerShown: false }} />
          <Stack.Screen name={NavigationPath.COMMENTS} component={CommentsScreen} options={{ headerShown: false }} />
          <Stack.Screen name={NavigationPath.PROFILE} component={ProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name={NavigationPath.DIRECT_MESSAGES} component={DirectMessages} options={{ headerShown: false }} />

          <Stack.Screen name={NavigationPath.UPCOMING_EVENTS} component={UpcomingEvents} options={{ headerShown: false }} />
          <Stack.Screen name={NavigationPath.EVENT_DETAIL} component={EventDetail} options={{ headerShown: false }} />
          <Stack.Screen name={NavigationPath.POPULAR_COMMUNITIES} component={PopularCommunities} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>

    </Provider>
  );
}

export default App;
