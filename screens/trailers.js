import React, { useEffect, useState} from 'react'
import { View, Text, SafeAreaView, FlatList, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native'

import Axios from "axios"

import { defaultImage, imagePrefix} from "../constants/utils"

import FontAwesome from "react-native-vector-icons/FontAwesome"
import Icon from "react-native-vector-icons/Ionicons"

export const Trailers = ({ navigation}) => {

    const [movies, setMovies] = useState([]);

    // use ref
     let [page, setPage ] = useState(1)

     let [isLoading, setIsLoading ] = useState(true)

    //  get movies
    useEffect(() => {

            // get movies
                const url = `https://api.themoviedb.org/3/trending/all/day?api_key=ca357c71903c409f2ce08d61e75700a6&page=${page}`;

                Axios.get(url).then( response => {

                    const movies = response.data.results;

                            setMovies(movies)
                            setIsLoading(false)
                })
    }, [])

    function renderHeader() {

        return <View style={{
            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20
        }}>    

        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={40} style={{
    marginRight: 20
}} />
        </TouchableOpacity>

        <Text style={{
            fontSize: 25
        }}> Trailers </Text>          
        </View>
    }
    return (
        <SafeAreaView>

            {/* render  header */}

             { renderHeader()}

              {
                  isLoading ? <ActivityIndicator/> :   <FlatList  
                
                        data={movies}

                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => {


                            return   <View style={{
                                paddingHorizontal: 20
                            }}> 


                    <ImageBackground source={{uri: `${imagePrefix}${item.poster_path}` }} style={{
                    width: "100%",
                    height: 300,
                    marginBottom: 20,
                    alignItems: "center",
                    justifyContent: "center"
                }}> 

                        <TouchableOpacity onPress={() => navigation.navigate("MovieDetail", {...item})}>
                            <Icon name="play-circle-outline" size={50} color="white" />
                        </TouchableOpacity>
                </ImageBackground>
                            </View>

                        }}

                        onEndReached={() => {
                                     page +=1;
                                     setIsLoading(true)
                                     // get movies
                const url = `https://api.themoviedb.org/3/trending/all/day?api_key=ca357c71903c409f2ce08d61e75700a6&page=${page}`;

                Axios.get(url).then( response => {

                    const newMovies = response.data.results;

                    console.log(page)

                            setMovies([...movies, ...newMovies])
                            setPage(page)
                            setIsLoading(false)
                })


                        }}
                />
              }
        </SafeAreaView>
    )
}


 