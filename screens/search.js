import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {colors, genImageUrl, width} from '../constants/utils';
import Axios from 'axios';

export const Search = ({navigation}) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/trending/all/day?api_key=ca357c71903c409f2ce08d61e75700a6&page=1`;
    Axios.get(url).then(response => {
      const movies = response.data.results;

      setMovies(movies);
    });
  }, []);

  const searchMovies = text => {
    let url = `https://api.themoviedb.org/3/search/movie?query=${text}&api_key=ca357c71903c409f2ce08d61e75700a6&language=en-US&page=1&include_adult=false`;

    Axios.get(url).then(response => {
      let movies = response.data.results;

      setMovies(movies);
    });
  };
  return (
    <SafeAreaView>
      {/* search */}
      <View
        style={{
          paddingHorizontal: 20,
        }}>
        <TextInput
          placeholder="Search Movies"
          placeholderTextColor="black"
          onChangeText={text => searchMovies(text)}
          style={{
            height: 50,
            paddingLeft: 10,
            fontSize: 15,
            backgroundColor: colors.lightGrey,
          }}
        />
      </View>

      {/* render movies */}

      <FlatList
        key={'*'}
        numColumns={2}
        data={movies}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingHorizontal: 10,
        }}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('MovieDetail', {...item})}>
              <View>
                <Image
                  source={{
                    uri: genImageUrl(item.poster_path),
                  }}
                  style={{
                    width: width * 0.5 - 20,
                    height: 250,
                    marginRight: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 20,
                  }}>
                  <Text
                    style={{
                      flex: 1,
                      flexWrap: 'wrap',
                      fontSize: 18,
                    }}>
                    {' '}
                    {item.title ? item.title : 'No title'}{' '}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        onEndReached={() => console.log('load more movies')}
      />
    </SafeAreaView>
  );
};
