import raw from "./logos.json";

export interface Logo {
  n: string;
  c: string;
  m: 0 | 1;
  svg: string;
}
export interface LogoGroup {
  group: string;
  items: Logo[];
}

export const LOGOS = raw as LogoGroup[];
