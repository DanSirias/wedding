import React, { useState } from 'react';
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material';

// Theme definition
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

interface Guest {
  firstName: string;
  lastName: string;
  attending: string;
  foodRestrictions?: string;
}

interface FormData {
  rsvpId: string;
  lastName: string;
  email: string;
  phone: string;
  comments?: string;
  guests: Guest[];
}

export const RSVP: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    rsvpId: '',
    lastName: '',
    email: '',
    phone: '',
    comments: '',
    guests: [{ firstName: '', lastName: '', attending: 'Yes', foodRestrictions: 'None' }]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchedData, setFetchedData] = useState<FormData | null>(null);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle guest-specific input changes
  const handleGuestChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    const guests = [...formData.guests];
    guests[index] = { ...guests[index], [name as string]: value };
    setFormData(prevState => ({ ...prevState, guests }));
  };
  
  // Add another guest to the form
  const addAnotherGuest = () => {
    setFormData(prevState => ({
      ...prevState,
      guests: [...prevState.guests, { firstName: '', lastName: '', attending: 'Yes', foodRestrictions: 'None' }]
    }));
  };

  // Fetch RSVP data by RSVP ID
  const fetchRSVPData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<FormData>(
        `https://eqlh2tuls9.execute-api.us-east-1.amazonaws.com/PROD/rsvp?pin=${formData.rsvpId}`
      );

      const data = response.data;
      setFetchedData(data);

      // Set the form data with fetched values
      setFormData({
        rsvpId: data.rsvpId,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        comments: data.comments || '',
        guests: data.guests.map((guest: any) => ({
          firstName: guest.firstName,
          lastName: guest.lastName,
          attending: guest.attending ? 'Yes' : 'No',
          foodRestrictions: guest.foodRestrictions || 'None'
        }))
      });
    } catch (err) {
      setError('Error fetching data. Please check your PIN and Last Name.');
    } finally {
      setLoading(false);
    }
  };

  // Submit the form data
  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Format data to match the expected API structure
      const formattedData = {
        rsvpId: formData.rsvpId,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        comments: formData.comments || '',
        guests: formData.guests.map(guest => ({
          firstName: guest.firstName,
          lastName: guest.lastName,
          attending: guest.attending === 'Yes',
          foodRestrictions: guest.foodRestrictions
        }))
      };

      await axios.put('https://eqlh2tuls9.execute-api.us-east-1.amazonaws.com/PROD/rsvp', formattedData);
      alert('RSVP updated successfully');
    } catch (err) {
      setError('Error submitting RSVP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rsvpBack" style={{ padding: 30, height: "100%" }}>
      <ThemeProvider theme={defaultTheme}>
        <Container maxWidth="lg" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 2, radius: "2px" }}>
          <CssBaseline />
          <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography id="reccs" component="h2" variant="h5"
            sx={{
              display: "flex",
              justifyContent:"center",
              alignItems:"center",
            }}>
               RSVP Form 
            </Typography>

            {/* Form for Fetching Data */}
            <Stack spacing={2} sx={{ width: '100%' }}>
              <TextField
                label="RSVP Pin"
                name="rsvpId"
                value={formData.rsvpId}
                onChange={handleInputChange}
              />
              <Button
                  variant="contained"
                  color="primary"
                  onClick={fetchRSVPData}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'View RSVP'}
              </Button>
              {error && <Typography color="error">{error}</Typography>}
            </Stack>

            {/* Form for Submitting Updated Data */}
            {fetchedData && (
              <Stack spacing={2} sx={{ width: '100%', marginTop: 4 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6">Contact Info</Typography>
                    <TextField
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      fullWidth
                    />
                    <TextField
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      fullWidth
                    />
                    <TextField
                      label="Comments"
                      name="comments"
                      value={formData.comments}
                      onChange={handleInputChange}
                      fullWidth
                      multiline
                      rows={2}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6">Guests List</Typography>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>First Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Last Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Attending</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Food Restrictions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {formData.guests.map((guest, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <TextField
                                  name="firstName"
                                  value={guest.firstName}
                                  onChange={(e) => handleGuestChange(index, e)}
                                  fullWidth
                                />
                              </TableCell>
                              <TableCell>
                                <TextField
                                  name="lastName"
                                  value={guest.lastName}
                                  onChange={(e) => handleGuestChange(index, e)}
                                  fullWidth
                                />
                              </TableCell>
                              <TableCell>
                                <FormControl fullWidth>
                                  <Select
                                    name="attending"
                                    value={guest.attending}
                                    onChange={(e) => handleGuestChange(index, e)}
                                  >
                                    <MenuItem value="Yes">Yes</MenuItem>
                                    <MenuItem value="No">No</MenuItem>
                                  </Select>
                                </FormControl>
                              </TableCell>
                              <TableCell>
                                <FormControl fullWidth>
                                  <Select
                                    name="foodRestrictions"
                                    value={guest.foodRestrictions}
                                    onChange={(e) => handleGuestChange(index, e)}
                                  >
                                    <MenuItem value="None">None</MenuItem>
                                    <MenuItem value="Chicken">Chicken</MenuItem>
                                    <MenuItem value="Vegan">Vegan</MenuItem>
                                    <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                                  </Select>
                                </FormControl>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Button onClick={addAnotherGuest} sx={{ marginTop: 2 }}>Add Another Guest</Button>
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'RSVP Now'}
                </Button>
              </Stack>
            )}
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default RSVP;
