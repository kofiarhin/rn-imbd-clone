import React from "react"
import {

            SafeAreaView,
            View,
            Text,
            Button
} from "react-native"

export const Movies = ({ navigation })  => {

    return <SafeAreaView>
        
                <Text
                style={{
                    fontSize: 20,
                    textAlign: "center"
                }}
                > Movies Screen </Text>
                <Button title="Go To Details"  onPress={()  => navigation.navigate("MovieDetail") } />
    </SafeAreaView>
}