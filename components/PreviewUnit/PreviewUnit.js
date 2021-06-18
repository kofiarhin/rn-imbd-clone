import React from "react"

import { 
    View,
    Text,
    ImageBackground,
    Dimensions,
    Image,
    TouchableOpacity
} from "react-native"

import { defaultImage, imagePrefix} from "../../constants/utils"

import LinearGradient from "react-native-linear-gradient"

import Icon from "react-native-vector-icons/Ionicons"

export const PreviewUnit = ({ item: { id, title,  poster_path, backdrop_path, ...rest}, navigation }) => {

    console.log(navigation)
    const { width, height } = Dimensions.get("window");

    // get images

    const backdropUrl = `${imagePrefix}${backdrop_path}`;
    const posterUrl = `${imagePrefix}${poster_path}`;

    return <View key={id} style={{
        width: width
    }}>
            <ImageBackground 
            source={{uri: backdropUrl}} 
                resizeMode="cover"
            style={{
                height: 250,
                alignItems: 'center',
                justifyContent: "center"
    
            }}>
{/* refactor into a component later */}
                 <LinearGradient
                                start={{ x: 0.1, y: .6 }} end={{ x: 0.1, y: 1 }}
                                locations={[0, 9]}
                                colors={['rgba(0,0,0,.1)', 'rgba(0,0,0,1)']} 
                                style={{ position: 'absolute', 
                                top: 0, 
                                left: 0, 
                                right: 0, 
                                bottom: 0, 
                                flexDirection: 'row', 
                                borderRadius: 10,
                                alignItems: "center",
                                justifyContent: "center"
                                
                                }} >
                                

                <TouchableOpacity onPress={() => navigation.navigate("MovieDetail",{
                    id, title, posterUrl, backdropUrl
                } )}>
                    <Icon  name="play-circle-outline" size={80} color="white" /> 
                </TouchableOpacity>

                            </LinearGradient>


            </ImageBackground>
                    
                    {/* movie info */}
            <View style={{
                paddingHorizontal: 20,
                flexDirection: "row"
            }}>
                                    <Image source={{
                                        uri: posterUrl 
                                    }}  style={{
                                        width: 150,
                                        height: 200,
                                        marginTop: -100
                                    }}  />

                                    <Text style={{
                                        fontSize: 30
                                    }}> {title} </Text> 


                </View> 
        
         </View>
}