import type { CSSProperties } from "react";
import bgDesktop from "../assets/images/bg-desktop.png";
import bgMobile from "../assets/images/bg-mobile.png";

export const brandBackdropVars = {
  "--bg-color": "#0c1f3d",
  "--bg-desktop": `url(${bgDesktop})`,
  "--bg-mobile": `url(${bgMobile})`,
} as CSSProperties;
