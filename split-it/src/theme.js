import { createTheme } from "@mui/material";
import { Button, styled } from "@mui/material";

export const theme = createTheme({
    palette:{
        primary: {
            main: "#7DD181",
            light: "#B6F9C9",
        },
        secondary: {
            main: "#96E8BC",
            light: "#C9FFE2",
        },
        otherColor: {
            main: "#4B7F52",
        },
        background: {
            default: "#C9FFE2"
        }
    },
    // typography: {
    //     fontFamily: 
    // },
    components: {
        MuiTypography: {
          defaultProps: {
            variantMapping: {
              h1: 'h2',
              h2: 'h2',
              h3: 'h2',
              h4: 'h2',
              h5: 'h2',
              h6: 'h2',
              subtitle1: 'h2',
              subtitle2: 'h2',
              body1: 'span',
              body2: 'span',
            },
          },
        },
      },
});

export const GreenButton = styled(Button)(({theme})=>({
    backgroundColor: theme.palette.primary.main, 
    color:"white",
    margin: 5,
    width: 100,
    align: "center",
    "&:hover":{
        backgroundColor:"#4B7F52",
        color:"#C9FFE2",
    },
}));