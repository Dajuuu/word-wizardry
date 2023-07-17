import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
const CustomHeader = ({ title, onLeftButtonPress, onRightButtonPress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.leftButton} onPress={onLeftButtonPress}>
        <Icon name="arrow-left" style={[styles.buttonIcon]} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.rightButton} onPress={onRightButtonPress}>
        <Icon name="cog" style={[styles.buttonIcon]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  leftButton: {
    marginRight: 10,
    paddingVertical: 5,
  },
  rightButton: {
    marginLeft: 10,
    paddingVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
});

export default CustomHeader;
