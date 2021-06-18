import React from 'react'
import { View, 
    Text, 
    FlatList, 
    Dimensions,
Animated } from 'react-native'

import { PreviewUnit } from "../PreviewUnit/PreviewUnit"

export const Trending = ({ movies, ...rest}) => {


    const {width, height  } = Dimensions.get("window")

    return <View> 

        <Animated.ScrollView
        
                    pagingEnabled
                    scrollEventThrottle={16}
                    snapToAlignment="center"
                    horizontal
                    showsHorizontalScrollIndicator={false}
        >     

                    {
                        movies.map( movie => {

                            return <PreviewUnit item={movie} {...rest} /> 
                        })
                    }
        </Animated.ScrollView>
        {/* <FlatList 
    
                data={movies}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {

                    return <PreviewUnit item={item} {...rest} /> 
                }}
    /> */}
    </View>
    
}


