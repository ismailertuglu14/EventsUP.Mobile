import React from "react";
import { Image, Text, View } from "react-native";
import styled from "styled-components/native";
import { StoryModel, mockStories } from "../models/story_model";
import { CurrentUser } from "../../../../features/models/current_user";


interface StoryProps {
    user: CurrentUser;
    isUserStoryAvailable: boolean;
}
const AddStory: React.FC<StoryProps> = ({ user, isUserStoryAvailable }) => {
    return (
        <OutlinedCircle onPress={() => console.log("asdsad")}>
            <InnerImage source={{ uri: user.profileImage ?? 'https://www.freeiconspng.com/thumbs/person-icon/clipart--person-icon--cliparts-15.png' }} />
            {
                !isUserStoryAvailable && (
                    <AddButton><Text style={{ color: 'white' }}>+</Text></AddButton>
                )
            }

        </OutlinedCircle >
    )
}


const OutlinedCircle = styled.TouchableOpacity`
    width: 60px;
    height: 60px;
    border-radius: 30px;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    position: relative;
`;

const AddButton = styled.View`
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: black;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    right: 0;
`;

const InnerImage = styled.Image`
    width: 56px;
    height: 56px;
    border-radius: 28px;
    align-items: center;
    justify-content: center;
`;
export default AddStory;
