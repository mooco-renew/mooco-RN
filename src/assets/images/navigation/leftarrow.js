import React from "react";
import { SvgXml } from "react-native-svg";

const logo = `
<svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.63748 0.388086C8.14998 -0.0994141 7.36248 -0.0994141 6.87498 0.388086L1.13748 6.12559C0.649976 6.61309 0.649976 7.40059 1.13748 7.88809L6.87498 13.6256C7.36248 14.1131 8.14998 14.1131 8.63748 13.6256C9.12498 13.1381 9.12498 12.3506 8.63748 11.8631L3.78748 7.00059L8.63748 2.15059C9.11248 1.66309 9.11248 0.863086 8.63748 0.388086Z" fill="white"/>
</svg>
`;

const svg = () => {
  const LeftArrowSvg = () => <SvgXml xml={logo} width="9px" height="13px" />;
  return <LeftArrowSvg />;
};

export default svg;