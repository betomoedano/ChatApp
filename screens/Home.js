import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const Home = ({ navigation }) => {
    return (
        <View>
        <TouchableOpacity
            onPress={() => navigation.navigate("Chat")}
            style={{
            backgroundColor: "blue",
            padding: 10,
            margin: 10
            }}
        >
            <Text>Chat</Text>
        </TouchableOpacity>
        </View>
    );
    };

    export default Home;