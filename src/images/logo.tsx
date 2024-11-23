import * as React from "react";
import Svg, { Defs, Circle, G, Mask, Use, Text, TSpan } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const Logo = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={props.style?.width || 80}
    height="100%"
    viewBox="0 0 367 367"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <Defs>
      <Circle id="a" cx={183.5} cy={183.5} r={183.5} />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Mask id="b" fill="#fff">
        <Use xlinkHref="#a" />
      </Mask>
      <Use xlinkHref="#a" fill="#D80000" />
      <Text
        fill="#FFF"
        stroke="#D80000"
        fontFamily="Montserrat-Regular, Montserrat"
        fontSize={500}
        mask="url(#b)"
      >
        <TSpan x={-24} y={363}>
          {"%"}
        </TSpan>
      </Text>
    </G>
  </Svg>
);
export default Logo;
