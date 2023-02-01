import {DarkTheme, DefaultTheme, Theme} from '@react-navigation/native';
import {rfValue, rfValuePX} from '../../utils/responsive-fontsize';

export interface BovTheme extends Theme {
  colors: {
    background: string;
    border: string;
    card: string;
    notification: string;
    primary: string;
    text: string;
    thrid: string;
    cancel: string;
  };
}

export const lightTheme: BovTheme = {
  colors: {
    background: '#FFFFFF',
    border: 'transparent',
    card: '#E9F1F7',
    notification: '#44a1cb',
    primary: '#44a1cb',
    text: '#111111',
    thrid: '#b1bcc6',
    cancel: '#DF2935',
  },
  dark: false,
};

export type ThemeColors =
  | 'primary'
  | 'background'
  | 'card'
  | 'text'
  | 'border'
  | 'notification'
  | 'third';

export default {
  colors: lightTheme.colors,
  fonts: {
    headline: {
      default: `${rfValue(36)}px Montserrat_500Medium`,
      200: `${rfValue(200)}px Montserrat_400Regular`,
      144: `${rfValue(144)}px Montserrat_400Regular`,
      96: `${rfValue(96)}px Montserrat_400Regular`,
      50: `${rfValue(50)}px Montserrat_400Regular`,
      36: `${rfValue(36)}px Montserrat_500Medium`,
      24: `${rfValue(24)}px Montserrat_400Regular`,
    },
    title: `${rfValue(20)}px Montserrat_500Medium`,
    subheader: `${rfValue(18)}px Montserrat_400Regular`,
    body: `${rfValue(14)}px Montserrat_400Regular`,
    bodyMenu: `${rfValue(14)}px Montserrat_500Medium`,
    caption: `${rfValue(12)}px Montserrat_400Regular`,
  },
};
