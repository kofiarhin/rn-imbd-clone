import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Axios from 'axios';
import {Trending} from '../components/Trending/Trending';
import {FeaturedPreview} from '../components/featuredPreview/featuredPreview';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {fontSize} from '../constants/utils';

export const Home = props => {
  let [movies, setMovies] = useState([]);

  // get movies
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/trending/all/day?api_key=ca357c71903c409f2ce08d61e75700a6&page=1`;

    Axios.get(url).then(result => {
      let movies = result.data.results;

      setMovies(movies);
    });
  }, []);

  function renderTrending() {
    return <Trending movies={movies} {...props} />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* trending */}
        <View>{movies.length > 0 ? renderTrending() : null}</View>

        {/*  Browse trailer*/}

        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Movies')}
            style={[
              styles.container,
              {
                flexDirection: 'row',
                paddingVertical: 20,
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}>
            <Text
              style={{
                fontSize: fontSize.small,
              }}>
              Browse Trailers and Vidoes
            </Text>

            <FontAwesome name="angle-right" size={fontSize.medium} />
          </TouchableOpacity>
        </View>
        {/* end browse trailer */}

        {/* featured today */}

        <View style={styles.container}>
          <Text
            style={{
              fontSize: 25,
              marginBottom: 20,
              fontWeight: 'bold',
            }}>
            Featured Today
          </Text>

          {/* list of movies  */}
          <FeaturedPreview {...props} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
