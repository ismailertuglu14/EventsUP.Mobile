import React from 'react'
import { Dimensions, FlatList, Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'

import styled from 'styled-components/native'
import { EXPLORE_ICON } from '../../../../features/constants/image_constants'
import { HorizontalDivider } from '../../../../features/shared/components/Divider'
import { responsive } from '../../../../features/helpers/screen_helpers'
import NavigationPath from '../../../../core/navigation/navigation_paths'
import { useNavigation } from '@react-navigation/native'

type SearchLandingProps = {
    lastSearches: string[],
    popularEvents: { id: string, startDate: string, name: string, place: string }[],
    popularCommunities: { id: string, name: string, imageUrl: string }[],
}
const SearchLanding = ({ lastSearches, popularEvents, popularCommunities }: SearchLandingProps) => {
    const navigation = useNavigation();
    const width = Dimensions.get('screen').width;
    const COMMUNITY_IMAGE_SIZE = responsive({ mobile: 30, tablet: 50 });

    return (
        <View>
            <LastSearchesContainer>
                <Text style={{ fontSize: 14, fontWeight: '500', color: 'black' }}>
                    <Image source={EXPLORE_ICON} style={{ width: 16, height: 16 }} />
                    {' '}Recent Searches
                </Text>
                <FlatList
                    data={lastSearches}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity key={index}>
                            <Text style={{ marginTop: 4, marginLeft: 4 }}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />

            </LastSearchesContainer>
            <HorizontalDivider color='gray' width={width * 0.9} style={{ marginVertical: 12, alignSelf: 'flex-start' }} />
            <UpcomingEventsArea>
                <UpcomingEventsHeader>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: 'black' }}>
                        Upcoming Events
                    </Text>
                    <SeeAllButton path={NavigationPath.UPCOMING_EVENTS} navigation={navigation} />
                </UpcomingEventsHeader>
                <FlatList
                    style={{ marginTop: 12 }}
                    data={popularEvents}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity key={index} style={{ flexDirection: 'column', }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginTop: 4, fontWeight: 'bold', color: 'black', marginLeft: 4, minWidth: 80 }}>{item.startDate}</Text>
                                <Text style={{ marginTop: 4, fontWeight: 'bold', color: 'black', marginLeft: 4 }}>{item.name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginTop: 4, fontWeight: 'bold', color: 'black', marginLeft: 4, minWidth: 80 }}></Text>
                                <Text style={{ fontSize: 12, fontWeight: '300', color: 'gray', marginLeft: 4 }}>{item.place}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </UpcomingEventsArea>
            <HorizontalDivider color='gray' width={width * 0.9} style={{ marginVertical: 12, alignSelf: 'flex-start' }} />

            <PopularCommunitiesArea >

                <PopularCommunitiesHeader style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: 'black' }}>
                        Popular Communities
                    </Text>
                    <SeeAllButton path={NavigationPath.POPULAR_COMMUNITIES} navigation={navigation} />
                </PopularCommunitiesHeader>

                <FlatList
                    style={{ marginTop: 12 }}
                    data={popularCommunities}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity key={index} style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row', marginVertical: 8, alignItems: 'flex-start' }}>
                                <Image source={{ uri: item.imageUrl }} style={{ width: COMMUNITY_IMAGE_SIZE, height: COMMUNITY_IMAGE_SIZE }} />
                                <Text style={{ fontWeight: 'bold', color: 'black', marginLeft: 12 }}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </PopularCommunitiesArea>
        </View>
    );
}


const SeeAllButton = ({ path, navigation }: { path: NavigationPath, navigation: any }) => {
    const width = Dimensions.get('screen').width;

    return (
        <TouchableOpacity onPress={() => navigation.navigate(path)}>
            <Text style={{ fontSize: 12, color: 'blue', marginRight: width * 0.09 }}>See all</Text>
        </TouchableOpacity>
    )
}


const LastSearchesContainer = styled.View`
    width: 100%;
    flex-direction: column;
    margin-top: 16px;    
    align-items: flex-start;
    justify-content: flex-start;
`;
const UpcomingEventsArea = styled.View`
    width: 100%;
    flex-direction: column;
    margin-top: 16px;    
    align-items: flex-start;
    justify-content: flex-start;
`;
const UpcomingEventsHeader = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
const PopularCommunitiesArea = styled.View`
    width: 100%;
    flex-direction: column;
    margin-top: 16px;    
    align-items: flex-start;
    justify-content: flex-start;
`;
const PopularCommunitiesHeader = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
export default SearchLanding