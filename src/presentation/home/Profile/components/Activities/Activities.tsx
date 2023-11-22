import React from "react";
import styled from "styled-components/native";
import EventIcon from "../../../../../features/shared/icons/EventIcon";
import { User } from "../../models/User";
import { ActivityType } from "./model/activity_type";
import { ActivityModel, mockActivities } from "./model/activity_model";
import PersonIcon from "../../../../../features/shared/icons/PersonIcon";
import { stringShortener } from "../../../../../features/helpers/string_helpers";

const Activities = ({ user, activities, setActivities }: { user: User, activities: ActivityModel[], setActivities: React.Dispatch<React.SetStateAction<ActivityModel[]>> }) => {

    const ActivityIcon = (type: ActivityType) => {
        switch (type) {
            case ActivityType.EVENTS:
                return <EventIcon />;
            case ActivityType.COMMUNITY:
                return <PersonIcon />;
            case ActivityType.POST:
                return <EventIcon />;
            default:
                return <EventIcon />;
        }
    }

    return (
        <Screen>
            <ActivitiesList
                data={activities}
                renderItem={({ item }) => (
                    <ActivityCard key={item.id}>
                        {ActivityIcon(item.type)}
                        <DetailsColumn>
                            <InformationRow>
                                <FullName>{stringShortener(item.user.fullName, 32)}{' '}</FullName>
                                <InformationText>{item.title}</InformationText>
                            </InformationRow>
                            <ActivityName>{stringShortener(item.description, 64)}</ActivityName>
                        </DetailsColumn>
                    </ActivityCard>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </Screen>
    )
}

const Screen = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;
const ActivitiesList = styled.FlatList`
    width: 80%;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 20px;
`;
const ActivityCard = styled.TouchableOpacity`
    height: 80px;
    flex-direction: row;
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
    margin-top: 10px;
    border-width: 0.6px;
    border-color: #bfbcbc;
    
`;
const DetailsColumn = styled.View`
    flex-direction: column;
    margin-left: 20px;
`;
const InformationRow = styled.View`
    flex-direction: row;
    margin-bottom: 10px;
    align-items: center;
`;
const FullName = styled.Text`
    font-size: 16px;
    font-weight: 500;
    color: #000;
`;
const InformationText = styled.Text`
    font-size: 12px;
    color: gray;
`;
const ActivityName = styled.Text`
    font-size: 14px;
    color: black;
    font-weight: bold;
`;
export default Activities;