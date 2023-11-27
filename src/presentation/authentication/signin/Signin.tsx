import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import NavigationPath from "../../../core/navigation/navigation_paths";
import { CloseKeyboard } from "../../../features/shared/keyboard/close_keyboard";
import React from "react";
import { login } from "./service/signin_service";
import BaseResponse from "../../../core/network/base_response";
import SigninResponseModel from "./models/signin_response";
import CacheManager from "../../../core/cache/cache_manager";
import CacheEnum from "../../../core/cache/cache_enums";
import styled from "styled-components/native";
import NetworkManager from "../../../core/network/network_manager";
import { CurrentUser } from "../../../features/models/current_user";
import { setCurrentUser } from "../../../features/redux/user_slice";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../core/network/network_manager";
export const Signin = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const [isRememberMe, setIsRememberMe] = React.useState(true);
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [isUserNameValid, setIsEmailValid] = React.useState(false);
    const [isPasswordValid, setIsPasswordValid] = React.useState(false);
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    
    const handleLogin = async () => {
        try {
            setIsLoading(true);
            setIsError(false);
            const response: BaseResponse<SigninResponseModel> = await login(userName, password);
            if (response.statusCode === 200) {
                CacheManager.getInstance().set(CacheEnum.TOKEN, response.data.accessToken);
                setIsError(false);
                var response2 = await axiosInstance.get("/user/getuserafterlogin");
                if (response2.status === 200) {
                    var currentUser: BaseResponse<CurrentUser> = response2.data;
                    dispatch(setCurrentUser(currentUser.data))
                    navigation.replace(NavigationPath.HOME)
                } else {
                    navigation.replace(NavigationPath.SIGNIN);
                }
            }
        } catch (error) {
            console.log("error:" + error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => CloseKeyboard()}>
            <Screen>
                <SigninText>Login to your Account</SigninText>
                <UserNameTextField value={userName} onChangeText={(text) => setUserName(text)} placeholder="User name" placeholderTextColor="#7a7a7a" />
                <UserNameTextField value={password} onChangeText={(text) => setPassword(text)} placeholder="Password" placeholderTextColor="#7a7a7a" />
                <SigninButton onPress={handleLogin}>
                    <SigninButtonText> Sign in </SigninButtonText>
                </SigninButton>
                <RememberMeArea>
                    <RememberMeButton onPress={() => setIsRememberMe(!isRememberMe)}>
                        <RememberMeButtonFill style={{
                            backgroundColor: isRememberMe ? 'blue' : 'white'
                        }} />
                    </RememberMeButton>
                    <Text style={{ color: '#5d5c5c' }}>Remember me</Text>
                    <View style={{ flex: 1 }} />
                    <Text style={{ color: '#5d5c5c' }}>Forgot password?</Text>
                </RememberMeArea>

                <DividerArea>
                    <Divider />
                    <Text style={{ color: '#5d5c5c' }}>Or continue with</Text>
                    <Divider />
                </DividerArea>

                <SocialButtonsArea>
                    <GoogleButton>
                        <Image source={require('../../../../assets/google_ic.png')} style={{
                            width: 20,
                            height: 20,
                        }} />
                    </GoogleButton>
                    <AppleButton>
                        <Image source={require('../../../../assets/apple_ic.png')} style={{
                            width: 20,
                            height: 20,
                        }} />
                    </AppleButton>
                </SocialButtonsArea>
                <DontHaveAccountArea>
                    <Text>Don't have an account?{' '}</Text>
                    <TouchableOpacity>
                        <Text style={{
                            color: 'blue'
                        }}>Sign up</Text>
                    </TouchableOpacity>
                </DontHaveAccountArea>

            </Screen>
        </TouchableWithoutFeedback>

    );
};

const Screen = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding-left:15%;
    padding-right:15%;
`;
const SigninText = styled.Text`
    color: #5f5d5d;
    font-size: 14px;
    font-weight: bold;
    align-self: flex-start;
    margin-bottom: 20px;
`;

const UserNameTextField = styled.TextInput`
    width: 100%;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #7a7a7a;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
    color: black;
    
`;

const SigninButton = styled.TouchableOpacity`
    width: 100%;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #7a7a7a;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
    background-color: blue;
    justify-content: center;
    align-items: center;
`;
const SigninButtonText = styled.Text`
    color: white;
    font-size: 14px;
    font-weight: 400;
`;
const RememberMeArea = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
    justify-content: flex-start;
`;
const RememberMeButton = styled.TouchableOpacity`
        border: 1px solid #7a7a7a;
        border-radius: 4px;
        margin-top: 10px;
        margin-bottom: 10px;
        margin-right: 10px;
        padding: 1.4px;
        justify-content: center;
        align-items: center;
        `;

const RememberMeButtonFill = styled.View`
        width: 20px;
        height: 20px;
        border-radius: 4px;
`
const DividerArea = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
    justify-content: center;
`;
const Divider = styled.View`
    width: 10%;
    height: 1px;
    margin-right: 10px;
    margin-left: 10px;
    background-color: #7a7a7a;
    margin-top: 10px;
    margin-bottom: 10px;
`;
const SocialButtonsArea = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
    justify-content: center;
`;
const GoogleButton = styled.TouchableOpacity`
    width: 20%;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #aaaaaa;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 10px;
    padding: 10px;
    background-color: white;
    justify-content: center;
    align-items: center;
`;
const AppleButton = styled.TouchableOpacity`
    width: 20%;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #aaaaaa;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 10px;
    padding: 10px;
    background-color: white;
    justify-content: center;
    align-items: center;
`;
const DontHaveAccountArea = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
    justify-content: center;
`;
const DontHaveAccountText = styled.Text`
    color: #5d5c5c;
    font-size: 14px;
    font-weight: 400;
`;
