import React from "react";
import { Dimensions } from "react-native";
import { scale } from "react-native-size-matters";
export const {width, height}  = Dimensions.get("screen")
export const AppScreenWidth = width -scale(20)