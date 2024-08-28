import React, { useEffect, useState } from "react";
import {
  Container, Grid, Card, CardContent, Typography, Box, Paper,
  Table, TableBody, TableCell, TableHead, TableRow, IconButton, Collapse, Button, Modal, TextField, Select, MenuItem
} from "@mui/material";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import * as XLSX from 'xlsx';  // Import xlsx library
import { SelectChangeEvent } from "@mui/material";  // Import SelectChangeEvent

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
  guests: Guest[];
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
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [editedRSVP, setEditedRSVP] = useState<RSVP | null>(null);

  const totalRSVPs = rsvpData.length;
  const totalAttendingGuests = rsvpData.reduce((total, rsvp) => 
    total + rsvp.guests.filter(guest => guest.attending).length, 0
  );
  const totalDeclinedGuests = rsvpData.reduce((total, rsvp) => 
    total + rsvp.guests.filter(guest => !guest.attending).length, 0
  );

  useEffect(() => {
    const getIdTokenFromUrl = (): string | null => {
      const hash = window.location.hash.substring(1); // Remove the leading '#'
      const params = new URLSearchParams(hash);
      return params.get('id_token');
    };

    const storeIdTokenInSession = () => {
      const idToken = getIdTokenFromUrl();
      if (idToken) {
        sessionStorage.setItem('id_token', idToken);
        console.log('ID token stored in session storage');
      } else {
        console.log('No ID token found in URL');
      }
    };

    storeIdTokenInSession(); 

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

  const handleEdit = (rsvpId: string) => {
    setEditingRow(rsvpId);
    const rsvp = rsvpData.find(r => r.rsvpId === rsvpId);
    if (rsvp) {
      setEditedRSVP(rsvp);
    }
  };

  const handleRSVPChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewRSVP(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGuestChange = (index: number, event: SelectChangeEvent<string>, field: string) => {
    if (editedRSVP) {
      const updatedGuests = [...editedRSVP.guests];
      updatedGuests[index] = { ...updatedGuests[index], [field]: event.target.value };
      setEditedRSVP({ ...editedRSVP, guests: updatedGuests });
    }
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
    setEditedRSVP(null);
  };

  const handleUpdate = async () => {
    if (!editedRSVP) return;
    
    try {
      await axios.put(`https://eqlh2tuls9.execute-api.us-east-1.amazonaws.com/PROD/rsvp`, editedRSVP, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('id_token')}`,
        },
      });
      setEditingRow(null);
      setEditedRSVP(null);
      const response = await axios.get<RSVP[]>(
        "https://eqlh2tuls9.execute-api.us-east-1.amazonaws.com/PROD/rsvp?lastName=sirias",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('id_token')}`,
          },
        }
      );
      setRsvpData(response.data);
    } catch (error) {
      console.error("Error updating RSVP", error);
    }
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const addAnotherGuest = () => {
    setNewRSVP(prevState => ({
      ...prevState,
      guests: [...prevState.guests, { firstName: '', lastName: '', attending: false, foodRestrictions: '' }],
    }));
  };

  const handleSubmit = async () => {
    try {
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

  const handleDownloadExcel = () => {
    const formattedData = rsvpData.map((rsvp) => {
      const row: any = {
        rsvpId: rsvp.rsvpId,
        lastName: rsvp.lastName,
        email: rsvp.email,
        phone: rsvp.phone,
        comments: rsvp.comments || '',
        created: rsvp.created,
        updated: rsvp.updated
      };
      
      rsvp.guests.forEach((guest, index) => {
        row[`Guest ${index + 1} First Name`] = guest.firstName;
        row[`Guest ${index + 1} Last Name`] = guest.lastName;
        row[`Guest ${index + 1} Attending`] = guest.attending ? "Yes" : "No";
        row[`Guest ${index + 1} Food Restrictions`] = guest.foodRestrictions || 'None';
      });

      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "RSVP Data");

    XLSX.writeFile(workbook, "RSVP_Data.xlsx");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        {/* Cards Section */}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h5">Add RSVP</Typography>
                <Button variant="contained" color="primary" onClick={handleOpenModal}>
                  Add New RSVP
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h5">Total Reservations</Typography>
                <Typography variant="body2">{totalRSVPs}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h5">Total Attending</Typography>
                <Typography variant="body2">{totalAttendingGuests}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h5">Total Declines</Typography>
                <Typography variant="body2">{totalDeclinedGuests}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Button and Title Section */}
        <Grid container spacing={2} sx={{ marginTop: 4 }} justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" gutterBottom>
              RSVP Data
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              style={{ backgroundColor: '#5d7a66', color: 'white' }}
              onClick={handleDownloadExcel}
            >
              Download Excel
            </Button>
          </Grid>
        </Grid>

        {/* Table Section */}
        <Grid container spacing={4} sx={{ marginTop: 2 }}>
          <Grid item xs={12} md={12}>
            <Paper elevation={3} sx={{ padding: 2 }}>
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
                                      <TableCell>
                                        {editingRow === rsvp.rsvpId ? (
                                          <TextField
                                            fullWidth
                                            value={editedRSVP?.guests[index]?.firstName || ''}
                                            onChange={(e) => handleGuestChange(index, e, 'firstName')}
                                          />
                                        ) : (
                                          guest.firstName
                                        )}
                                      </TableCell>
                                      <TableCell>
                                        {editingRow === rsvp.rsvpId ? (
                                          <TextField
                                            fullWidth
                                            value={editedRSVP?.guests[index]?.lastName || ''}
                                            onChange={(e) => handleGuestChange(index, e, 'lastName')}
                                          />
                                        ) : (
                                          guest.lastName
                                        )}
                                      </TableCell>
                                      <TableCell>
                                        {editingRow === rsvp.rsvpId ? (
                                          <Select
                                            fullWidth
                                            value={editedRSVP?.guests[index]?.foodRestrictions || 'None'}
                                            onChange={(e) => handleGuestChange(index, e, 'foodRestrictions')}
                                          >
                                            <MenuItem value="None">None</MenuItem>
                                            <MenuItem value="Chicken">Chicken</MenuItem>
                                            <MenuItem value="Vegan">Vegan</MenuItem>
                                            <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                                          </Select>
                                        ) : (
                                          guest.foodRestrictions || 'None'
                                        )}
                                      </TableCell>
                                      <TableCell>
                                        {editingRow === rsvp.rsvpId ? (
                                          <TextField
                                            fullWidth
                                            value={editedRSVP?.guests[index]?.attending ? "Yes" : "No"}
                                            onChange={(e) => handleGuestChange(index, e, 'attending')}
                                          />
                                        ) : (
                                          guest.attending ? "Yes" : "No"
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                              {editingRow === rsvp.rsvpId ? (
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                  <Button variant="contained" color="primary" onClick={handleUpdate}>Update</Button>
                                  <Button variant="contained" color="secondary" onClick={handleCancelEdit} sx={{ ml: 2 }}>Cancel</Button>
                                </Box>
                              ) : (
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                  <Button variant="contained" color="primary" onClick={() => handleEdit(rsvp.rsvpId)}>Edit</Button>
                                </Box>
                              )}
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
                  onChange={(e) => handleGuestChange(index, e, 'firstName')}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Last Name"
                  name="lastName"
                  value={guest.lastName}
                  onChange={(e) => handleGuestChange(index, e, 'lastName')}
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
