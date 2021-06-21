import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import YouTube from 'react-native-youtube';

import Axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import {imagePrefix, colors} from '../constants/utils';

export const MovieDetail = ({navigation, route}) => {
  const {
    id,
    title,
    poster_path,
    backdrop_path,
    overview = '',
    ...rest
  } = route.params;

  // states
  const [trailerId, setTrailerId] = useState('');

  // get video
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=ca357c71903c409f2ce08d61e75700a6&language=en-US`;

    Axios.get(url)
      .then(response => {
        if (response.data.results.length > 0) {
          const trailerId = response.data.results[1].key;
          setTrailerId(trailerId);
        }
      })
      .catch(e => console.log('there was a problemn loading movies'));
  }, []);

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        {/* go back */}
        <TouchableOpacity>
          <Icon
            name="chevron-back-outline"
            size={30}
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 25,
            marginLeft: 20,
          }}>
          {' '}
          {title}{' '}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        {/* render header */}

        {renderHeader()}

        {/* youtube trailer */}
        <View
          style={{
            marginBottom: 20,
          }}>
          <YouTube
            videoId={trailerId} // The YouTube video ID
            play
            style={{alignSelf: 'stretch', height: 300}}
          />
        </View>

        <View
          style={{
            paddingHorizontal: 10,
          }}>
          {/* poster details */}
          <View
            style={{
              marginBottom: 20,
            }}>
            <Image
              source={{uri: `${imagePrefix}${poster_path}`}}
              style={{
                width: 150,
                height: 200,
                marginBottom: 10,
              }}
            />

            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              {' '}
              {title}{' '}
            </Text>
          </View>

          {/* overview */}

          <View
            style={{
              paddingHorizontal: 10,
              marginBottom: 20,
            }}>
            <Text
              style={{
                fontSize: 18,
                lineHeight: 25,
              }}>
              {' '}
              {overview}{' '}
            </Text>
          </View>
        </View>

        {/* save movie to profile */}

        <View
          style={{
            paddingHorizontal: 10,
          }}>
          <TouchableOpacity
            style={{
              width: '100%',
              paddingVertical: 20,
              backgroundColor: colors.primary,
              borderRadius: 15,
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
