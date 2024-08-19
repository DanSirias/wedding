import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
  InputLabel,
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
  foodRestrictions?: string;
  attending: string;
}

interface FormData {
  rsvpId: string;
  lastName: string;
  email: string;
  phone: string;
  comments?: string;
  guests: Guest[];
}

const schema = yup.object().shape({
  rsvpId: yup.string().required('RSVP Pin is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  comments: yup.string(),
  guests: yup.array().of(
    yup.object().shape({
      firstName: yup.string().required('First Name is required'),
      lastName: yup.string().required('Last Name is required'),
      attending: yup.string().required('Attending status is required'),
      foodRestrictions: yup.string().oneOf(['None', 'Chicken', 'Vegan', 'Vegetarian']),
    })
  ).required(),
});

export const RSVP: React.FC = () => {
  const [formData, setFormData] = useState<FormData | any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const fetchRSVPData = async (rsvpId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://eqlh2tuls9.execute-api.us-east-1.amazonaws.com/PROD/rsvp?pin=${rsvpId}`);
      
      if (!response.ok) {
        throw new Error('Error fetching data. Please check your PIN and Last Name.');
      }
  
      const dynamoData = await response.json();
  
      // Assuming the response is an array with one object
      const data = dynamoData[0];
  
      const parsedData: FormData = {
        rsvpId: data.rsvpId.S,
        lastName: data.lastName.S,
        email: data.email.S,
        phone: data.phone.S,
        comments: data.comments?.S,
        guests: data.guests.L.map((guest: any) => ({
          firstName: guest.M.firstName.S,
          lastName: guest.M.lastName.S,
          foodRestrictions: guest.M.foodRestrictions.S,
          attending: guest.M.attending.BOOL ? "Yes" : "No",
        })),
      };
  
      console.log(parsedData); 
      setFormData(parsedData);
  
      // Populate form fields with fetched data
      setValue('email', parsedData.email);
      setValue('phone', parsedData.phone);
      setValue('comments', parsedData.comments);
      parsedData.guests.forEach((guest, index) => {
        setValue(`guests.${index}.firstName`, guest.firstName);
        setValue(`guests.${index}.lastName`, guest.lastName);
        setValue(`guests.${index}.attending`, guest.attending);
        setValue(`guests.${index}.foodRestrictions`, guest.foodRestrictions);
      });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // Prepare the data for the PUT request
      const rsvpData = {
        rsvpId: data.rsvpId,
        email: data.email || null,       // Send null if the field is empty
        phone: data.phone || null,       // Send null if the field is empty
        comments: data.comments || null, // Send null if the field is empty
        guests: data.guests.map((guest) => ({
          firstName: guest.firstName,
          lastName: guest.lastName,
          attending: guest.attending,
          foodRestrictions: guest.foodRestrictions || 'None', // Default to 'None' if empty
        })),
      };
  
      // Make the PUT request to update the RSVP
    const response = await fetch('https://eqlh2tuls9.execute-api.us-east-1.amazonaws.com/PROD/rsvp', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rsvpData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update RSVP');
      }
  
      const result = await response.json();
      console.log('RSVP updated successfully', result);
      
      // Optionally, handle success (e.g., show a success message or redirect)
  
    } catch (err) {
      console.error('Error submitting RSVP', err);
      setError('Error submitting RSVP. Please try again or contact us.');
    }
  };
  

  const handleClear = () => {
    reset();
    setFormData(null);
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
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={2} sx={{ width: '100%' }}>
                <TextField
                  label="RSVP Pin"
                  {...register('rsvpId')}
                  error={!!errors.rsvpId}
                  helperText={errors.rsvpId?.message}
                />
                {!formData && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => fetchRSVPData(
                      (document.querySelector('input[name="rsvpId"]') as HTMLInputElement).value
                    )}
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'View RSVP'}
                  </Button>
                )}
                {error && <Typography color="error">{error}</Typography>}
                {formData && (
                  <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="h6">Contact Info</Typography>
                        {/* Email and Phone on the same row with labels outside */}
                        <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2}}>
                          <Grid item xs={3}>
                            <Typography variant="body1">Email:</Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              {...register('email')}
                              error={!!errors.email}
                              helperText={errors.email?.message}
                              variant="outlined"
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                        <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
                          <Grid item xs={3}>
                            <Typography variant="body1">Phone:</Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              {...register('phone')}
                              error={!!errors.phone}
                              helperText={errors.phone?.message}
                              variant="outlined"
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                        {/* Comments field (multiline) with label outside */}
                        <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
                          <Grid item xs={3}>
                            <Typography variant="body1">Comments:</Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <TextField
                              {...register('comments')}
                              error={!!errors.comments}
                              helperText={errors.comments?.message}
                              multiline
                              rows={2}
                              variant="outlined"
                              fullWidth
                            />
                          </Grid>
                        </Grid>
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
                            {formData.guests.map((guest: any, index: any) => (
                              <TableRow key={index}>
                                <TableCell>
                                  <TextField
                                    value={guest.firstName}
                                    InputProps={{ readOnly: true }}
                                    fullWidth
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    value={guest.lastName}
                                    InputProps={{ readOnly: true }}
                                    fullWidth
                                  />
                                </TableCell>
                                <TableCell>
                                  <FormControl fullWidth>
                                    <Select
                                      {...register(`guests.${index}.attending` as const)}
                                      defaultValue={guest.attending}
                                    >
                                      <MenuItem value="Yes">Yes</MenuItem>
                                      <MenuItem value="No">No</MenuItem>
                                    </Select>
                                  </FormControl>
                                </TableCell>
                                <TableCell>
                                  {guest.attending === 'Yes' ? (
                                    <FormControl fullWidth>
                                      <Select
                                        {...register(`guests.${index}.foodRestrictions` as const)}
                                        defaultValue={guest.foodRestrictions}
                                      >
                                        <MenuItem value="None">None</MenuItem>
                                        <MenuItem value="Chicken">Chicken</MenuItem>
                                        <MenuItem value="Vegan">Vegan</MenuItem>
                                        <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                                      </Select>
                                    </FormControl>
                                  ) : (
                                    <TextField
                                      value="N/A"
                                      InputProps={{ readOnly: true }}
                                      fullWidth
                                    />
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end', width: '100%', padding: 3 }}>
                    <Button variant="outlined"color="secondary"onClick={handleClear}>
                      Clear
                    </Button>
                    <Button
                      variant="contained"
                        color="primary"
                        onClick={handleSubmit} 
                        disabled={loading}
                      >
                        {loading ? 'Submitting...' : 'RSVP Now'}
                      </Button>
                  </Stack>
                  </Grid>
                )}
              </Stack>
            </form>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default RSVP;
