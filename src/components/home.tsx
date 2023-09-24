import React from 'react';
import "../App.css"
import Logo from '../images/RDlogo_burgandy.svg'
import LetterLogo from '../images/names.svg';
import treeBackground from '../images/treePic.jpg';
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#321115",
      dark: "#847072"
    }
  }, 
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});

export const Home: React.FC = () => {
  return (<>
  <ThemeProvider theme={defaultTheme}>
  <div className="home" style={{ padding: 30, height: "100%"}}>
  <div className="section">
  <img id="" className="logo" src={Logo}/>
  <img id="" className="namelogoPri" src={LetterLogo}/>
  </div>
  <div className="section">
  <Link to="/rsvp">
  <Button
    fullWidth
    variant="contained"
    sx={{ mt: 3, mb: 2 }}
    color="primary"
  >
    RVSP
  </Button>
</Link>
  </div>
  </div></ThemeProvider>
  </>)
};
