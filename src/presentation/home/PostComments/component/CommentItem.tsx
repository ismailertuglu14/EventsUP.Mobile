import styled from "styled-components/native"
import { CommentModel } from "../model/comment_model";
import { howManyTimesAgo } from "../../../../features/helpers/time_helpers";
const CommentItem = ({ comment }: { comment: CommentModel }) => {
    return (
        <Container>
            {
                comment.user.profileImage && <UserImage source={{ uri: comment.user.profileImage }} />
            }
            <MessageColumn>
                <CommentMessage>{comment.message}</CommentMessage>
                <MessageDate>{howManyTimesAgo(new Date(comment.createdAt))}</MessageDate>
            </MessageColumn>
        </Container>
    )
}
const Container = styled.View`
    flex-direction: row;
    padding: 12px;
    align-items: center;
`
const UserImage = styled.Image`
    width: 36px;
    height: 36px;
    border-radius: 50px;
`
const MessageColumn = styled.View`
    width: 76%;
    flex-direction: column;
    margin-left: 12px;
`
const MessageDate = styled.Text`
    font-size: 10px;
    font-weight: 300;
    color: gray;
`
const CommentMessage = styled.Text`
    font-size: 14px;
    font-weight: 400;
`

export default CommentItem;