import React, { useState, useEffect, useMemo } from 'react'
import { Text, View } from 'react-native'

import styled from 'styled-components/native'
import { FilterModel } from '../models/filter_model';

export const FilterRow = ({ filters, setFilters }: { filters: FilterModel[], setFilters: React.Dispatch<React.SetStateAction<FilterModel[]>> }) => {
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

export const FilterButton = ({ filter, onPress }: { filter: FilterModel, onPress: (id: string) => void }) => {
    return <OutlinedButton style={{ backgroundColor: filter.isActive ? 'darkblue' : 'transparent' }} onPress={() => onPress(filter.id)}>
        <Text style={{ fontSize: 16, fontWeight: '500', color: filter.isActive ? 'white' : 'black' }}>
            {filter.displayName}
        </Text>
    </OutlinedButton>
}
const OutlinedButton = styled.TouchableOpacity`
    border: 1px solid gray;    
    border-radius: 24px;
    padding: 10px 24px;
    margin: 4px 4px;

`