import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
} from 'react-native';

import Axios from 'axios';

import {defaultImage, imagePrefix} from '../constants/utils';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';

export const Movies = ({navigation}) => {
  const [movies, setMovies] = useState([]);
  const {width, height} = Dimensions.get('window');

  // use ref
  let [page, setPage] = useState(1);

  let [isLoading, setIsLoading] = useState(true);

  //  get movies
  useEffect(() => {
    // get movies
    const url = `https://api.themoviedb.org/3/trending/all/day?api_key=ca357c71903c409f2ce08d61e75700a6&page=${page}`;

    Axios.get(url).then(response => {
      const movies = response.data.results;

      setMovies(movies);
      setIsLoading(false);
    });
  }, []);

  function renderHeader() {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <Text
          style={{
            fontSize: 25,
          }}>
          Popular Movies
        </Text>
      </View>
    );
  }
  return (
    <SafeAreaView>
      {/* render  header */}

      {renderHeader()}

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={item => item.id}
          key={'_'}
          numColumns={2}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  width: width * 0.5,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}>
                {/* cover */}
                <ImageBackground
                  source={{uri: `${imagePrefix}${item.poster_path}`}}
                  style={{
                    width: '100%',
                    height: 250,
                    marginBottom: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('MovieDetail', {...item})
                    }>
                    <Icon name="play-circle-outline" size={50} color="white" />
                  </TouchableOpacity>
                </ImageBackground>

                {/* movie title */}
                <Text style={styles.title}> {item.title} </Text>
              </View>
            );
          }}
          onEndReached={() => {
            page += 1;
            setIsLoading(true);
            // get movies
            const url = `https://api.themoviedb.org/3/trending/all/day?api_key=ca357c71903c409f2ce08d61e75700a6&page=${page}`;

            Axios.get(url).then(response => {
              const newMovies = response.data.results;

              console.log(page);

              setMovies([...movies, ...newMovies]);
              setPage(page);
              setIsLoading(false);
            });
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    marginBottom: 20,
  },
});
