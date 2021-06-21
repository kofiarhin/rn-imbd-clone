import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

// screens
import {Home, Movies, MovieDetail, Search, Profile, Trailers} from '../screens';

const Tabs = createBottomTabNavigator();
const MoviesStack = createStackNavigator();

const MoviesStackScreen = () => {
  return (
    <MoviesStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MoviesStack.Screen name="Movies" component={Movies} />
    </MoviesStack.Navigator>
  );
};

// home stack
const HomeStack = createStackNavigator();
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Trailers" component={Trailers} />
      <HomeStack.Screen name="MovieDetail" component={MovieDetail} />
    </HomeStack.Navigator>
  );
};

// search stack
const SearchStack = createStackNavigator();
const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SearchStack.Screen name="Search" component={Search} />
      <SearchStack.Screen name="MovieDetail" component={MovieDetail} />
    </SearchStack.Navigator>
  );
};

const TabsScreen = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Search"
      tabBarOptions={{
        showLabel: false,
      }}>
      {/* home screen */}
      <Tabs.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />

      {/* search */}
      <Tabs.Screen
        name="Search"
        component={SearchStackScreen}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="search-outline" size={size} color={color} />
          ),
        }}
      />

      {/* movies screen */}
      <Tabs.Screen
        name="Movies"
        component={MoviesStackScreen}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="videocam-outline" size={size} color={color} />
          ),
        }}
      />

      {/* profile  */}
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const Routes = () => {
  return (
    <NavigationContainer>
      <TabsScreen />
    </NavigationContainer>
  );
};

export default Routes;
