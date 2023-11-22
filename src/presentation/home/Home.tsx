import styled from "styled-components/native"
import { Image, Text, View } from "react-native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EXPLORE_ICON, FEED_ICON, PROFILE_ICON } from "../../features/constants/image_constants";
import ProfileScreen from "./Profile/Profile";
import { useAppSelector } from "../../features/redux/store";
import SearchScreen from "./Search/Search";
import Feed from "./Feed/Feed";
import CommentsScreen from "./PostComments/Comments";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Home = () => {
    const { id } = useAppSelector(state => state.currentUser.user!)
    return (
        <Tab.Navigator>
            <Tab.Screen name="Feed" component={Feed} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Image
                        source={FEED_ICON}
                        style={{ width: 18, height: 14, tintColor: color, resizeMode: 'contain' }}
                    />
                ),
            }} />
            <Tab.Screen name="Explore" component={SearchScreen} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Image
                        source={EXPLORE_ICON}
                        style={{ width: 18, height: 14, tintColor: color, resizeMode: 'contain' }}
                    />
                ),
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} initialParams={{
                id: id
            }} options={{
                headerShown: false,
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => (
                    <Image
                        source={PROFILE_ICON}
                        style={{ width: 12, height: 12, tintColor: color, resizeMode: 'contain' }}
                    />
                ),
            }} />

            {/* Diğer tab ekranları buraya ekleyin */}
        </Tab.Navigator>
    )
}

export default Home;