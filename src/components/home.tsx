import React from 'react';
import "../App.css"
import Logo from '../images/RDlogo_burgandy.svg'
import LetterLogo from '../images/names.svg';
import treeBackground from '../images/treePic.jpg';
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

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
    sx={{ mt: 3, mb: 2, fontSize: '1.2rem' }}
    color="primary"
    size="large"
  >
    RVSP
  </Button>
</Link>
{/* <Typography id="reccsHome" component="h2" variant="h5"
            sx={{
              width: "80%",
              justifyContent:"center",
              alignItems:"center",
            }}>
             We find each other under this grand ol’ Texas Century Tree, 
             which continues to bind the threads of love for over a century. 
             And now, I wish for our story to intertwine with its legacy and tradition.

            </Typography>
 */}
  </div>
  </div></ThemeProvider>
  </>)
};
