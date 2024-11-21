import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const IconSymbol = (
  props: React.ComponentProps<typeof MaterialIcons>
) => {
  const { color, size, name, style, onPress } = props;
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={name}
      style={style}
      onPress={onPress}
    />
  );
};
