import { NativeModules } from "react-native";
const { ImageColorModule } = NativeModules;

export const getDominantColor = async (source) => {
  try {
    const color = await ImageColorModule.getDominantColor(source);
    return color;
  } catch (error) {
    console.error("Error mendapatkan warna dominan:", error);
    return "#FFFFFF"; // Warna fallback
  }
};
