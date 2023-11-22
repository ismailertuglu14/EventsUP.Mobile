import React from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView, Image } from "react-native"
import styled from "styled-components/native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../features/helpers/screen_helpers";
import EmptyImagePlaceHolder from "../../../../features/shared/components/EmptyImagePlaceHolder";
import { User as GeneralUser } from "../../../../features/models/user";

type FollowingFollowersModalProps = {
    isFollowingModalOpen: boolean;
    isFollowersModalOpen: boolean;
    handleCloseModal: () => void;
    searchedUsers: GeneralUser[];
    setSearchText2: (value: string) => void;
    getFollowingsUsers: () => void;
    getFollowersUsers: () => void;
    navigateToUser: (id: string) => void;
    searchText: string;
    setSearchText: (value: string) => void;
    handleClearText: () => void;
}
const FollowingFollowersModal = ({
    isFollowingModalOpen,
    isFollowersModalOpen,
    handleCloseModal,
    searchedUsers,
    setSearchText2,
    getFollowingsUsers,
    getFollowersUsers,
    navigateToUser,
    searchText,
    setSearchText,
    handleClearText
}: FollowingFollowersModalProps) => {
    return (
        <Modal visible={isFollowingModalOpen || isFollowersModalOpen} transparent={true}>
            <TouchableOpacity
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.85)',
                }}
                onPress={() => handleCloseModal()}>
                <TouchableOpacity activeOpacity={1}>
                    <View style={{ width: SCREEN_WIDTH / 2.4, height: SCREEN_HEIGHT * 0.5, backgroundColor: 'white', alignItems: 'center' }}>
                        <Text style={{ marginTop: 20, marginBottom: 5 }}>{isFollowersModalOpen ? 'Followers' : 'Followings'}</Text>
                        <SearchContainer>
                            <SearchInput
                                placeholder="Search users"
                                value={searchText}
                                onChangeText={(value) => setSearchText(value)}
                                onSubmitEditing={(value) => {
                                    setSearchText2(value.nativeEvent.text)
                                    isFollowingModalOpen ? getFollowingsUsers() : getFollowersUsers()
                                }}
                            />
                            {searchText.length > 0 && (
                                <ClearTextButton onPress={handleClearText}>
                                    <Text>x</Text>
                                </ClearTextButton>
                            )}
                        </SearchContainer>
                        <ScrollView contentContainerStyle={{
                            flex: 1
                        }}>
                            {
                                searchedUsers && searchedUsers.length > 0 && searchedUsers.map((user, index) => (
                                    <UserRow key={index} onPress={() => navigateToUser(user.id)}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                            {
                                                user.profileImage ? <Image source={{ uri: user.profileImage }} style={{ width: 30, height: 30, borderRadius: 50 }} /> :
                                                    <EmptyImagePlaceHolder gender={user.gender} style={{ width: 30, height: 30, borderRadius: 50 }} />
                                            }
                                            <Text style={{ marginLeft: 10 }}>{user.fullName}</Text>
                                        </View>
                                        <View />
                                    </UserRow>
                                ))
                            }
                        </ScrollView>

                    </View>
                </TouchableOpacity>
            </TouchableOpacity>

        </Modal>
    )
};
const SearchContainer = styled.View`
    width: 80%;
    height: 40px;
    margin-bottom: 12px;
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
const UserRow = styled.Pressable`
flex-direction: row;
align-items: center;
justify-content: space-between;
width: 100%;
padding: 12px;
border-bottom-width: 1px;
border-bottom-color: #f0f0f0;
`;
export default FollowingFollowersModal