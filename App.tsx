import { StatusBar } from "expo-status-bar";
import {
  Button,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { CameraModule } from "./components/camera-module";
import { useState } from "react";
import { pickImage } from "./utils/pick-image";

const NO_ACC = require("./assets/noAcc.png");

export default function App() {
  const [showCamera, setShowCamera] = useState(false);
  const [photo, setPhoto] = useState("");

  const pickPhotoFromDevice = async () => {
    const photo = await pickImage();
    photo && setPhoto(photo);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.photoContainer}
        imageStyle={styles.imageStyle}
        source={photo ? { uri: photo } : NO_ACC}
      />
      <Button title="Take photo" onPress={() => setShowCamera(true)} />
      <Button title="Pick photo" onPress={pickPhotoFromDevice} />
      {showCamera && (
        <CameraModule setPhoto={setPhoto} setShowCamera={setShowCamera} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoContainer: {
    height: 100,
    width: 100,
  },
  imageStyle: {
    borderRadius: 50,
  },
});
