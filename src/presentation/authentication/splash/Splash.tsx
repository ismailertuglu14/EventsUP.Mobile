import { useEffect } from "react";
import styled from "styled-components/native"
import NavigationPath from "../../../core/navigation/navigation_paths";
import { ImageBackground } from "react-native";
import CacheManager from "../../../core/cache/cache_manager";
import CacheEnum from "../../../core/cache/cache_enums";
import { useDispatch } from "react-redux";
import NetworkManager from "../../../core/network/network_manager";
import BaseResponse from "../../../core/network/base_response";
import { CurrentUser } from "../../../features/models/current_user";
import { setCurrentUser } from "../../../features/redux/user_slice";
import axiosInstance from "../../../core/network/network_manager";
import { changeTheme } from "../../../features/redux/theme_slice";


const SplashScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();

    const cache = CacheManager.getInstance();

    useEffect(() => {
        const initializeCache = async () => {
            await cache.load();
        }

        const getTheme = () => {
            cache.get(CacheEnum.THEME).then((theme) => {
                dispatch(changeTheme(theme || "light"));
            });
        }

        const checkIsSignedIn = async () => {
            await CacheManager.getInstance().load();
            const token = await CacheManager.getInstance().get(CacheEnum.TOKEN);

            if (token) {
                await getUserAfterLogin();
            } else {
                navigation.replace(NavigationPath.SIGNIN);
            }
        }

        const fetchData = async () => {
            await initializeCache();
            getTheme();
            await checkIsSignedIn();
        }

        fetchData();
    }, []);

    const getUserAfterLogin = async () => {
        try {
            var response = await axiosInstance.get("/user/getuserafterlogin");
            if (response.status === 200) {
                var currentUser: BaseResponse<CurrentUser> = response.data;
                dispatch(setCurrentUser(currentUser.data))
                navigation.replace(NavigationPath.HOME);
            } else {
                navigation.replace(NavigationPath.SIGNIN);
            }
        } catch (error) {
            console.log("error", JSON.stringify(error, null, 2))
            navigation.replace(NavigationPath.SIGNIN);
        }
    }

    return (
        <ImageBackground
            source={require('../../../../assets/splash.jpg')}
            style={{ flex: 1, justifyContent: 'center' }}
        >
            <Screen>
                <Title>EVENTSUP</Title>
            </Screen>
        </ImageBackground>
    );
};

const Screen = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
  `;

const Title = styled.Text`
    color: gray;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 100%;
  `;

export default SplashScreen;
