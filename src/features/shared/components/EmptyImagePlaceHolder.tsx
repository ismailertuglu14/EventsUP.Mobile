import { GenderEnum } from "../../models/gender_enum";
import React from "react";
import { Image, ImageStyle, StyleProp } from "react-native"
import { GIRL_ICON, MAN_ICON } from "../../constants/image_constants";

/**
 * This component is used to display a placeholder image when the user has not uploaded any image
 */
const EmptyImagePlaceHolder = ({ gender, style }: { gender: GenderEnum, style?: StyleProp<ImageStyle> }) => {
    const getImageByGender = () => {
        switch (gender) {
            case GenderEnum.Male:
                return MAN_ICON;
            case GenderEnum.Female:
                return GIRL_ICON;
            case GenderEnum.Unspecified:
                return MAN_ICON;
        }
    }
    return (
        <Image source={getImageByGender()} style={[style && style, {
            height: 50,
            width: 50
        }]}
            resizeMode="cover"
        />
    )
}

export default EmptyImagePlaceHolder