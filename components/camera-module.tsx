import { Camera, CameraType } from "expo-camera";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import Constants from "expo-constants";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CameraModuleType = {
  setShowCamera: Dispatch<SetStateAction<boolean>>;
  setPhoto: Dispatch<SetStateAction<string>>;
};

export const CameraModule = ({ setShowCamera, setPhoto }: CameraModuleType) => {
  const [type, setType] = useState(CameraType.back);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef<Camera>(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePhoto = async () => {
    if (isCameraReady && cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo.uri);
      setShowCamera(false);
    }
  };

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        onCameraReady={() => setIsCameraReady(true)}
        style={styles.camera}
        type={type}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowCamera(false)}
          >
            <Text style={styles.text}>Close camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    position: "absolute",
    height: "100%",
    width: "100%",
    marginTop: Constants.statusBarHeight,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    margin: 64,
    justifyContent: "flex-end",
  },
  button: {
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
