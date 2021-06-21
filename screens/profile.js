import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../constants/utils';
function renderHeader() {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      }}>
      {/* icon */}
      <Icon name="person-circle-outline" size={40} />

      <Text
        style={{
          fontSize: 20,
          marginLeft: 10,
        }}>
        Sign In
      </Text>
    </View>
  );
}

export const Profile = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {renderHeader()}

        {/* slug */}
        <View
          style={{
            marginBottom: 20,
          }}>
          <Text>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea ex cum
            in dignissimos perferendis odio quas reprehenderit officia possimus
            odit!
          </Text>
        </View>

        {/* cta */}
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              paddingVertical: 15,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              {' '}
              Sign in / Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
