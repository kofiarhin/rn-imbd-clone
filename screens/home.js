import React, { useState, useEffect} from "react"
import {

            SafeAreaView,
            View,
            Text,
            StyleSheet,
            TouchableOpacity
} from "react-native"

import Axios from "axios"
import { Trending} from "../components/Trending/Trending"

import FontAwesome from "react-native-vector-icons/FontAwesome";

import { fontSize  } from "../constants/utils"


export const Home = (props)  => {

        let [movies, setMovies ] = useState([])


        // get movies
        useEffect(() => {
                const url = `https://api.themoviedb.org/3/trending/all/day?api_key=ca357c71903c409f2ce08d61e75700a6&page=1`;

        Axios.get(url).then( result => {
              let  movies = result.data.results;

            setMovies(movies)
        })

        }, [])

   function renderTrending (){

            return <Trending movies={movies} {...props} /> 
   }
    return <SafeAreaView style={styles.container}>
        
        {/* trending */}
              <View> 

                    { movies.length > 0  ? renderTrending() : null}
              </View>

              {/*  */}

              <View style={[styles.container, 
                {flexDirection: "row", 
                alignItems: "center", 
                justifyContent:"space-between",
                paddingVertical: 20
                }]}> 
                  <Text style={{
                      fontSize: fontSize.small,
                  }}>Browse Trailers and Vidoes</Text>


                  <TouchableOpacity onPress={() => props.navigation.push("Trailers")}> 
                      <FontAwesome name="angle-right" size={fontSize.medium} />
                  </TouchableOpacity>
              </View>


    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    }
})