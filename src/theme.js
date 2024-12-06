import { createContext,useState,useMemo } from "react";
import { createTheme} from "@mui/material";


//Tokens de diseño de color
export const tokens = (mode)=>({
    ...(mode === 'dark'
        ?{
            grey: {
                100: "#ffeaf3",
                200: "#ffd5e8",
                300: "#ffc0dc",
                400: "#ffabd1",
                500: "#ff96c5",
                600: "#cc789e",
                700: "#995a76",
                800: "#663c4f",
                900: "#331e27"
            },
            pinkAccent: {
                100: "#ffccdf",
                200: "#ff99bf",
                300: "#ff66a0",
                400: "#ff3380",
                500: "#ff0060",
                600: "#cc004d",
                700: "#99003a",
                800: "#660026",
                900: "#330013"
            },
            primary: {
                100: "#d0d1d5",
                200: "#a1a4ab",
                300: "#727681",
                400: "#434957",
                500: "#141b2d",
                600: "#101624",
                700: "#0c101b",
                800: "#080b12",
                900: "#040509"
            },
            greenAccent: {
                100: "#dbf5ee",
                200: "#b7ebde",
                300: "#94e2cd",
                400: "#70d8bd",
                500: "#4cceac",
                600: "#3da58a",
                700: "#2e7c67",
                800: "#1e5245",
                900: "#0f2922"
            },
            redAccent: {
                100: "#f8dcdb",
                200: "#f1b9b7",
                300: "#e99592",
                400: "#e2726e",
                500: "#db4f4a",
                600: "#af3f3b",
                700: "#832f2c",
                800: "#58201e",
                900: "#2c100f"
            },
        }:{
            grey: {
                100: "#331e27",
                200: "#663c4f",
                300: "#995a76",
                400: "#cc789e",
                500: "#ff96c5",
                600: "#ffabd1",
                700: "#ffc0dc",
                800: "#ffd5e8",
                900: "#ffeaf3",
            },
            pinkAccent: {
                100: "#330013",
                200: "#660026",
                300: "#99003a",
                400: "#cc004d",
                500: "#ff0060",
                600: "#ff3380",
                700: "#ff66a0",
                800: "#ff99bf",
                900: "#ffccdf",
            },
            primary: {
                100: "#040509",
                200: "#080b12",
                300: "#0c101b",
                400: "#f2f0f0",
                500: "#141b2d",
                600: "#434957",
                700: "#727681",
                800: "#a1a4ab",
                900: "#d0d1d5",
            },
            greenAccent: {
                100: "#0f2922",
                200: "#1e5245",
                300: "#2e7c67",
                400: "#3da58a",
                500: "#4cceac",
                600: "#70d8bd",
                700: "#94e2cd",
                800: "#b7ebde",
                900: "#dbf5ee",
            },
            redAccent: {
                100: "#2c100f",
                200: "#58201e",
                300: "#832f2c",
                400: "#af3f3b",
                500: "#db4f4a",
                600: "#e2726e",
                700: "#e99592",
                800: "#f1b9b7",
                900: "#f8dcdb",
            },
        }),
});

//mui theme setting
export const ThemeSetting = (mode) =>{
    const colors = tokens(mode);

    return {
        palette:{
            mode: mode,
            ...(mode ==='dark'
                ?{
                    primary: { 
                        main: colors.primary[500],
                    },
                    secondary: {
                        main: colors.greenAccent[500],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100],
                    },
                    background: {
                        default: colors.primary[500],
                    }
                }:{
                    primary: { 
                        main: colors.primary[100],
                    },
                    secondary: {
                        main: colors.greenAccent[500],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100],
                    },
                    background: {
                        default: "#fcfcfc",
                    }
                }
            )
        },
        typography:{
            fontFamily: ["Sources Code Pro", "sans-serif"].join(","),
            fontSixe: 12,
            h1:{
                fontFamily: ["Sources Code Pro", "sans-serif"].join(","),
                fontSixe: 40,
            },
            h2:{
                fontFamily: ["Sources Code Pro", "sans-serif"].join(","),
                fontSixe:  32,
            },
            h3:{
                fontFamily: ["Sources Code Pro", "sans-serif"].join(","),
                fontSixe: 24,
            },
            h4:{
                fontFamily: ["Sources Code Pro", "sans-serif"].join(","),
                fontSixe: 20,
            },
            h5:{
                fontFamily: ["Sources Code Pro", "sans-serif"].join(","),
                fontSixe: 16,
            },
            h6:{
                fontFamily: ["Sources Code Pro", "sans-serif"].join(","),
                fontSixe: 14,
            },
            h7:{
                fontFamily: ["Sources Code Pro", "sans-serif"].join(","),
                fontSixe: 12,
            }
        }
    }
}

//Contexto de tema
export const ColorModeContext = createContext({
    toggleColorMode: () => {},
});

export const useMode = ()=>{
    const [mode, setMode] = useState("dark");

    const colorMode = useMemo(
        ()=>({
            toggleColorMode: () =>
                setMode((prev) =>(prev === "light" ? "dark" : "light")),
        }),
        []
    );

    const theme = useMemo(()=>createTheme(ThemeSetting(mode)), [mode]);

    return [theme, colorMode];
}