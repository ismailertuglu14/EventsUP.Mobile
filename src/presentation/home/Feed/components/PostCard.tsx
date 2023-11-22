import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { stringShortener } from "../../../../features/helpers/string_helpers";
import SaveIcon from "../../../../features/shared/icons/SaveIcon";
import { File, PostModel } from "../models/post_model";
import { howManyTimesAgo } from "../../../../features/helpers/time_helpers";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { COMMENT_ICON } from "../../../../features/constants/image_constants";
import { savePost } from "../../Post/service/post_service";
import BaseResponse from "../../../../core/network/base_response";
import { useNavigation } from "@react-navigation/native";
import NavigationPath from "../../../../core/navigation/navigation_paths";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../features/helpers/screen_helpers";

type PostCardProps = {
    post: PostModel
    setPosts: React.Dispatch<React.SetStateAction<PostModel[]>>
    navigation: any
};

const PostCard: React.FC<PostCardProps> = ({ post, setPosts, navigation }) => {
    const handleSavePost = async (id: string) => {
        var response: BaseResponse<string> = await savePost(id)
        if (response.statusCode === 200) {
            setPosts(prev => prev.map(post => post.id === id ? { ...post, isSaved: !post.isSaved } : post))
        }
    }
    const navigateToComments = () => {
        navigation.navigate(NavigationPath.COMMENTS, { postId: post.id, setPosts })
    }
    return (
        <CardContainer>
            <ProfileHeader>
                {post.user.profileImage !== undefined && (
                    <ProfileImage source={{ uri: post.user.profileImage }} />
                )}
                <FullName>{post.user.fullName}</FullName>
                <Text style={{ marginBottom: 20 }}>  . </Text>
                <Text style={{ marginBottom: 12, fontSize: 8, fontWeight: '400', color: 'black' }}> {howManyTimesAgo(new Date(post.createdAt))}</Text>
            </ProfileHeader>
            <Description>{stringShortener(post.description, 128)} {post.description.length > 128 && <TouchableOpacity style={{}}><ReadMoreText > read more</ReadMoreText></TouchableOpacity>}</Description>
            {
                post.files && post.files.length > 0 && (
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <SwiperFlatList
                            index={0}
                            paginationStyle={{ position: 'relative' }}
                            data={post.files}
                            renderItem={({ item }: { item: File }) => (
                                item.type === 1 ? (
                                    <PostImage source={{ uri: item.file }} style={{ width: SCREEN_WIDTH * 0.9 }} resizeMode="contain" />
                                ) : (
                                    <Text> Unsupported Media File</Text>
                                )
                            )}
                        />
                    </View>
                )
            }
            <Footer>
                <Text style={{ fontSize: 12, fontWeight: '400', color: 'black' }}> {post.interactionCount} Likes</Text>
                <Text style={{ fontSize: 12, fontWeight: '400', color: 'black' }}> {post.commentCount} </Text>
                <TouchableOpacity onPress={navigateToComments}>
                    <Image source={COMMENT_ICON} style={{ width: 16, height: 16 }} />
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
                <TouchableOpacity onPress={() => handleSavePost(post.id)} style={{}}>
                    <SaveIcon color={post.isSaved ? 'black' : 'white'} />
                </TouchableOpacity>
            </Footer>
        </CardContainer >
    )
};
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: { height: 200, backgroundColor: 'white' },
    child: { width: width * 0.9, height: 150, justifyContent: 'center' },
    text: { fontSize: 14, textAlign: 'center' },
});


const CardContainer = styled.View`
    width: 90%;
    margin-bottom: 10px;
    align-self: center;
`;
const ProfileHeader = styled.View`
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: center;
`;
const ProfileImage = styled.Image`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    background-color: #f0f0f0;
`;
const FullName = styled.Text`
    font-size: 12px;
    font-weight: 400;
    color: black;
    margin-left: 8px;
    margin-bottom: 12px;
`;
const Description = styled.Text`
    font-size: 12px;
    font-weight: 400;
    color: black;
`;
const ReadMoreText = styled.Text`
    font-size: 12px;
    font-weight: 400;
    color: blue;
`;

const PostImage = styled.Image`
    width: 96%;
    align-self: center;
    height: 150px;
    margin-top: 12px;
    margin-bottom: 12px;
`;

const Footer = styled.View`
    width:100%;

    height: 40px;
    flex-direction: row;
    align-items: center;
`;

export default PostCard;
