import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import SaveIcon from "../../../features/shared/icons/SaveIcon";
import { File, PostModel } from "../Feed/models/post_model";
import { howManyTimesAgo } from "../../../features/helpers/time_helpers";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { COMMENT_ICON, NO_COMMENT_ICON, SEND_ICON, THREE_DOT_ICON } from "../../../features/constants/image_constants";
import { createComment, getPostById, getPostComments, savePost } from "./service/post_service";
import Post from "./Post";
import { HorizontalDivider } from "../../../features/shared/components/Divider";
import { SCREEN_WIDTH } from "../../../features/helpers/screen_helpers";
import CommentItem from "./components/CommentItem";
import { CommentModel } from "./models/comment_model";
import { useAppSelector } from "../../../features/redux/store";
import BottomSheet, { BottomSheetRefProps } from "../../../features/shared/components/BottomSheet";
import Comments from "./components/Comments";
const PostDetail = ({ route, navigation }: { route: any, navigation: any }) => {
    const { id } = route.params;
    const currentUser = useAppSelector(state => state.currentUser.user)

    const [post, setPost] = useState<PostModel>();
    const [comments, setComments] = useState<CommentModel[]>([]);
    const [commentText, setCommentText] = useState("")

    useEffect(() => {
        fetchData()
    }, []);
    const fetchData = async () => {
        try {
            await getPost()
            await getComments()
        } catch (error) {

        }
    }
    const getPost = async () => {
        try {
            const response = await getPostById(id);
            console.log("post data: ", response.data)
            if (response.data) {
                setPost(response.data);
            }
        } catch (error) {

        }
    }

    const getComments = async () => {
        try {
            const response = await getPostComments(id, 0, 10)
            if (response.data) {
                setComments(response.data);
            }
        } catch (error) {

        }
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerRight: () => (
                <TouchableOpacity onPress={() => { }} style={{ padding: 4 }}>
                    <Image source={THREE_DOT_ICON} style={{ width: 24, height: 24, marginRight: 4 }} />
                </TouchableOpacity>
            ),
        });
    })

    const handleCreateComment = async () => {
        if (commentText.trim() === "") return;
        const response = await createComment(id, commentText)
        if (response.statusCode === 200) {
            // push comment to first
            setComments([response.data, ...comments])
            setPost({
                ...post!,
                commentCount: post!.commentCount + 1
            })
            setCommentText("")
        } else {

        }
    }

    return post &&
        <View style={{ height: '100%' }}>
            <ScrollView style={{ flex: 1 }}>
                <CardContainer>
                    <View style={{ flexDirection: 'column', paddingHorizontal: 20, paddingTop: 10 }}>
                        <ProfileHeader>
                            {post.user.profileImage !== undefined && (
                                <ProfileImage source={{ uri: post.user.profileImage }} />
                            )}
                            <FullName>{post.user.fullName}</FullName>
                            <Text style={{ marginBottom: 20 }}>  . </Text>
                            <Text style={{ marginBottom: 12, fontSize: 8, fontWeight: '400', color: 'black' }}> {howManyTimesAgo(new Date(post.createdAt))}</Text>
                        </ProfileHeader>
                        <Description>
                            {post?.description}
                        </Description>
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
                            <TouchableOpacity onPress={() => { }}>
                                <Image source={COMMENT_ICON} style={{ width: 16, height: 16 }} />
                            </TouchableOpacity>
                            <View style={{ flex: 1 }} />
                            <TouchableOpacity onPress={() => {
                                // handleSavePost(post.id)
                            }} style={{}}>
                                <SaveIcon color={post.isSaved ? 'black' : 'white'} />
                            </TouchableOpacity>
                        </Footer>

                    </View>

                </CardContainer>
                <HorizontalDivider color="gray" />
                <CommentsHeader >
                    <Text style={{ color: 'black' }}>Comments</Text>
                    <Text style={{ color: 'black' }}>Most Relevant</Text>
                </CommentsHeader>
                <HorizontalDivider color="gray" />
                <Comments comments={comments} />

            </ScrollView>
            <TextInputArea>
                <UserImage source={{ uri: currentUser?.profileImage }} />
                <TextInput placeholder="Add a comment..." value={commentText} onChangeText={(value) => {
                    setCommentText(value)
                }} style={{ color: 'black' }} placeholderTextColor={'black'} />
                <SendButton onPress={() => {
                    handleCreateComment()
                }}>
                    <Image source={SEND_ICON} style={{ width: 20, height: 20 }} />
                </SendButton>
            </TextInputArea>
        </View>
}
const TextInputArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
`
const TextInput = styled.TextInput`
    flex:1;
    margin-left: 12px;
    height: 40px;
    font-size: 16px;
    border-color: gray;
    border-width: 1px;
    border-radius: 12px;
    font-size: 12px;
    padding-left: 12px;
`
const UserImage = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 50px;
`
const SendButton = styled.TouchableOpacity`
    width: 26px;
    height: 26px;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    border-radius: 12px;
`
const CardContainer = styled.View`
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
const CommentsHeader = styled.View`
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
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
export default PostDetail;