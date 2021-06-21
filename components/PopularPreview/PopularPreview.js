import React, {useState, useEffect} from 'react';
import {View, Text, Animated, Image, TouchableOpacity} from 'react-native';
import Axios from 'axios';
import {defaultImage, imagePrefix} from '../../constants/utils';

export const PopularPreview = ({navigation}) => {
  const [movies, setMovies] = useState([]);

  // get popular movies
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=ca357c71903c409f2ce08d61e75700a6&language=en-US&page=2`;

    Axios.get(url).then(response => {
      const movies = response.data.results;

      setMovies(movies);
    });
  }, []);
  return (
    <View>
      <Animated.ScrollView
        pagingEnabled={true}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        horizontal>
        {/* render data here */}

        {movies.map(movie => {
          // gen poster url
          const posterUrl = `${imagePrefix}${movie.poster_path}`;
          return (
            <View key={movie.id}>
              {/* navigate to movies detail to play trailer */}
              <TouchableOpacity
                onPress={() => navigation.navigate('MovieDetail', {...movie})}>
                <Image
                  source={{uri: posterUrl}}
                  style={{
                    width: 150,
                    height: 200,
                    marginRight: 5,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};
