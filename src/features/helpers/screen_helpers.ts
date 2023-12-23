import { Dimensions } from "react-native";

export const SCREEN_WIDTH = Dimensions.get("screen").width;
export const SCREEN_HEIGHT = Dimensions.get("screen").height;
export const TABLET_MIN_WIDTH = 600;


export const responsive = ({mobile, tablet}: {mobile:any, tablet: any}) => {
    if (SCREEN_WIDTH >= TABLET_MIN_WIDTH) {
        return tablet;
    }
    return mobile;
}