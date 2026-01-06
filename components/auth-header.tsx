import { useThemeColor } from "@/hooks/use-theme-color";
import { FontAwesome6 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, TouchableOpacity, View } from "react-native";
const statusBarHeight = Constants.statusBarHeight;

export type AuthHeaderProps = NativeStackHeaderProps & {
    isBack?: boolean;
};

function AuthHeader(props: AuthHeaderProps) {
    const tinColor = useThemeColor({}, "tint")
    const router = useRouter()
    return (
        <View style={[, styles.container, { backgroundColor: tinColor }]}
        >
            <StatusBar backgroundColor="white" style="dark" />
            <View style={{ height: statusBarHeight }} />

            {props.isBack && (
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={tinColor} />
                </TouchableOpacity>
            )}

            <View style={styles.topBox}>
                <FontAwesome6 name="circle-user" size={40} color={tinColor} />
            </View>
        </View>
    )
}

export default AuthHeader

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            height: 8,
            width: 8
        },
        shadowOpacity: 6,
        shadowRadius: 10,
        elevation: 6,
        height: 150,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
    }
    ,
    backBtn: {
        borderRadius: 30,
        height: 35,
        width: 35,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 12,
        top: 12,
    },
    topBox: {
        height: 120,
        width: 120,
        borderRadius: 60,
        shadowColor: '#000',
        shadowOffset: { height: 8, width: 8 },
        shadowOpacity: 6,
        shadowRadius: 10,
        backgroundColor: '#fff',
        elevation: 6,
        position: 'absolute',
        top: 80,
        left: '50%',
        transform: [{ translateX: -60 }],
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})