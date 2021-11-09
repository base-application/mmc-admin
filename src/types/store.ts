import { RouteRecordRaw } from "vue-router";
import { ELang } from "./common"

export interface SysState {
  loadingBar: string;
  sliderBarCollapsed: boolean;
  lang: ELang;
}
export interface UserState {
  role: Nullable<string[]>;
  token: Nullable<string>;
  id: Nullable<number>;
  routes: Nullable<RouteRecordRaw[]>
}