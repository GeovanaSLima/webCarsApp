import { StyleSheet, TextInput, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {}

export function Input({ ...rest }: InputProps) {
  return <TextInput style={styles.input} {...rest} />;
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "transparent",
    marginHorizontal: 8,
    marginVertical: 2,
    borderRadius: 4,
  },
});
