import React, { useState, useEffect, useMemo } from 'react'
import { Dimensions, FlatList, Image, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'

import styled from 'styled-components/native'
import BaseResponse from '../../../core/network/base_response'
import { User } from '../../../features/models/user'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-virtualized-view'
import { EventCardModel, mockEventCardModel } from './models/event_model'
import MasonryList from '@react-native-seoul/masonry-list';
import { FilterModel } from './models/filter_model'
import EventCard from './components/EventCard'
import { EXPLORE_ICON } from '../../../features/constants/image_constants'

const UpcomingEvents = () => {
    const [events, setEvents] = useState<EventCardModel[]>(mockEventCardModel);
    const [filters, setFilters] = useState<FilterModel[]>([]);

    useEffect(() => {
        fetchFilters();
    }, [])

    const fetchFilters = () => {
        // api call
        const mockFilters: FilterModel[] = [
            { id: '1', name: 'All', isActive: false },
            { id: '2', name: 'Upcoming', isActive: true },
            { id: '3', name: 'Latest', isActive: false },
        ]
        setFilters(mockFilters);
    }


    return (
        <ScrollView style={{ flex: 1, paddingHorizontal: 24, paddingTop: 24 }} scrollToOverflowEnabled={false} stickyHeaderIndices={[1]} nestedScrollEnabled={true} >
            <Text style={{ fontSize: 36, color: 'black', fontWeight: '700', marginLeft: 10 }}>Events</Text>
            <SearchBar />
            <FilterRow filters={filters} setFilters={setFilters} />
            <EventsList events={events} />
        </ScrollView>
    );
};


const FilterRow = ({ filters, setFilters }: { filters: FilterModel[], setFilters: React.Dispatch<React.SetStateAction<FilterModel[]>> }) => {
    const onFilterPress = (id: string) => {
        if (filters.some(filter => filter.id === id && filter.isActive)) {
            return;
        }
        const updatedFilters = filters.map(filter => ({
            ...filter,
            isActive: filter.id === id
        }));
        setFilters(updatedFilters);
    };
    return <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12 }}>
        {
            filters.map((filter, index) => <FilterButton key={index} filter={filter} onPress={onFilterPress} />)
        }
    </View>
}

const FilterButton = ({ filter, onPress }: { filter: FilterModel, onPress: (id: string) => void }) => {
    return <OutlinedButton style={{ backgroundColor: filter.isActive ? 'darkblue' : 'transparent' }} onPress={() => onPress(filter.id)}>
        <Text style={{ fontSize: 16, fontWeight: '500', color: filter.isActive ? 'white' : 'black' }}>
            {filter.name}
        </Text>
    </OutlinedButton>
}

const EventsList = ({ events }: { events: EventCardModel[] }) => {
    const navigation = useNavigation();

    return <MasonryList style={{

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


const OutlinedButton = styled.TouchableOpacity`
    border: 1px solid gray;    
    border-radius: 24px;
    padding: 10px 24px;
    margin: 4px 4px;

`
const ClearTextButton = styled.TouchableOpacity`
position: absolute;
right: 12px;
top: 10px;
`;


export default UpcomingEvents;

