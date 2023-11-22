
import React from 'react'
import styled from 'styled-components/native'
import { User } from '../../../../features/models/user';
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { responsive } from '../../../../features/helpers/screen_helpers';
import EmptyImagePlaceHolder from '../../../../features/shared/components/EmptyImagePlaceHolder';
import NavigationPath from '../../../../core/navigation/navigation_paths';
const SearchResult = ({ response, navigation }: { response: User[], navigation: any }) => {
    const width = Dimensions.get('screen').width;
    const USER_PROFILE_IMAGE_SIZE = responsive({ mobile: 30, tablet: 50 });

    const navigateToUserProfile = (userId: string) => {
        navigation.navigate(NavigationPath.PROFILE, {
            id: userId
        })
    }

    return (
        <Screen>
            <UsersArea>
                <UsersHeader>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: 'black' }}>
                        Users
                    </Text>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 12, color: 'blue', marginRight: width * 0.09 }}>See all</Text>
                    </TouchableOpacity>
                </UsersHeader>
                <FlatList
                    data={response}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity key={index} style={{ flexDirection: 'column' }} onPress={() => navigateToUserProfile(item.id)}>
                            <View style={{ flexDirection: 'row', marginVertical: 8, alignItems: 'flex-start' }}>
                                {
                                    item.profileImage ?
                                        <Image source={{ uri: item.profileImage }} style={{ width: USER_PROFILE_IMAGE_SIZE, height: USER_PROFILE_IMAGE_SIZE }} />
                                        : <EmptyImagePlaceHolder gender={item.gender} style={{
                                            width: responsive({ mobile: 30, tablet: 50 }),
                                            height: responsive({ mobile: 30, tablet: 50 }),
                                        }} />
                                }
                                <Text style={{ fontWeight: 'bold', color: 'black', marginLeft: 12 }}>{item.fullName}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </UsersArea>
        </Screen>
    )
}
const Screen = styled.View`
    flex: 1;
    align-items: center;
    justify-content: flex-start;
`;
const ScrollScreen = styled.ScrollView`

`;
const UsersArea = styled.View`
    width: 100%;
    flex-direction: column;
    margin-top: 16px;    
    align-items: flex-start;
    justify-content: flex-start;
`;
const UsersHeader = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export default SearchResult