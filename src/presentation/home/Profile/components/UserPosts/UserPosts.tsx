import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { PostModel } from '../../../Feed/models/post_model';
import Post from '../../../Post/Post';
import { useNavigation } from '@react-navigation/native';
import { getUserPosts } from '../../service/profile_service';
import BaseResponse from '../../../../../core/network/base_response';
const UserPosts = ({ id }: { id: string }) => {
    const navigation = useNavigation();
    const [posts, setPosts] = React.useState<PostModel[]>([]);

    useEffect(() => {
        handleGetUserPosts();
    }, [])
    const handleGetUserPosts = async () => {
        console.log("post user id ", id)
        const posts: BaseResponse<PostModel[]> = await getUserPosts(id)
        if (posts) {
            setPosts(posts.data)
        }
    }
    return (
        <Screen>
            {posts && <PostsList
                data={posts}
                renderItem={({ item }) => <Post key={item.id} navigation={navigation} post={item} setPosts={setPosts} />}
                keyExtractor={(item) => item.id.toString()}
            />}
        </Screen>
    )
}
const Screen = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;
const PostsList = styled.FlatList`
    width: 80%;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 20px;
`;
export default UserPosts;