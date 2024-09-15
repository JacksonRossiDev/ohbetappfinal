import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import { moderateScale } from "react-native-size-matters";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase/compat/app";







const CustomHeader = ( props, {navigation} ) => {
  const navigate = useNavigation();
  const [user, setUser] = useState(null);


  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser?.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUser(snapshot.data());
          console.log(snapshot.data())

        } else {
          console.log("does not exist3");
        }
      });
}, [firebase.auth().currentUser?.uid]);









  return (
    // <View style={styles.navBar}>
      
        
    //     {/* <Text style={styles.navBtnLabel}>{name}</Text> */}
    //     <Image style = {{width: 100, height: 30,}}source={require('../../assets/ohbetpls.png')} />
    //     <View style={styles.creditBalance}>
    //     <Text >{user?.creditBalance}</Text>
    //     </View>
      
    //   {/* <TouchableOpacity
    //         activeOpacity={0.8}
    //         style={styles.navBtn}
    //         onPress={() => navigate.goBack(null)}
    //       >
    //     <Ionicons name="chatbubble-ellipses" color={"white"} size={20} />
    //   </TouchableOpacity> */}
      
    // </View>

    <View style={styles.navBar}>
      <View >
        


        {/* <Text style={styles.navBtnLabel}>{name}</Text> */}

        <Image style = {{width: 100, height: 30,}}source={require('../../assets/ohbetpls.png')} />
      </View>
       <TouchableOpacity
            activeOpacity={0.8}
            style={{alignSelf: "center",
            position: "absolute",
            right: 5,
            flexDirection: "row",
          }}
          onPress={() =>
            props.navigation.navigate("Profile")}
          >
        <Text style={{paddingTop:4, marginRight:2, color:'white'}}>{user?.creditBalance}</Text>
        <Ionicons style={{float:'right'}}name="radio-button-on-sharp" color={"white"} size={25} />
      </TouchableOpacity> 
     
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: moderateScale(20, 0.1),
    height: moderateScale(48, 0.1),
    backgroundColor: "#36d8ff",
  },


  navBtnWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  navBtn: {
    backgroundColor: "#36d8ff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(15, 0.1),
    width: moderateScale(30, 0.1),
    height: moderateScale(30, 0.1),
  },
  notificationsButton: {
    backgroundColor: "#36d8ff",
    justifyContent: "right",
    alignItems: "right",
    borderRadius: moderateScale(15, 0.1),
    width: moderateScale(30, 0.1),
    height: moderateScale(30, 0.1),
  },
  creditBalance: {
    justifyContent: "right",
    alignItems: "right",
    textAlign: 'right',
    marginRight:10
    
  },

  navBtnLabel: {
    fontSize: moderateScale(20, 0.1),
    marginLeft: moderateScale(10, 0.1),
    fontWeight: "500",
    color:"white"
  },
});
export default CustomHeader;