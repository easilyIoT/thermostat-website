import { RGB } from "./colors"

export type FlexProps = {
        direction: "column" | "row",
        justify: "center" | "baseline" | "end" | "flex-start" | "flex-end" | "space-around" | "space-between" | "space-evenly",
        align: "center" | "flex-start" | "flex-end"; 
}

export type ColorProp = {
        rgb?: RGB;
}

export type GradientProp = {
        gradient?: string
}

export type MarginProps = {
        top?: string | number,
        left?: string | number,
        bottom?: string | number,
        right?: string | number
} 
