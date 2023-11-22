import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SaveIcon(props: any) {
    return (
        <Svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width={props.width ?? 20} height={props.height ?? 20} {...props} strokeWidth={1} stroke='black'>
            <Path d="M17 3H7a3.07 3.07 0 00-3 3.12v12.82a2 2 0 001.4 2 1.93 1.93 0 002.12-.62l4.48-4 4.48 4A1.94 1.94 0 0018 21a1.86 1.86 0 00.61-.1 2 2 0 001.4-2V6.12A3.07 3.07 0 0017 3z" fill={props.color ?? 'white'} />
        </Svg>
    )
}

export default SaveIcon
