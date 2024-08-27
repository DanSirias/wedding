import React, { useEffect, useState } from "react";
import {
  Container, Grid, Card, CardContent, Typography, Box, Paper,
  Table, TableBody, TableCell, TableHead, TableRow, IconButton, Collapse, Button, Modal, TextField
} from "@mui/material";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#321115",
      dark: "#847072",
    },
  },
});

interface Guest {
  lastName: string;
  firstName: string;
  attending: boolean;
  foodRestrictions?: string;
}

interface RSVP {
  rsvpId: string;
  lastName: string;
  comments?: string;
  created: string;
  email: string;
  guests: Array<Guest>;
  phone: string;
  updated: string;
}

export const Dashboard: React.FC = () => {
  const [rsvpData, setRsvpData] = useState<RSVP[]>([]);
  const [openRow, setOpenRow] = useState<{ [key: string]: boolean }>({});
  const [openModal, setOpenModal] = useState(false);
  const [newRSVP, setNewRSVP] = useState({
    rsvpId: '',
    guests: [{ firstName: '', lastName: '', attending: false, foodRestrictions: '' }]
  });

  useEffect(() => {
    // Function to extract the ID token from the URL
    const getIdTokenFromUrl = () => {
      const hash = window.location.hash.substring(1); // Remove the leading '#'
      const params = new URLSearchParams(hash);
      return params.get('id_token');
    };

    // Store the ID token in session storage
    const storeIdTokenInSession = () => {
      const idToken = getIdTokenFromUrl();
      if (idToken) {
        sessionStorage.setItem('id_token', idToken);
        console.log('ID token stored in session storage');
      } else {
        console.log('No ID token found in URL');
      }
    };

    storeIdTokenInSession(); // Store the token when the component mounts

    const fetchData = async () => {
      try {
        const response = await axios.get<RSVP[]>(
          "https://eqlh2tuls9.execute-api.us-east-1.amazonaws.com/PROD/rsvp?lastName=sirias",
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('id_token')}`,
            },
          }
        );
        console.log(response.data); 
        setRsvpData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const toggleRow = (rsvpId: string) => {
    setOpenRow(prevOpenRow => ({
      ...prevOpenRow,
      [rsvpId]: !prevOpenRow[rsvpId]
    }));
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleRSVPChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewRSVP(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGuestChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const guests = [...newRSVP.guests];
    guests[index] = { ...guests[index], [name]: value };
    setNewRSVP(prevState => ({ ...prevState, guests }));
  };

  const addAnotherGuest = () => {
    setNewRSVP(prevState => ({
      ...prevState,
      guests: [...prevState.guests, { firstName: '', lastName: '', attending: false, foodRestrictions: '' }],
    }));
  };

  const handleSubmit = async () => {
    try {
      // Submit the new RSVP to the API
      console.log(newRSVP);
      await axios.post("https://eqlh2tuls9.execute-api.us-east-1.amazonaws.com/PROD/rsvp", newRSVP, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('id_token')}`,
        },
      });
      handleCloseModal();
    } catch (error) {
      console.error("Error adding RSVP", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        {/* Cards Section */}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h5">Add RSVP</Typography>
                <Button variant="contained" color="primary" onClick={handleOpenModal}>
                  Add New RSVP
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h5">Card 2</Typography>
                <Typography variant="body2">Description for Card 2</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h5">Card 3</Typography>
                <Typography variant="body2">Description for Card 3</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h5">Card 4</Typography>
                <Typography variant="body2">Description for Card 4</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Layout Section */}
        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">Navigation</Typography>
              <Box mt={2}>
                <Typography><a href="#" onClick={handleOpenModal}>Add RSVP</a></Typography>
                <Typography>Link 2</Typography>
                <Typography>Link 3</Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={9}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                RSVP Data
              </Typography>
              <Table>
                <TableHead sx={{ backgroundColor: 'lightgray' }}>
                  <TableRow>
                    <TableCell />
                    <TableCell sx={{ fontWeight: '900' }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: '900' }}>Last Name</TableCell>
                    <TableCell sx={{ fontWeight: '900' }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: '900' }}>Phone</TableCell>
                    <TableCell sx={{ fontWeight: '900' }}>Comments</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rsvpData.map((rsvp) => (
                    <React.Fragment key={rsvp.rsvpId}>
                      <TableRow>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => toggleRow(rsvp.rsvpId)}
                          >
                            {openRow[rsvp.rsvpId] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                          </IconButton>
                        </TableCell>
                        <TableCell>{rsvp.rsvpId}</TableCell>
                        <TableCell>{rsvp.lastName}</TableCell>
                        <TableCell>{rsvp.email}</TableCell>
                        <TableCell>{rsvp.phone}</TableCell>
                        <TableCell>{rsvp.comments || ''}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                          <Collapse in={openRow[rsvp.rsvpId]} timeout="auto" unmountOnExit>
                            <Box margin={2}>
                              <Typography variant="h6" gutterBottom component="div">
                                Guests
                              </Typography>
                              <Table size="small" aria-label="guests">
                                <TableHead>
                                  <TableRow>
                                    <TableCell sx={{ fontWeight: '900' }}>First Name</TableCell>
                                    <TableCell sx={{ fontWeight: '900' }}>Last Name</TableCell>
                                    <TableCell sx={{ fontWeight: '900' }}>Attending</TableCell>
                                    <TableCell sx={{ fontWeight: '900' }}>Food Restrictions</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {rsvp.guests.map((guest, index) => (
                                    <TableRow key={index}>
                                      <TableCell>{guest.firstName}</TableCell>
                                      <TableCell>{guest.lastName}</TableCell>
                                      <TableCell>{guest.attending ? "Yes" : "No"}</TableCell>
                                      <TableCell>{guest.foodRestrictions || 'None'}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>

        {/* Modal Section */}
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box sx={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400, bgcolor: 'background.paper', borderRadius: 2,
            boxShadow: 24, p: 4
          }}>
            <Typography variant="h6" component="h2">
              Add New RSVP
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="RSVP Pin"
              name="rsvpId"
              value={newRSVP.rsvpId}
              onChange={handleRSVPChange}
            />
            {newRSVP.guests.map((guest, index) => (
              <Box key={index}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="First Name"
                  name="firstName"
                  value={guest.firstName}
                  onChange={(e) => handleGuestChange(index, e)}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Last Name"
                  name="lastName"
                  value={guest.lastName}
                  onChange={(e) => handleGuestChange(index, e)}
                />
              </Box>
            ))}
            <Button onClick={addAnotherGuest} sx={{ marginTop: 2 }}>Add Another Guest</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ marginTop: 2, float: 'right' }}
            >
              Submit
            </Button>
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
};
