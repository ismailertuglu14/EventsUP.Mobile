import React from "react";
import styled from "styled-components/native";
import { SCREEN_WIDTH, responsive } from "../../../../features/helpers/screen_helpers";
import { stringShortener } from "../../../../features/helpers/string_helpers";
import { HorizontalDivider } from "../../../../features/shared/components/Divider";

const DirectMessagesBox = () => {
    const LOREM_40 = " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic ratione molestias delectus sapiente consequatur dolores asperiores minus facilis tempore harum fuga, consequuntur voluptatem repellendus, aperiam magnam architecto commodi assumenda quod non ab aspernatur molestiae amet similique. Architecto quis aspernatur minima!";
    const MESSAGE_MAX_LENGTH = responsive({ mobile: 44, tablet: 68 })
    return (
        <MessageContainer activeOpacity={0.6}>
            <MessageSourceImage source={{ uri: 'https://i.pinimg.com/1200x/43/71/ac/4371acaa2ddb2b344912bec009774456.jpg' }} />
            <MiddleContainer>
                <MessageSourceName>Esdeath</MessageSourceName>
                <Message>{LOREM_40}</Message>
                <HorizontalDivider />
            </MiddleContainer>
            <UnreadMessageCount>5</UnreadMessageCount>
        </MessageContainer>
    )
}

const MessageContainer = styled.TouchableOpacity`
    flex-direction: row;
    width: 100%;
    min-height: ${responsive({ mobile: 50, tablet: 60 })}px;
    align-items: flex-start;
    justify-content: space-between;
    padding-left: 24px;
    padding-right: 24px;
    margin-top: 12px;
    margin-bottom: 12px;
`;

const MessageSourceImage = styled.Image`
    width: ${responsive({ mobile: 50, tablet: 60 })}px;
    height: ${responsive({ mobile: 50, tablet: 60 })}px;
    border-radius: 50px;
`;

const MiddleContainer = styled.View`
    flex:1;
    flex-direction: column;
    justify-content: space-between;
    margin-left: ${SCREEN_WIDTH * 0.04}px;
    max-height: 30px;
`;

const MessageSourceName = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: #000;
`;
const Message = styled.Text`
    font-size: 14px;
    font-weight: 400;
    margin-top: 8px;
    color: #000;
    overflow: hidden;
`;

const UnreadMessageCount = styled.Text`
    font-size: 14px;
    font-weight: 400;
    color: white;
    align-self: center;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 14px;
    padding-right: 14px;
    background-color: green;
    border-radius: 50px;

`;
export default DirectMessagesBox;