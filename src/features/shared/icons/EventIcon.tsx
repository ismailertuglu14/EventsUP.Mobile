import * as React from "react"
import Svg, { Path } from "react-native-svg"

function EventIcon(props: any) {
    return (
        <Svg width={18} height={18} fill="#ffbc00" {...props}>
            <Path d="M9.818 14.4v-2.945h2.946V9.818H9.818V6.873H8.182v2.945H5.236v1.637h2.946V14.4h1.636zm3.927-11.782V0H12.11v5.564h1.636v-1.31h2.619v12.11H1.636V4.254h1.31V2.619H0V18h18V2.618h-4.255zM5.891 4.255H10.8V2.618H5.89V0H4.256v5.564H5.89v-1.31z" />
        </Svg>
    )
}

export default EventIcon
