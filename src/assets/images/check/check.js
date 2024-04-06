import React from "react";
import { SvgXml } from "react-native-svg";

const check = `
<svg width="400px" height="400px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000">
<g transform="translate(0, -5)">
<path d="M11.0057 6C7.68883 6 5 8.68629 5 12C5 15.3137 7.68883 18 11.0057 18C13.0879 18 14.9226 16.9413 16 15.3333" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/> <path d="M18 7.41429L11.9142 13.5001" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/> <path d="M9.5 11.5L11.9142 13.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/></g>
</svg>
`;

const svg = () => {
  const CheckSvg = () => <SvgXml xml={check} width="36px" height="36px" />;
  return <CheckSvg />;
};

export default svg;
