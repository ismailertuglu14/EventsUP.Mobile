import React, { useState, useEffect } from 'react'
import { Text, TouchableWithoutFeedback } from 'react-native'

import styled from 'styled-components/native'
import { CloseKeyboard } from '../../../features/shared/keyboard/close_keyboard'
import SearchLanding from './components/SearchLanding'
import SearchResult from './components/SearchResult'
import { searchByQueryText } from './service/search_service'
import BaseResponse from '../../../core/network/base_response'
import { User } from '../../../features/models/user'
import { useNavigation } from '@react-navigation/native'
import { useAppSelector } from '../../../features/redux/store'
import { colors } from '../../../core/theme/theme_colors'
const SearchScreen = () => {
    const theme = useAppSelector((state) => state.theme.theme)
    const navigation: any = useNavigation()
    const [searchText, setSearchText] = useState('')
    const [submitedSearchText, setSubmitedSearchText] = useState('')
    const [userResults, setUserResults] = useState<User[]>([])
    const [lastSearches, setLastSearches] = useState<string[]>([
        "Basketball",
        "Gaming Istanbul",
        "Software Development",
    ])

    type event = { id: string, startDate: string, name: string, place: string }
    const [popularEvents, setPopularEvents] = useState<event[]>([
        { id: "1", startDate: "March, 12", name: "Go Lang öğrenelim", place: "Istanbul" },
        { id: "2", startDate: "Jun, 20", name: "Oyun gecesi", place: "twitch.tv/ismailertuglu14" },
        { id: "3", startDate: "Jun, 24", name: "Basketball 1vs1", place: "Istanbul, Tuzla" },
    ])

    type community = { id: string, name: string, imageUrl: string }
    const [popularCommunities, setPopularCommunities] = useState<community[]>([
        { id: "1", name: "Java Community", imageUrl: "https://pbs.twimg.com/profile_images/1404479261566713856/_MklDkhx_400x400.jpg" },
        { id: "2", name: "Basketball", imageUrl: "https://minio.yalispor.com.tr/sneakscloud/blog/basketbol-hakkinda-bilmen-gereken-kurallar_5e53ae3fdd3fc.jpg" },
        { id: "3", name: "Valorant Tayfa", imageUrl: "https://cdn.vox-cdn.com/thumbor/eNOhiVdnvnyYEv_9kIw1IABEyZI=/0x0:3011x1447/1400x933/filters:focal(1123x329:1603x809):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/66954486/VALORANT_Jett_Red_crop.0.jpg" },
    ])

    const handleSearch = async (value: string) => {
        setSubmitedSearchText(value)
        const response: BaseResponse<User[]> = await searchByQueryText(value)
        if (response.data) {
            setUserResults(response.data)
        }
    }

    const handleClearText = () => {
        setSearchText('')
        setSubmitedSearchText('')
    }



    return (
        <TouchableWithoutFeedback onPress={() => CloseKeyboard()}>
            <Screen>
                <SearchContainer>
                    <SearchInput
                        placeholder="Search for events, users, communities"
                        placeholderTextColor={'gray'}
                        style={{ color: 'black' }}
                        value={searchText}
                        onChangeText={(value) => setSearchText(value)}
                        onSubmitEditing={(value) => handleSearch(value.nativeEvent.text)}
                    />
                    {searchText.length > 0 && (
                        <ClearTextButton onPress={handleClearText}>
                            <Text>x</Text>
                        </ClearTextButton>
                    )}
                </SearchContainer>
                {
                    submitedSearchText.length === 0 ? (
                        <SearchLanding lastSearches={lastSearches} popularCommunities={popularCommunities} popularEvents={popularEvents} />
                    ) : (
                        <SearchResult response={userResults} navigation={navigation} />
                    )
                }

            </Screen>
        </TouchableWithoutFeedback>
    )
}

const Screen = styled.View`
    flex: 1;
    justify-content: flex-start;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 24px;
`;
const SearchContainer = styled.View`
    width: 100%;
    height: 40px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: relative;
`;
const SearchInput = styled.TextInput`
    width: 100%;
    height: 40px;
    border-radius: 8px;
    background-color: #f0f0f0;
    padding: 0 12px;
`;
const ClearTextButton = styled.TouchableOpacity`
    position: absolute;
    right: 12px;
    top: 10px;
`;

export default SearchScreen