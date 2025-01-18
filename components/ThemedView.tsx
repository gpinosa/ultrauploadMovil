import React from "react";
import { View, type ViewProps } from "react-native";
import { useThemeColor, ColorName } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background" as ColorName
  );

  return (
    <View
      style={[{ backgroundColor: backgroundColor as string }, style]}
      {...otherProps}
    />
  );
}
