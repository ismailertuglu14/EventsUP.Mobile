import React from 'react'
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native'
import styled from 'styled-components/native'

type DividerProps = {
    height?: number
    width?: number
    color?: string
    style?: StyleProp<ViewStyle>
}
export const HorizontalDivider = (props: DividerProps) => {
    return (
        <View style={[{
            backgroundColor: props.color ?? 'black',
            height: props.height ?? 0.6,
            width: props.width ?? '100%'
        }, props.style ?? props.style]} />
    )
}
