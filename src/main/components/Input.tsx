import { StyleSheet, TextInput, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {}

export function Input({...rest}: InputProps) {
  return (
    <TextInput
      style={styles.input}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#edeff3",
    padding: 12,
    borderRadius: 4,
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
  }
});