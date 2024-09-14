import React, { useState } from 'react';
import {
  Container, CssBaseline, Box, Typography, TextField, Button, Stack, Grid, FormControl, Select, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

// Theme definition
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#321115",
      dark: "#847072",
    },
  },
});

// Update attending type to strictly "Yes" | "No"
interface Guest {
  firstName: string;
  lastName: string;
  attending: "Yes" | "No";  // Strict type
  foodRestrictions: 'None' | 'Chicken' | 'Vegan' | 'Vegetarian';
}

interface FormData {
  rsvpId: string;
  lastName: string;
  email: string;
  phone: string;
  comments?: string;
  guests: Guest[];
}

// Validation schema
const schema = yup.object().shape({
  rsvpId: yup.string().required('RSVP Pin is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  guests: yup.array().of(
    yup.object().shape({
      firstName: yup.string().required('First Name is required'),
      lastName: yup.string().required('Last Name is required'),
      attending: yup.string().oneOf(['Yes', 'No']).required('Attending status is required'), // Literal string union
      foodRestrictions: yup.string().oneOf(['None', 'Chicken', 'Vegan', 'Vegetarian']).required('Food Restriction is required'),
    })
  ).required(),
});

export const RSVP: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formVisible, setFormVisible] = useState(false); // State to control form visibility
  const [openModal, setOpenModal] = useState(false); // State for modal visibility

  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      rsvpId: '',
      lastName: '',
      email: '',
      phone: '',
      comments: '',
      guests: [{ firstName: '', lastName: '', attending: "Yes", foodRestrictions: 'None' }],
    },
  });

  // useFieldArray to handle guests
  const { fields, append } = useFieldArray({
    control,
    name: 'guests',
  });

  const fetchRSVPData = async (rsvpId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://eqlh2tuls9.execute-api.us-east-1.amazonaws.com/PROD/rsvp?pin=${rsvpId}`);
      if (response.status !== 200) {
        throw new Error('Error fetching data. Please check your PIN and Last Name.');
      }
      const data = response.data[0];
      reset({
        rsvpId: data.rsvpId,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        comments: data.comments || '',
        guests: data.guests.map((guest: any) => ({
          firstName: guest.firstName,
          lastName: guest.lastName,
          attending: guest.attending === true ? "Yes" : "No", // Convert boolean to "Yes"/"No"
          foodRestrictions: guest.foodRestrictions || 'None',
        })),
      });
      setFormVisible(true);  // Make the form visible after data is fetched
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const formattedData = {
        ...data,
        guests: data.guests.map(guest => ({
          ...guest,
          attending: guest.attending === "Yes" ? true : false, // Convert "Yes"/"No" back to boolean
        })),
      };
      await axios.put('https://eqlh2tuls9.execute-api.us-east-1.amazonaws.com/PROD/rsvp', formattedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Show modal pop-up
      setOpenModal(true);

      // Redirect to another URL after 3 seconds
      setTimeout(() => {
        window.location.href = 'https://www.siriaswedding.com/schedule'; // Change to your desired URL
      }, 3000);

    } catch (err) {
      setError("Error submitting RSVP. Please try again or contact us.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    reset();
  };

  return (
    <div className="rsvpBack" style={{ padding: 30, height: "100%" }}>
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="lg" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 2 }}>
        <CssBaseline />
        <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography id="reccs" component="h2" variant="h5" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            RSVP Form
          </Typography>

          {/* Fetch RSVP Data Form */}
          <form onSubmit={(e) => {
            e.preventDefault();
            const rsvpId = (document.querySelector('input[name="rsvpId"]') as HTMLInputElement).value;
            fetchRSVPData(rsvpId);
          }} noValidate>
            <Stack spacing={2} sx={{ width: '100%', marginBottom: 4 }}>
              <TextField
                label="RSVP Pin"
                {...register('rsvpId')}
                error={!!errors.rsvpId}
                helperText={errors.rsvpId?.message}
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'View RSVP'}
              </Button>
              {error && <Typography color="error">{error}</Typography>}
            </Stack>
          </form>

          {/* Conditionally Render Form if Data is Available */}
          {formVisible && (
            <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
              <Stack spacing={2} sx={{ width: '100%' }}>
                <Grid container spacing={2} sx={{ backgroundColor: 'white', padding: 2, borderRadius: 1 }}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6">Contact Info</Typography>
                    <TextField
                      label="Email"
                      {...register('email')}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      label="Phone"
                      {...register('phone')}
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      label="Comments"
                      {...register('comments')}
                      multiline
                      rows={2}
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="h6">Guests List</Typography>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Attending</TableCell>
                            <TableCell>Food Restrictions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {fields.map((field, index) => (
                            <TableRow key={field.id}>
                              <TableCell>
                                <TextField
                                  {...register(`guests.${index}.firstName` as const)}
                                  error={!!errors.guests?.[index]?.firstName}
                                  helperText={errors.guests?.[index]?.firstName?.message}
                                  fullWidth
                                  InputProps={{
                                    readOnly: true,
                                  }}  // Make firstName read-only
                                />
                              </TableCell>
                              <TableCell>
                                <TextField
                                  {...register(`guests.${index}.lastName` as const)}
                                  error={!!errors.guests?.[index]?.lastName}
                                  helperText={errors.guests?.[index]?.lastName?.message}
                                  fullWidth
                                  InputProps={{
                                    readOnly: true,
                                  }}  // Make lastName read-only
                                />
                              </TableCell>
                              <TableCell>
                                <FormControl fullWidth>
                                  <Select
                                    {...register(`guests.${index}.attending` as const)}
                                    error={!!errors.guests?.[index]?.attending}
                                    defaultValue={fields[index].attending} // Correctly set default value
                                  >
                                    <MenuItem value="Yes">Yes</MenuItem>
                                    <MenuItem value="No">No</MenuItem>
                                  </Select>
                                </FormControl>
                              </TableCell>
                              <TableCell>
                                <FormControl fullWidth>
                                  <Select
                                    {...register(`guests.${index}.foodRestrictions` as const)}
                                    error={!!errors.guests?.[index]?.foodRestrictions}
                                    defaultValue={fields[index].foodRestrictions}
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
                  </Grid>
                </Grid>
                <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
                  <Button variant="outlined" color="secondary" onClick={handleClear}>
                    Clear
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'RSVP Now'}
                  </Button>
                </Stack>
              </Stack>
            </form>
          )}
        </Box>
          {/* Modal for Success Message */}
          <Dialog open={openModal} onClose={() => setOpenModal(false)}>
          <DialogTitle>Success</DialogTitle>
          <DialogContent>
          <Typography>Thank you, we look forward to seeing you!</Typography>
          </DialogContent>
          <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Close</Button>
          </DialogActions>
          </Dialog>
      </Container>
    </ThemeProvider>
    </div>
  );
};

export default RSVP;
