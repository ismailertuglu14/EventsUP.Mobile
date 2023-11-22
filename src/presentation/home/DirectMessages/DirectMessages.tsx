import React from "react";
import styled from "styled-components/native";
import { SCREEN_WIDTH, responsive } from "../../../features/helpers/screen_helpers";
import { stringShortener } from "../../../features/helpers/string_helpers";
import DirectMessagesBox from "./components/DirectMessagesBox";
import { Swipeable } from "react-native-gesture-handler";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text } from "react-native";

const Tab = createMaterialTopTabNavigator();

const DirectMessages = () => {
    // generate 40 item int array
    // generate 40 item int array

    const arr = [...Array(40).keys()];
    return (
        <Screen style={{}}>
            {
                arr.map((item, index) => (
                    <DirectMessagesBox key={index} />
                ))
            }
        </Screen>
    )
}

const Screen = styled.ScrollView`
    flex: 1;
    `;

export default DirectMessages;