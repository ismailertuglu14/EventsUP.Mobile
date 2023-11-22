import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PersonIcon(props: any) {
    return (
        <Svg width={18} height={18} fill="#3ac26b" {...props}>
            <Path d="M13 17v-3c0-1.057-.234-2.06-.654-2.958A5 5 0 0118 16v1h-5zm0-7a2 2 0 110-4 2 2 0 010 4zM6 8a6 6 0 016 6v3H0v-3a6 6 0 016-6zm0-1a3 3 0 110-6 3 3 0 010 6z" />
        </Svg>
    )
}

export default PersonIcon
