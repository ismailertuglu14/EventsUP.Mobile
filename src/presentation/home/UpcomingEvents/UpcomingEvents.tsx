import React, { useState, useEffect, useMemo } from 'react'
import { Dimensions, FlatList, Image, SafeAreaView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'

import styled from 'styled-components/native'
import BaseResponse from '../../../core/network/base_response'
import { User } from '../../../features/models/user'
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native-virtualized-view'
import { EventCardModel, mockEventCardModel } from './models/event_model'
import MasonryList from '@react-native-seoul/masonry-list';
import { FilterModel } from './models/filter_model'
import EventCard from './components/EventCard'
import { EXPLORE_ICON } from '../../../features/constants/image_constants'
import axiosInstance from '../../../core/network/network_manager'
import { FilterRow } from './components/Filters'
import { toQUeryString } from '../../../features/helpers/network_helper'

const UpcomingEvents = () => {
    const route = useRoute();
    const { filter } = route.params as { filter: string };
    const [events, setEvents] = useState<EventCardModel[] | undefined>();
    const [filters, setFilters] = useState<FilterModel[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        fetchFilters();
    }, [])

    useEffect(() => {
        fetchEvents();
    }, [filters])

    const fetchFilters = () => {
        // api call
        const mockFilters: FilterModel[] = [
            { id: '1', displayName: "All", name: 'all', isActive: false },
            { id: '2', displayName: "Upcoming", name: 'upcoming', isActive: false },
            { id: '3', displayName: "Latest", name: 'latest', isActive: false },
        ]
        mockFilters.forEach(f => {
            if (f.name === filter) {
                f.isActive = true;
            }
        })
        setFilters(mockFilters);
    }

    const fetchEvents = async () => {
        console.log("eventler fetch edildi.")
        setIsLoading(true);
        setEvents(mockEventCardModel)
        // const response = await axiosInstance.get(`/event/suggestions?${toQUeryString({ filter })}`)
        // if (response.status === 200) {
        //     const events = response.data as BaseResponse<EventCardModel[]>;
        //     setEvents(events.data);
        // }
        setIsLoading(false);
    }

    return (
        <SafeAreaView style={{ flex: 1, minHeight: '100%', }}>
            <ScrollArea style={{ flex: 1, paddingHorizontal: 24, paddingTop: 24 }} scrollToOverflowEnabled={false} nestedScrollEnabled={true} >
                <Text style={{ fontSize: 36, color: 'black', fontWeight: '700', marginLeft: 10 }}>Events</Text>
                <SearchBar />
                <FilterRow filters={filters} setFilters={setFilters} />
                {isLoading ? <Text>Loading...</Text> /** TODO: Skeleton Loading implementation */ : <EventsList events={events} />}
            </ScrollArea>
        </SafeAreaView>
    );
};

const ScrollArea = styled.ScrollView`
    flex: 1;
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 24px;
`;

const EventsList = ({ events }: { events: EventCardModel[] | undefined }) => {
    const navigation = useNavigation();

    return events && <FlatList
        style={{

        }}
        data={events}
        numColumns={2}
        keyExtractor={(item, index): string => index.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View />}

        contentContainerStyle={{
            alignSelf: 'stretch',
        }}
        renderItem={({ item }) => <EventCard event={item} navigation={navigation} />}
    />
}



const SearchBar = () => {
    const [searchText, setSearchText] = useState<string>('');
    return <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24, marginBottom: 12 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 24, paddingHorizontal: 12, borderColor: 'grey', borderWidth: 0.4 }}>
            <Image source={EXPLORE_ICON} style={{ height: 20, width: 16 }} />
            <TextInput placeholder='Search' style={{ flex: 1, marginLeft: 8, fontSize: 16 }} onChange={(event) => { setSearchText(event.nativeEvent.text) }} />
            {searchText.length > 0 && (
                <ClearTextButton onPress={() => { }}>
                    <Text>x</Text>
                </ClearTextButton>
            )}
        </View>
    </View>
}



const ClearTextButton = styled.TouchableOpacity`
position: absolute;
right: 12px;
top: 10px;
`;


export default UpcomingEvents;

