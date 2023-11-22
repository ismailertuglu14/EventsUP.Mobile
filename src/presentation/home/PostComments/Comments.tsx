import React, { useState, useEffect } from 'react'
import { Alert, BackHandler, Image, Text } from 'react-native'
import styled from 'styled-components/native'
import { useAppSelector } from '../../../features/redux/store'
import { SEND_ICON } from '../../../features/constants/image_constants'
import { CommentModel } from './model/comment_model'
import CommentItem from './component/CommentItem'
import { createComment, getComments } from './service/comment_service'
import { CloseKeyboard } from '../../../features/shared/keyboard/close_keyboard'
import { PostModel } from '../Feed/models/post_model'
import { useRoute } from '@react-navigation/native'

type RouteParamProps = {
    postId: string;
    setPosts: React.Dispatch<React.SetStateAction<PostModel[]>>;
}

const CommentsScreen = ({ route }: { route: any }) => {
    const { postId, setPosts } = route.params
    const currentUser = useAppSelector(state => state.currentUser.user)
    const [comments, setComments] = useState<CommentModel[]>([])
    const [commentText, setCommentText] = useState("")
    useEffect(() => {
        handleGetComments();
    }, [])

    const handleGetComments = async () => {
        var response = await getComments(postId, 0, 20);
        if (response.statusCode === 200) {
            setComments(response.data);
        }
    }

    const handleCreateComment = async () => {
        var response = await createComment(postId, commentText, undefined);
        if (response.statusCode === 200) {
            setCommentText("");
            setPosts((prev: PostModel[]) => prev.map(post => post.id === postId ? { ...post, commentCount: post.commentCount + 1 } : post))
            CloseKeyboard();
            handleGetComments()
        }
    }

    // generate random 4 digit number
    const generateRandomNumber = () => {
        return Math.floor(Math.random() * 99999) + 1000;
    }

    return (
        <Screen>
            <Header>
                <Text style={{ fontWeight: 'bold' }}>Comments</Text>
            </Header>
            <CommentList
                data={comments}
                renderItem={({ item, index }) => (
                    <CommentItem key={index} comment={item} />
                )}
                keyExtractor={() => generateRandomNumber().toString()}
            />
            <TextInputArea>
                <UserImage source={{ uri: currentUser?.profileImage }} />
                <TextInput placeholder="Add a comment..." value={commentText} onChangeText={(value) => setCommentText(value)} />
                <SendButton onPress={handleCreateComment}>
                    <Image source={SEND_ICON} style={{ width: 20, height: 20 }} />
                </SendButton>
            </TextInputArea>
        </Screen>
    )
}

const Screen = styled.View`
    flex: 1;
    justify-content: space-between;
`
const Header = styled.View`
    align-items: center;
    padding: 12px;
    border-bottom-width: 0.6px;
    border-bottom-color: black;
`
const CommentList = styled.FlatList`
    flex: 1;
`

const TextInputArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
`
const UserImage = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 50px;
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
const SendButton = styled.TouchableOpacity`
    width: 26px;
    height: 26px;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    border-radius: 12px;
`
export default CommentsScreen