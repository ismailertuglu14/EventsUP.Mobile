import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import { StoryModel, mockStories } from "../models/story_model";


interface StoryProps {
    story: StoryModel;
}
const Story: React.FC<StoryProps> = ({ story }) => {
    return (
        <OutlinedCircle isOpened={story.isOpened} >
            <InnerImage source={{ uri: story.profileImage }} />
        </OutlinedCircle>
    )
}


const OutlinedCircle = styled.TouchableOpacity<{ isOpened: boolean }>`
    width: 60px;
    height: 60px;
    border-radius: 30px;
    border-width: 2px;
    border-color: ${(props) => props.isOpened ? 'gray' : 'green'};
    align-items: center;
    justify-content: center;
    margin-right: 10px;
`;

const InnerImage = styled.Image`
    width: 56px;
    height: 56px;
    border-radius: 28px;
    align-items: center;
    justify-content: center;
`;
export default Story;
