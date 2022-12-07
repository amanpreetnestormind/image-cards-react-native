import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
var ImagePicker = require("react-native-image-picker");
import ImageZoom from "react-native-image-pan-zoom";

export default function App() {
  //#region
  /**
   * Space for variable or state declaration
   */
  const [response, setResponse] = useState([
    {
      index: 0,
      file: {},
      id: null,
    },
  ]);

  //#endregion

  //#region
  // Space for methods declaration
  /**
   *
   * @param {*} itemIndex
   * @method onButtonPress
   * @description to read image from device gallery
   */

  const onButtonPress = async (itemIndex) => {
    try {
      // code for get user permission to access gallery

      // const granted = await Platform.OS === "android" && PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.CAMERA,
      //   {
      //     title: 'App Camera Permission',
      //     message: 'App needs access to your camera ',
      //     buttonNeutral: 'Ask Me Later',
      //     buttonNegative: 'Cancel',
      //     buttonPositive: 'OK',
      //   },
      // )

      /**
       * @description lounch image gallery and select image
       */
      ImagePicker.launchImageLibrary(
        {
          mediaType: "photo",
          includeBase64: true,
          quality: 1,
        },
        (resp) => {
          if (!resp.didCancel)
            setResponse((oldState) => {
              const isExist = oldState.findIndex((x) => x.index == itemIndex);
              let newArr = [...response];
              if (isExist != -1) {
                newArr[isExist] = { ...resp, index: itemIndex };
              } else {
                newArr.push({ ...resp, index: itemIndex });
              }
              return [...newArr];
            });
        }
      );
    } catch (err) {
      console.warn(err);
    }
  };

  /**
   *
   * @param {*} index
   * @param {*} text
   * @method renderImage
   * @description to render image on UI
   * @returns
   */

  const renderImage = (index, text) => {
    return response?.map((m, i) => {
      if (m.index === index) {
        return (
          <ImageZoom
            key={i}
            onClick={() => {
              onButtonPress(index);
            }}
            cropWidth={Dimensions.get("screen").width / 2 - 10}
            cropHeight={Dimensions.get("screen").height / 2 - 50}
            imageHeight={Dimensions.get("screen").height / 2 - 50}
            imageWidth={Dimensions.get("screen").width / 2 - 10}
          >
            <Image
              key={i}
              source={{ uri: `data:image/jpeg;base64,${m.base64}` }}
              resizeMode="cover"
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: 20,
                borderWidth: 1,
              }}
            />
          </ImageZoom>
        );
      }
      return false;
    });
  };
  //#endregion

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          paddingTop: 40,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          key={"A"}
          onPress={() => {
            onButtonPress(1);
            // for(var i=0;i<=response?.length;i++){
            //   if(response[i]?.index===1){
            //     response[i].id=0
            //     response[i].index=1
            //     response[i].file=D
            //   }
            // }
          }}
          style={{
            borderWidth: 1,
            height: Dimensions.get("screen").height / 2 - 50,
            width: Dimensions.get("screen").width / 2 - 10,
            marginBottom: 20,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {renderImage(1, "A")}

          {/* {A[0]?.bool==true  ?<Text>A</Text>:""} */}
        </TouchableOpacity>
        <TouchableOpacity
          key={"B"}
          onPress={() => {
            onButtonPress(2);
          }}
          style={{
            borderWidth: 1,
            height: Dimensions.get("screen").height / 2 - 50,
            marginBottom: 20,
            width: Dimensions.get("screen").width / 2 - 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {renderImage(2, "B")}
          {/* {B ?<Text>B</Text>:""} */}
        </TouchableOpacity>
        <TouchableOpacity
          key={"C"}
          onPress={() => {
            onButtonPress(3);
          }}
          style={{
            borderWidth: 1,
            height: Dimensions.get("screen").height / 2 - 50,
            marginBottom: 20,
            width: Dimensions.get("screen").width / 2 - 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {renderImage(3, "C")}
          {/* {C ?<Text>C</Text>:""} */}
        </TouchableOpacity>
        <TouchableOpacity
          key={"D"}
          onPress={() => {
            onButtonPress(4);
          }}
          style={{
            borderWidth: 1,
            height: Dimensions.get("screen").height / 2 - 50,
            marginBottom: 20,
            width: Dimensions.get("screen").width / 2 - 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {renderImage(4, "D")}
          {/* {D ?<Text>D</Text>:""} */}
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
});
