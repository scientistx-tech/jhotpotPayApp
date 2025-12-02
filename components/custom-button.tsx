import { useThemeColor } from "@/hooks/use-theme-color"
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from "react-native"

export type CustomButtonProps = TouchableOpacityProps & {
    isLoading?: boolean
    title: string
}

const CustomButton = (props: CustomButtonProps) => {
    const tinColor = useThemeColor({}, "tint")
    return (
        <TouchableOpacity {...props} disabled={props.isLoading || props.disabled} style={{
            backgroundColor: tinColor, flex: 1,
            height: 50,
            borderRadius: 35,
            justifyContent: "center",
            alignItems: "center"
        }}>
            {props.isLoading ? (<ActivityIndicator color={"#fff"} />) : (
                <Text style={{
                    color: "#fff",
                    fontSize: 20
                }}>{props.title}</Text>
            )}
        </TouchableOpacity>
    )
}

export default CustomButton