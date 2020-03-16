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

export type DirectionProps = {
        top?: string | number,
        left?: string | number,
        bottom?: string | number,
        right?: string | number
} 

export type FontProps = {
        fontSize: string | number;
        fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
}