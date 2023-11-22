
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { useEffect } from "react";
import { Animated, Dimensions, Easing, Image, LogBox, Modal, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { MESSAGE_ICON, PEN_ICON, SETTINGS_ICON } from "../../../features/constants/image_constants";
import { useAppSelector } from "../../../features/redux/store";
import BaseResponse from "../../../core/network/base_response";
import NavigationPath from "../../../core/navigation/navigation_paths";
import { User } from "./models/User";
import { TABS, TabNames } from "./models/tab_model";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Activities from "./components/Activities/Activities";
import UserPosts from "./components/UserPosts/UserPosts";
import { ActivityModel, mockActivities } from "./components/Activities/model/activity_model";
import { PostModel, mockPosts } from "../Feed/models/post_model";
import { followUser, getFollowers, getFollowings, getProfileInfo } from "./service/profile_service";
import EmptyImagePlaceHolder from "../../../features/shared/components/EmptyImagePlaceHolder";
import { getUserById } from "../Search/service/search_service";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../features/helpers/screen_helpers";
import { User as GeneralUser } from "../../../features/models/user";
import { ScrollView } from "react-native-virtualized-view";
import FollowingFollowersModal from "./components/FollowingFollowersModal";
import ChangeImageModal from "./components/ChangeImageModal";

const Stack = createNativeStackNavigator();

const ProfileScreen = () => {
    const route = useRoute();
    const navigation: any = useNavigation();
    const { id } = route.params as { id: string }
    const currentUser = useAppSelector(state => state.currentUser.user!)
    let isUserOwnProfile = id === currentUser.id;

    const [isLoading, setIsLoading] = useState(false);

    const [ppRotateY, setPpRotateY] = React.useState(new Animated.Value(0));
    const [isSettingsShown, setIsSettingsShown] = useState(false)

    const [user, setUser] = useState<User>()
    const [activities, setActivities] = useState<ActivityModel[]>(mockActivities)
    const [posts, setPosts] = useState<PostModel[]>(mockPosts)

    const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false)
    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [searchText2, setSearchText2] = useState('')
    const [searchedUsers, setSearchedUsers] = useState<GeneralUser[]>([])

    useEffect(() => {
        handleGetUser()
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])

    }, [])

    const handleGetUser = async () => {
        // If user is not own profile, get user info from server
        // If user is own profile, get user info from redux
        if (!isUserOwnProfile) {
            try {
                setIsLoading(true)
                var response = await getProfileInfo(id);
                if (response!.statusCode === 200) {
                    var user: BaseResponse<User> = response!
                    setUser(user.data)
                }
            } catch (e) {
                console.log(e)
            } finally {
                setIsLoading(false)
            }
        } else {
            setUser({
                id: currentUser.id,
                userName: currentUser.userName,
                fullName: currentUser.fullName,
                profileImage: currentUser.profileImage,
                bannerImage: currentUser.bannerImage,
                followersCount: currentUser.followersCount,
                followingCount: currentUser.followingsCount,
                bio: currentUser.bio,
                birthdayDate: currentUser.birthdayDate,
                email: currentUser.email,
                gender: currentUser.gender,
                isPrivate: currentUser.isPrivate,
                isFollowing: true,
                isBlocked: false,
                isFollowRequestReceived: false,
                isFollowRequestSent: false,
            })
        }
    }


    const handleFollow = async () => {
        try {
            setIsLoading(true)
            var response: BaseResponse<null> = await followUser(id);
            if (response.statusCode === 200) {
                getUserById(id).then(response => {
                    if (response.statusCode === 200) {
                        setUser(response.data)
                    }
                })
            }
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const handleUnfollow = async () => {
        try {
            setIsLoading(true)
            var response: BaseResponse<null> = await followUser(id);
            if (response.statusCode === 200) {
                setUser(prev => {
                    return {
                        ...prev!,
                        isFollowing: false
                    }
                })
            }
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancelFollowRequest = async () => { }
    const handleBlock = async () => { }
    const handleUnblock = async () => { }
    const handleReport = async () => { }

    const navigateToDirectMessage = () => { }


    const [tabs, setTabs] = useState(TABS)
    const [activeTab, setActiveTab] = useState<TabNames>(TabNames.Activities)
    const changeActiveTab = (tabName: TabNames) => {
        var newTabs = tabs.map(tab => {
            if (tab.name === tabName) {
                return {
                    ...tab,
                    isActive: true,
                }
            } else {
                return {
                    ...tab,
                    isActive: false,
                }
            }
        })
        switch (tabName) {
            case TabNames.Activities:
                setActiveTab(TabNames.Activities)
                break;
            case TabNames.Posts:
                setActiveTab(TabNames.Posts)
                break;
            case TabNames.Events:
                setActiveTab(TabNames.Events)
                break;
            case TabNames.Communities:
                setActiveTab(TabNames.Communities)
                break;
            case TabNames.Saved:
                setActiveTab(TabNames.Saved)
                break;
            default:
                throw new Error("Tab name is not valid")
        }

        setTabs(newTabs)
    }

    const revealOrHideChangeProfilePhoto = () => {
        if (isSettingsShown === false) {
            Animated.timing(ppRotateY, {
                toValue: -90,
                duration: PP_ROTATION_TIME,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start();

            // Wait for half of the animation to finish and show other image
            setTimeout(() => {
                setIsSettingsShown(true)
            }, PP_ROTATION_TIME / 2)
        } else {
            Animated.timing(ppRotateY, {
                toValue: 0,
                duration: PP_ROTATION_TIME,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start();

            // Wait for half of the animation to finish and show other image
            setTimeout(() => {
                setIsSettingsShown(false)
            }, PP_ROTATION_TIME / 2)
        }
    };

    const rotateYInterpolate = ppRotateY.interpolate({
        inputRange: [0, 90],
        outputRange: ['-180deg', '0deg'],
    });

    const openChangeProfilePhotoMenu = () => {
        console.log("asdsad")


    };

    const handleOpenFollowingsModal = () => {
        getFollowingsUsers()
        setIsFollowingModalOpen(true)

    }

    const handleOpenFollowersModal = () => {
        getFollowersUsers()
        setIsFollowersModalOpen(true)
    }

    const getFollowingsUsers = async () => {
        const response = await getFollowings(id, searchText2, 0, 10);
        if (response && response.statusCode === 200) {
            setSearchedUsers(response.data)
        }
    }
    const getFollowersUsers = async () => {
        const response = await getFollowers(id, searchText2, 0, 10);
        if (response && response.statusCode === 200) {
            setSearchedUsers(response.data)
        }
    }

    useEffect(() => {
        isFollowingModalOpen ? getFollowingsUsers() : getFollowersUsers()
    }, [searchText2])

    const handleClearText = () => {
        setSearchText('');
        setSearchText2('')
    }
    const handleCloseModal = () => {
        setSearchText('')
        setSearchText2('')
        setSearchedUsers([])
        if (isFollowingModalOpen) {
            setIsFollowingModalOpen(false)
        } else {
            setIsFollowersModalOpen(false)
        }
    }

    const navigateToUser = (id: string) => {
        handleCloseModal()
        navigation.navigate(NavigationPath.PROFILE, { id })
    }

    const [isChangeImageModalOpen, setIsChangeImageModalOpen] = useState(false)
    const handleCloseChangeImageModal = () => {
        setIsChangeImageModalOpen(false)
    }

    const PP_ROTATION_TIME = 250;
    const PROFILE_IMAGE_WIDTH = 80;
    const PROFILE_IMAGE_HEIGHT = 80;
    const PROFILE_IMAGE_OUTLINE_WIDTH = 84;
    const PROFILE_IMAGE_OUTLINE_HEIGHT = 82;

    return (
        <Screen>
            <FollowingFollowersModal
                isFollowingModalOpen={isFollowingModalOpen}
                isFollowersModalOpen={isFollowersModalOpen}
                handleCloseModal={handleCloseModal}
                searchedUsers={searchedUsers}
                setSearchText2={setSearchText2}
                getFollowingsUsers={getFollowingsUsers}
                getFollowersUsers={getFollowersUsers}
                navigateToUser={navigateToUser}
                searchText={searchText}
                setSearchText={setSearchText}
                handleClearText={handleClearText}
            />
            <ChangeImageModal
                isModalOpen={isChangeImageModalOpen}
                handleCloseModal={handleCloseChangeImageModal}
            />
            {
                user && (
                    <ScrollArea scrollToOverflowEnabled={false} stickyHeaderIndices={[1]} nestedScrollEnabled={true} >
                        <ProfileHeader>
                            <ImageContainer>
                                <TopImage source={{ uri: user!.bannerImage }} />
                                <View
                                    style={{
                                        position: 'absolute',
                                        bottom: -36,
                                        left: (Dimensions.get('window').width / 2) - (PROFILE_IMAGE_OUTLINE_WIDTH / 2),
                                        width: PROFILE_IMAGE_OUTLINE_WIDTH,
                                        height: PROFILE_IMAGE_OUTLINE_HEIGHT,
                                        borderRadius: 1000,
                                        backgroundColor: 'white'
                                    }} />
                                <TouchableHighlight
                                    disabled={!isUserOwnProfile}
                                    onLongPress={revealOrHideChangeProfilePhoto}
                                    onPress={isSettingsShown ? () => setIsChangeImageModalOpen(true) : () => null}
                                    underlayColor={'transparent'}
                                    style={{
                                        position: 'absolute',
                                        bottom: -36,
                                        left: (Dimensions.get('window').width / 2) - (PROFILE_IMAGE_WIDTH / 2),
                                        width: PROFILE_IMAGE_WIDTH,
                                        height: PROFILE_IMAGE_HEIGHT,
                                        borderRadius: PROFILE_IMAGE_HEIGHT,
                                    }}>
                                    <Animated.View
                                        style={{
                                            position: 'absolute',
                                            width: '100%',
                                            height: PROFILE_IMAGE_HEIGHT,
                                            borderRadius: 50,
                                            transform: [{ rotateY: rotateYInterpolate }],
                                        }}>
                                        {
                                            isSettingsShown === false ?
                                                user!.profileImage ?
                                                    <BottomImage
                                                        source={{ uri: user!.profileImage }}
                                                    /> : <EmptyImagePlaceHolder gender={user!.gender} style={{ width: '100%', height: PROFILE_IMAGE_HEIGHT }} />
                                                : <BottomImage
                                                    source={PEN_ICON}
                                                    style={{
                                                        backgroundColor: 'white',
                                                        alignSelf: 'center',
                                                        width: '100%',
                                                        height: PROFILE_IMAGE_HEIGHT,
                                                    }}
                                                />
                                        }
                                    </Animated.View>
                                </TouchableHighlight>
                            </ImageContainer>
                            <FullName>{user.fullName}</FullName>
                            <UserName>@{user.userName}</UserName>
                            <FollowStatusArea>
                                <FollowStatus onPress={() => handleOpenFollowingsModal()}>
                                    <FollowStatusNumber>{user.followingCount}</FollowStatusNumber>
                                    <FollowStatusText>Following</FollowStatusText>
                                </FollowStatus>
                                <FollowStatus onPress={() => handleOpenFollowersModal()}>
                                    <FollowStatusNumber>{user.followersCount}</FollowStatusNumber>
                                    <FollowStatusText>Followers</FollowStatusText>
                                </FollowStatus>
                            </FollowStatusArea>
                            <ButtonsArea>
                                <View style={{
                                    minWidth: Dimensions.get('screen').width * 0.04,
                                    maxWidth: Dimensions.get('screen').width * 0.18
                                }} />
                                {
                                    isUserOwnProfile ? (
                                        <FollowButton onPress={() => navigation.navigate("/Home")}><FollowText>Edit Profile</FollowText></FollowButton>
                                    ) : (
                                        <>
                                            {user.isFollowing ? (
                                                <UnFollowButton onPress={() => handleFollow()}><UnFollowText>UnFollow</UnFollowText></UnFollowButton>
                                            ) : (
                                                user.isFollowRequestSent ? (
                                                    <FollowButton onPress={() => handleFollow()}>
                                                        <FollowText>Follow Request Sent</FollowText>
                                                    </FollowButton>
                                                ) :
                                                    (<FollowButton onPress={() => handleFollow()}>
                                                        <FollowText>Follow</FollowText>
                                                    </FollowButton>)
                                            )}

                                            <SettingsButton onPress={() => navigation.navigate("/Home")}><MessageIcon source={MESSAGE_ICON} /></SettingsButton>
                                        </>
                                    )
                                }

                                {
                                    isUserOwnProfile ? (
                                        <SettingsButton onPress={() => navigation.navigate(NavigationPath.SETTINGS)}><Image source={SETTINGS_ICON} style={{ width: 16, height: 16 }} /></SettingsButton>
                                    ) : (
                                        <SettingsButton onPress={() => navigation.navigate("/Home")}><Text style={{ marginBottom: 8, height: 20, width: 14, textAlign: 'center' }}>...</Text></SettingsButton>
                                    )
                                }

                            </ButtonsArea>
                        </ProfileHeader>
                        <TabsRow>
                            {tabs.filter(tab =>
                                !tab.isShownOwnProfile || tab.isShownOwnProfile === isUserOwnProfile
                            ).map((tab, index) => (
                                <TabButton key={index}
                                    onPress={changeActiveTab.bind(this, tab.name)}
                                    style={{
                                        borderBottomWidth: tab.isActive ? 2 : 0,
                                        borderBottomColor: tab.isActive ? 'blue' : 'white',
                                    }}>
                                    <TabText>{tab.name}</TabText>
                                </TabButton>
                            ))}
                        </TabsRow>
                        <View style={{ flex: 1 }}>
                            {ActiveTab(activeTab, user!, activities, setActivities, posts, setPosts)}
                        </View>
                    </ScrollArea>
                )
            }
        </Screen>
    )
};
const ActiveTab = (activeTab: TabNames, user: User,
    activities: ActivityModel[], setActivities: React.Dispatch<React.SetStateAction<ActivityModel[]>>,
    posts: PostModel[], setPosts: React.Dispatch<React.SetStateAction<PostModel[]>>
) => {
    switch (activeTab) {
        case TabNames.Activities:
            return <Activities user={user} activities={activities} setActivities={setActivities} />
        case TabNames.Posts:
            return <UserPosts id={user.id} />
        case TabNames.Events:
            return <Tab3 />
        case TabNames.Communities:
            return <Tab4 />
        case TabNames.Saved:
            return <Tab5 />
        default:
            throw new Error("Tab name is not valid")
    }
}


const Tab2 = () => {
    return (
        <View>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
            <Text>Tab2</Text>
        </View>
    )
}
const Tab3 = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'yellow' }}>
            <Text style={{ flex: 1, color: 'black' }}>Tab1</Text>
        </View>
    )
}
const Tab4 = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'brown' }}>
            <Text style={{ flex: 1, color: 'black' }}>Tab1</Text>
        </View>
    )
}
const Tab5 = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'green' }}>
            <Text style={{ flex: 1, color: 'black' }}>Tab1</Text>
        </View>
    )
}
const Screen = styled.SafeAreaView`
    flex:1;
    min-height: 100%;
`
const TabsRow = styled(View) <{ backgroundColor: string }>`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 40px;
    background-color: #fff;
`;
const TabButton = styled.TouchableOpacity`
    flex: 1;
    height: 100%;
    align-items: center;
    justify-content: center;
`;
const TabText = styled.Text`
    font-size: 12px;
    font-weight: 500;
    color: #000;
`;

const ScrollArea = styled.ScrollView`
    flex: 1;
    background-color: #fff;
`;
const ProfileHeader = styled.View`
    flex-direction: column;
    align-items: center;
`
const ImageContainer = styled.View`
  position: relative;
  width: 100%;
  height: 100px;
  margin-bottom: 40px;
`;
const TopImage = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
`;

const BottomImage = styled.Image`
  position: absolute;
  width: 100%;
  height: 80px;
  border-radius: 50px;
  transform: rotateY(0deg);
`;
const ChangePPButton = styled.View`
  position: absolute;
  width: 100%;
  height: 100px;
  border-radius: 50px;
  transform: rotateY(0deg);
  
  align-items: center;
    justify-content: center;
  `
const FullName = styled.Text`
    font-size: 18px;
    font-weight: 500;
    color: #000;
    margin-top: 16px;
`;
const UserName = styled.Text`
    font-size: 12px;
    color: #000;
`;

const FollowStatusArea = styled.View`
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-top: 8px;
`;
const FollowStatus = styled.Pressable`
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-end;
    margin-right: 4px;
    margin-left: 4px;
`;
const FollowStatusNumber = styled.Text`
    font-size: 14px;
    color: #000;
`;
const FollowStatusText = styled.Text`
    font-size: 12px;
    margin-left: 2px;
    margin-bottom: 1px;
    color: #000;
`;
const ButtonsArea = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 16px;
`;
const FollowButton = styled.TouchableOpacity`
    width: 20%;
    height: 24px;
    border-radius: 4px;
    background-color: blue;
    align-items: center;
    justify-content: center;
`;
const UnFollowButton = styled.TouchableOpacity`
    width: 20%;
    height: 24px;
    border-radius: 4px;
    background-color: blue;
    align-items: center;
    justify-content: center;
`;
const FollowText = styled.Text`
    font-size: 12px;
    color: #fff;
`;
const UnFollowText = styled.Text`
    font-size: 12px;
    color: #fff;
`;
const SettingsButton = styled.TouchableOpacity`
    height: 24px;
    margin-left: 12px;
    border-radius: 4px;
    border-radius: 4px;
    background-color: #fff;
    align-items: center;
    justify-content: center;
`;

const MessageIcon = styled.Image`
    width: 26px;
    height: 26px;
`;


export default ProfileScreen;