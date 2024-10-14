import React from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Typography, Card, CardContent, CardMedia, Grid, Box } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import Sam from "../images/party/sam.jpg";
import Chris from "../images/party/chris.jpg";
import Patrick from "../images/party/patrick.jpg";
import Rafael from "../images/party/rafael.jpg";
import Zach from "../images/party/zach.jpg";
import Julie from "../images/party/julie.jpg";
import Francien from "../images/party/francien.jpg";
import Dina from "../images/party/dina.jpg";
import Iqra from "../images/party/iqra.jpg";
import Reba from "../images/party/reba.jpg";
import Margie from "../images/party/margie.jpg";
// Define the structure for the wedding party members
interface WeddingMember {
  name: string;
  weddingPosition: string;
  hometown: string;
  imageUrl: string;
}

// Sample data for groomsmen and bridesmaids
const groomsmen: WeddingMember[] = [
  {
    name: 'Samuel Aguirre',
    weddingPosition: 'The Best Man',
    hometown: 'Houston, TX',
    imageUrl: Sam,
  },
  {
    name: 'Chris Haden',
    weddingPosition: 'Groomsman',
    hometown: 'Virginia Beach, VA',
    imageUrl: Chris,
  },
  {
    name: 'Zach Thompson',
    weddingPosition: 'Groomsman',
    hometown: 'Pleasant View, TN',
    imageUrl: Zach,
  },
  {
    name: 'Patrick Tran',
    weddingPosition: 'Groomsman',
    hometown: 'Houston, TX',
    imageUrl: Patrick,
  },
  {
    name: 'Rafael Daniel',
    weddingPosition: 'Groomsman',
    hometown: 'San Diego, CA',
    imageUrl: Rafael,
  },
];

const bridesmaids: WeddingMember[] = [
  {
    name: 'Julie Watters',
    weddingPosition: 'Matron of Honor',
    hometown: 'Panama City, FL',
    imageUrl: Julie,
  },
  {
    name: 'Francien Perez Vaessen',
    weddingPosition: 'Bridesmaid',
    hometown: 'Landgraaf, NL',
    imageUrl: Francien,
  },
  {
    name: 'Reba Sullivan',
    weddingPosition: 'Bridesmaid',
    hometown: 'Hamilton, MO',
    imageUrl: Reba,
  },
  {
    name: 'Margie Bussa',
    weddingPosition: 'Bridesmaid',
    hometown: 'Niceville, FL',
    imageUrl: Margie,
  },
  {
    name: 'Dina Ramos',
    weddingPosition: 'Bridesmaid',
    hometown: 'Houston, TX',
    imageUrl: Dina,
  },
  {
    name: 'Iqra Barlas',
    weddingPosition: 'Bridesmaid',
    hometown: 'Houston, TX',
    imageUrl: Iqra,
  }
];

// MUI Theme
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#321115",
      dark: "#847072"
    }
  }, 
});

// Component to render individual member card
const MemberCard: React.FC<{ member: WeddingMember }> = ({ member }) => {
  return (
    <Card sx={{ maxWidth: 245, marginBottom: 2, marginRight: 2 }}>
      <CardMedia
        component="img"
        height="250"
        image={member.imageUrl}
        alt={member.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {member.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {member.weddingPosition}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Hometown: {member.hometown}
        </Typography>
      </CardContent>
    </Card>
  );
};

// Main Wedding Party Component
export const WeddingParty: React.FC = () => {
  return (
    <div style={{ padding: 20, height: "100%" }}>

    </div>
  );
};

export default WeddingParty;
