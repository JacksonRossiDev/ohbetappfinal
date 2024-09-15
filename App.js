// @ts-check
import React, { Component } from "react";
import { View, Text } from "react-native";
import firebase from "firebase/compat/app";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
import PartyScreen from "./components/main/PartyScreen";

const store = createStore(rootReducer, applyMiddleware(thunk));

// const firebaseConfig = {
//   apiKey: "AIzaSyDWXIQflgUob2knhhszWmiU0itA2IB5AXI",
//   authDomain: "instagram-dev-b8e26.firebaseapp.com",
//   projectId: "instagram-dev-b8e26",
//   storageBucket: "instagram-dev-b8e26.appspot.com",
//   messagingSenderId: "194724470314",
//   appId: "1:194724470314:web:6a58f080f97f193ef26d53",
//   measurementId: "G-2S84D1CQMT"
// };
// const firebaseConfig = {
//   apiKey: "AIzaSyDlcV13VXhql2C9-ORMPsj5oXAAu7Lk4q0",
//   authDomain: "freightloopfinal.firebaseapp.com",
//   projectId: "freightloopfinal",
//   storageBucket: "freightloopfinal.appspot.com",
//   messagingSenderId: "400986897636",
//   appId: "1:400986897636:web:84e65d8355ebfab5f340f1",
//   measurementId: "G-WHX61WE7E8",
// };
const firebaseConfig = {
  apiKey: "AIzaSyBbcBZZL8KRb521O5IklU3dpM6Ze4DSe90",
  authDomain: "ohbet-8d4b3.firebaseapp.com",
  projectId: "ohbet-8d4b3",
  storageBucket: "ohbet-8d4b3.appspot.com",
  messagingSenderId: "965970461687",
  appId: "1:965970461687:web:689b5c6d33f20a8b4c64f2",
  measurementId: "G-9K19GV4EZ2"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import MainScreen from "./components/Main";
import AddScreen from "./components/main/Add";
import SaveScreen from "./components/main/Save";
import SaveScreen2 from "./components/main/Save2";
import CommentScreen from "./components/main/Comment";
import PrePartyScreen from "./components/main/PrePartyScreen";

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading</Text>
        </View>
      );
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store={store}>
        <NavigationContainer
          theme={{
            ...DefaultTheme,
            colors: {
              secondaryContainer: "transparent",
            },
          }}
        >
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
              name="Home"
              component={MainScreen}
              options={{ headerShown: false }}
            />
            {/* //TODO navigation or options? */}
            <Stack.Screen
              name="Add"
              component={AddScreen}
              options={this.props.navigation}
            />
            <Stack.Screen
              name="Save"
              component={SaveScreen}
              options={this.props.navigation}
            />
            <Stack.Screen
              name="Save2"
              component={SaveScreen2}
              options={this.props.navigation}
            />
            <Stack.Screen
              name="PartyScreen"
              component={PartyScreen}
              options={this.props.navigation}
            />
            
            <Stack.Screen
              name="PrePartyScreen"
              component={PrePartyScreen}
              options={this.props.navigation}
            />
            <Stack.Screen
              name="Comment"
              component={CommentScreen}
              options={this.props.navigation}
            />
            
            
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
