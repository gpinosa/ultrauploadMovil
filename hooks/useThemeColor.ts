export type ColorName = 'text' | 'background' | 'tint' | 'tabIconDefault' | 'tabIconSelected';

const Colors = {
  light: {
    text: 'black',
    background: 'white',
    tint: 'blue',
    tabIconDefault: 'gray',
    tabIconSelected: 'blue',
  },
  dark: {
    text: 'white',
    background: 'black',
    tint: 'lightblue',
    tabIconDefault: 'lightgray',
    tabIconSelected: 'lightblue',
  },
};

export function useColorScheme(): 'light' | 'dark' {
  //Implementation to determine light or dark mode
  return 'light'; //Replace with actual implementation
}

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ColorName
): string {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }

  return Colors[theme][colorName] || Colors.light[colorName];
}

