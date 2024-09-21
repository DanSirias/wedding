import React from 'react';
import "../App.css"
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#321115",
      dark: "#847072"
    }
  }, 
});


export const WeddingParty: React.FC = () => {
  return (<>
        <ThemeProvider theme={defaultTheme}>
        <div style={{ marginTop: 0 }}>
          <Container maxWidth={false} style={{ height: "100%"}} 
            sx={{
              pt: { xs: 4, sm: 6, md:2 },
              pb: { xs: 8, sm:8,  md:2 },
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: { xs: 2, sm: 1 },
              border: 0, 
              borderColor: "lightgray", 
              boxShadow: 4,
              backgroundColor: "#f2f2f2", 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}></Container></div>

<Typography id="reccs" component="h2" variant="h5"
              sx={{
                fontSize: 20,
                display: "flex",
                justifyContent:"center",
                alignItems:"center",
              }}>
              Wedding Party
            </Typography>
            </ThemeProvider>
  
  </>);
};