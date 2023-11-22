import { Image, RefreshControl, View } from "react-native";
import styled from "styled-components/native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Text } from "react-native";
import { fetchFeed } from "./services/feed_service";
import Story from "./components/Story";
import { mockStories } from "./models/story_model";
import PostCard from "./components/PostCard";
import { PostModel } from "./models/post_model";
import BaseResponse from "../../../core/network/base_response";
import { ScrollView } from "react-native-virtualized-view";
import AddStory from "./components/AddStory";
import { useAppSelector } from "../../../features/redux/store";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { DM_ICON, MESSAGE_ICON } from "../../../features/constants/image_constants";
import NavigationPath from "../../../core/navigation/navigation_paths";

export const Feed = () => {
    const navigation: any = useNavigation();
    const user = useAppSelector((state) => state.currentUser.user);
    const [posts, setPosts] = useState<PostModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isEndOfPage, setIsEndOfPage] = useState(false);
    const pageRef = useRef(0);

    useEffect(() => {
        handleFetchFeed();
    }, []);

    const handleFetchFeed = async () => {
        try {
            if (posts.length == 0) {
                var response: BaseResponse<PostModel[]> = await fetchFeed(pageRef.current);
                if (response.statusCode === 200) {
                    setPosts(prev => [...prev, ...response.data]);
                }
            }
        } catch {
        } finally {
        }
    };

    const handleRefreshFeed = async () => {
        try {
            setIsRefreshing(true);
            var response: BaseResponse<PostModel[]> = await fetchFeed(0);
            if (response.statusCode === 200) {
                setPosts(response.data);
            }
        } catch {
        } finally {
            setIsRefreshing(false);
        }
    }

    const DirectMessagesIcon = styled.TouchableOpacity`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    background-color: #f0f0f0;
    align-items: center;
    justify-content: center;
    margin-left: 12px;
`;

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={handleRefreshFeed}
                />
            }
        >
            <Header>
                <HeaderText>EventsUP</HeaderText>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <CreateButton>
                        <Text style={{ fontSize: 24 }}>+</Text>
                    </CreateButton>
                    <DirectMessagesIcon onPress={() => navigation.navigate(NavigationPath.DIRECT_MESSAGES)}>
                        <Image source={DM_ICON} style={{ width: 20, height: 20 }} resizeMode="contain" />
                    </DirectMessagesIcon>
                </View>
            </Header>

            <StoriesSection
                style={{ marginHorizontal: 12 }}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={mockStories}
                renderItem={({ item, index }) => {
                    return (
                        <>
                            {index == 0 && <AddStory user={user!} isUserStoryAvailable={false} />}
                            <Story key={item.id} story={item} />
                        </>
                    );
                }} />

            {posts.length > 0 ? (
                <PostsSection

                    showsVerticalScrollIndicator={false}
                    data={posts}
                    renderItem={({ item }) => (
                        <PostCard key={item.id} post={item} setPosts={setPosts} navigation={navigation} />
                    )} />) : <Text>Empty array</Text>}

        </ScrollView>
    );
};

const Header = styled.View`
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
`;
const CreateButton = styled.TouchableOpacity`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    background-color: #f0f0f0;
    align-items: center;
    justify-content: center;
`;

const HeaderText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #000;
`;
const StoriesSection = styled.FlatList`
`
const PostsSection = styled.FlatList`
    flex: 1;
    width: 100%;
    height: 100%;
    margin-top: 12px;
    margin-bottom: 12px; 
`

export default Feed;