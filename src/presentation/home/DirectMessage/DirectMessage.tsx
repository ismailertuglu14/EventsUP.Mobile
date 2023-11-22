import React from "react";
import styled from "styled-components/native";
import DirectMessagesBox from "../DirectMessages/components/DirectMessagesBox";


const DirectMessage = () => {
    // generate 40 item int array

    const arr = [...Array(40).keys()];
    return (
        <Screen>
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
    background-color: #fff;
    `;

export default DirectMessage;