// @ts-check
import React, { Component } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { DefaultTheme } from "@react-navigation/native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import firebase from "firebase/compat/app";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchUser,
  fetchUserPosts,
  fetchUserFollowing,
  clearData,
} from "../redux/actions/index";

import FeedScreen from "./main/Feed";
import ProfileScreen from "./main/Profile";
import SearchScreen from "./main/Search";
import UserMatch from "./main/userMatch";
import Add from "./main/Add";
import UserMatch2 from "./main/userMatch2";

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
  return null;
};

export class Main extends Component {
  componentDidMount() {
    this.props.clearData();
    this.props.fetchUser();
    this.props.fetchUserFollowing();

    this.props.fetchUserPosts();
  }
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Feed"
        labeled={false}
        activeColor="#36d8ff"
        inactiveColor="#36d8ff80"
        barStyle={{ backgroundColor: "white" }}
      >
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={{
            tabBarIcon: (
              { color } // ({ color, size })
            ) => <MaterialCommunityIcons name="home" color={color} size={26} />,
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          navigation={this.props.navigation}
          options={{
            tabBarIcon: (
              { color } // ({ color, size })
            ) => (
              <MaterialCommunityIcons name="magnify" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="userMatch2"
          component={UserMatch2}
          navigation={this.props.navigation}
          options={{
            tabBarIcon: (
              { color } // ({ color, size })
            ) => (
              <MaterialCommunityIcons name="camera" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="userMatch"
          component={UserMatch}
          navigation={this.props.navigation}
          options={{
            tabBarIcon: (
              { color } // ({ color, size })
            ) => (
              <MaterialCommunityIcons name="plus-box" color={color} size={26} />
            ),
          }}
        />
        
        {/* <Tab.Screen
          name="AddContainer"
          component={EmptyScreen}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("Add");
            },
          })}
          options={{
            tabBarIcon: (
              { color } // ({ color, size })
            ) => (
              <MaterialCommunityIcons name="plus-box" color={color} size={26} />
            ),
          }}
        /> */}
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("Profile", {
                uid: firebase.auth().currentUser?.uid,
              });
            },
          })}
          options={{
            tabBarIcon: (
              { color } // ({ color, size })
            ) => (
              <MaterialCommunityIcons
                name="account-circle"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    { fetchUser, fetchUserPosts, fetchUserFollowing, clearData },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(Main);
