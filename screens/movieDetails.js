import React, { useEffect, useState} from "react"
import {

            SafeAreaView,
            View,
            Text,
            Button
} from "react-native";
import YouTube from "react-native-youtube"

import Axios from "axios"

export const MovieDetail = ({ navigation, route})  => {

    const {id, title, posterUrl, backdropUrl } = route.params;

    // get videos
    const [trailerId, setTrailerId ] = useState("")


    // get video
    useEffect(() => {

                const url =`https://api.themoviedb.org/3/movie/${id}/videos?api_key=ca357c71903c409f2ce08d61e75700a6&language=en-US`


                Axios.get(url).then( response => {

                        if(response.data.results.length > 0 ) {

                                const trailerId = response.data.results[1].key;
                                setTrailerId(trailerId)

                        }
                })
    }, [])

    return <SafeAreaView>  

           

               
                {/* youtube trailer */}
                <YouTube
                videoId={trailerId} // The YouTube video ID
                play // control playback of video with true/false
                loop // control whether the video should loop when ended
                //   onReady={e => this.setState({ isReady: true })}
                //   onChangeState={e => this.setState({ status: e.state })}
                //   onChangeQuality={e => this.setState({ quality: e.quality })}
                //   onError={e => this.setState({ error: e.error })}
                style={{ alignSelf: 'stretch', height: 300 }}
                />

                {/*  title  */}
                <Text style={{
                    fontSize: 20,
                    textAlign: "center"
                }}> {title} </Text>

                {/* trailer id */}

                {/* go back */}
                <Button title="Go Back" onPress={() => navigation.goBack()} />
    </SafeAreaView>
}