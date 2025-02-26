import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyle from "@/constant/constant";

function DriverImage() {
  
  const [profileImage, setProfileImage] = useState();
  const [vehicleImage, setVehicleImage] = useState();

const pickProfileImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 4],
    quality: 1,
  });
  if (!result.canceled && result.assets.length > 0) {
    const uploadUrl = await uploadImageToCloudinary(result.assets[0]);
    if(uploadUrl){
      setVehicleImage(uploadUrl)
      console.log(uploadUrl);
      
    }
  }
};
const pickVehicleImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 4],
    quality: 1,
  });

  if (!result.canceled && result.assets.length > 0) {
    const uploadUrl = await uploadImageToCloudinaryV(result.assets[0]);
    if (uploadUrl) {
      setProfileImage(uploadUrl);
      console.log("uploadUrl", uploadUrl);

    }
  }
};
const uploadImageToCloudinary = async (image: any) => {
  const cloud = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUDNAME;
  if (!image.uri) return null;
  const data = new FormData();
  data.append("file", {
    uri: image.uri,
    name: `profile_${Date.now()}.jpg`,
    type: "image/jpeg",
  } as any);
  data.append("upload_preset", "Ride_Sharing");
  data.append("folder", "Ride_Sharing/Drivers");
  if (cloud) {
    data.append("cloud_name", cloud);
  } else {
    console.error("Cloudinary cloud name is not defined");
    return null;
  }
  try{

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    )
    const jsonFile = await res.json();
    return jsonFile.url
  }catch(error){
    console.error("upload", error);
    return null
   
  }
}

const uploadImageToCloudinaryV = async (image: any) => {
  const cloud = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUDNAME;
  if (!image.uri) return null;
  const data = new FormData();
  data.append("file", {
    uri: image.uri,
    name: `profile_${Date.now()}.jpg`,
    type: "image/jpeg",
  } as any);
  data.append("upload_preset", "Ride_Sharing");
  data.append("folder", "Ride_Sharing/Vehicles");
  if (cloud) {
    data.append("cloud_name", cloud);
  } else {
    console.error("Cloudinary cloud name is not defined");
    return null;
  }
  try{

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    )
    const jsonFile = await res.json();
    return jsonFile.url
  }catch(error){
    console.error("upload", error);
    return null
   
  }
}
console.log(profileImage);
console.log(vehicleImage);


  return (
    <View>

      <TouchableOpacity
        onPress={pickProfileImage}
        style={styles.imagePickerButton}
      >
        <Text style={styles.imagePickerText}>Profile Image</Text>
      </TouchableOpacity>
      {profileImage && (
        <Image source={{ uri: profileImage }} style={styles.image} />
      )}
      <TouchableOpacity
        onPress={pickVehicleImage}
        style={styles.imagePickerButton}
      >
        <Text style={styles.imagePickerText}>Pick Vehicle Image</Text>
      </TouchableOpacity>
      {vehicleImage && (
        <Image source={{ uri: vehicleImage }} style={styles.image} />
      )}
    </View>
  )
}

export default DriverImage


const styles = StyleSheet.create({
  imagePickerButton: {
    backgroundColor:`${globalStyle.blueButton.backgroundColor}`,
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 8,
  },
  imagePickerText: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 8,
  },
}
)