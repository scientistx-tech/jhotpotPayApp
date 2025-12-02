import { useThemeColor } from "@/hooks/use-theme-color";
import Ionicons from '@expo/vector-icons/Ionicons';
import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";
const statusBarHeight = Constants.statusBarHeight;

export type AuthHeaderProps = NativeStackHeaderProps & {
    isBack?: boolean;
};

function AuthHeader(props: AuthHeaderProps) {
    const tinColor = useThemeColor({}, "tint")
    const router = useRouter()
    return (
        <View style={[, styles.container, { backgroundColor: tinColor }]}>
            <StatusBar style="light" />
            <View style={{ height: statusBarHeight }}></View>
            {props.isBack && (
                <TouchableOpacity onPress={() => router.back()} style={{
                    borderRadius: 30,
                    height: 35,
                    width: 35,
                    backgroundColor: "#fff",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Ionicons name="arrow-back" size={24} color={tinColor} />
                </TouchableOpacity>
            )}
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
})