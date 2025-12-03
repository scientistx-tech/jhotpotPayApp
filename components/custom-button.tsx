import { useThemeColor } from "@/hooks/use-theme-color"
import { ActivityIndicator, StyleProp, Text, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native"

export type CustomButtonProps = TouchableOpacityProps & {
    isLoading?: boolean
    title: string
    style?: StyleProp<ViewStyle>
}

const CustomButton = (props: CustomButtonProps) => {
    const tinColor = useThemeColor({}, "tint")
    const { isLoading, title, disabled, style, ...rest } = props

    const baseStyle: ViewStyle = {
        backgroundColor: tinColor,
        height: 50,
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center",
        width: '100%'
    }

    return (
        <TouchableOpacity {...rest} disabled={isLoading || disabled} style={[baseStyle, style]}>
            {isLoading ? (
                <ActivityIndicator color={"#fff"} />
            ) : (
                <Text style={{ color: "#fff", fontSize: 20 }}>{title}</Text>
            )}
        </TouchableOpacity>
    )
}

export default CustomButton