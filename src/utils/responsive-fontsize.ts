import {
  RFPercentage as rfPercentage,
  RFValue as rfValue,
} from "react-native-responsive-fontsize";

const rfValuePX = (value: number) => `${rfValue(value)}px`;

export { rfPercentage, rfValue, rfValuePX };
