import { Image, Text, View } from "react-native"
import { NO_COMMENT_ICON } from "../../../../features/constants/image_constants"
import CommentItem from "./CommentItem"
import { CommentModel } from "../models/comment_model"

const Comments = ({ comments }: { comments: CommentModel[] }) => {
    return comments && comments.length > 0 ? comments.map((comment, index) => (
        <CommentItem comment={comment} key={index} />
    )) : <View style={{ flex: 1, alignItems: 'center', paddingVertical: 30 }}>
        <Image source={NO_COMMENT_ICON} style={{ height: 80, width: 80 }} />
        <Text style={{ color: 'black', fontSize: 16 }}>
            No Comments, yet
        </Text>
    </View>
}

export default Comments