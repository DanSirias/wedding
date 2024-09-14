import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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
  Select,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,  // Import Divider
  useMediaQuery
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Theme definition
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#321115",
      dark: "#847072",
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

// Validation schema
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
  const [formData, setFormData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Responsive breakpoint check
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

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
      const data = dynamoData[0];
  
      const parsedData: FormData = {
        rsvpId: data.rsvpId,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        comments: data.comments || "", 
        guests: data.guests.map((guest: any) => ({
          firstName: guest.firstName,
          lastName: guest.lastName,
          foodRestrictions: guest.foodRestrictions,
          attending: guest.attending ? "Yes" : "No",
        })),
      };
  
      setFormData(parsedData);

      Object.keys(parsedData).forEach((key) => {
        setValue(key as keyof FormData, (parsedData as any)[key]);
      });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Form submitted successfully!");

    if (!formData) return;

    setLoading(true); // Start loading
    setError(null); // Reset any existing errors

    try {
        const rsvpData = {
            rsvpId: formData.rsvpId,
            email: formData.email || null,
            phone: formData.phone || null,
            comments: formData.comments || null,
            guests: formData.guests.map((guest) => ({
                firstName: guest.firstName,
                lastName: guest.lastName,
                attending: guest.attending === "Yes" ? true : false,
                foodRestrictions: guest.foodRestrictions || 'None',
            })),
        };

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
    } catch (err) {
        console.error('Error submitting RSVP', err);
        setError('Error submitting RSVP. Please try again or contact us.');
    } finally {
        setLoading(false); // Stop loading
    }
};

  const handleClear = () => {
    reset();
    setFormData(null);
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

            {/* Form 1: Fetch RSVP Data */}
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

            {/* Form 2: Submit Updated RSVP Data */}
            {formData && formData.email && formData.phone && (
              <form onSubmit={handleFormSubmit} noValidate>
                <Stack spacing={2} sx={{ width: '100%' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6} sx={{ backgroundColor: 'white', padding: 2, borderRadius: 1 }}>
                      <Typography variant="h6" sx={{ marginBottom: 2 }}>Contact Info</Typography>
                      <TextField
                        label="Email"
                        {...register('email')}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        variant="outlined"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                      />
                      <TextField
                        label="Phone"
                        {...register('phone')}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        variant="outlined"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                      />
                      <TextField
                        label="Comments"
                        {...register('comments')}
                        value={formData.comments}
                        onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                        multiline
                        rows={2}
                        variant="outlined"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" sx={{ marginBottom: 2 }}>Guests List</Typography>

                      {/* Render Form-Style Layout for Small Screens */}
                      {isSmallScreen ? (
                        formData.guests.map((guest, index) => (
                          <Box key={index} component={Paper} sx={{ padding: 2, marginBottom: 2 }}>
                            <TextField
                              label="First Name"
                              value={guest.firstName}
                              InputProps={{ readOnly: true }}
                              fullWidth
                              sx={{ marginBottom: 2 }}
                            />
                            <TextField
                              label="Last Name"
                              value={guest.lastName}
                              InputProps={{ readOnly: true }}
                              fullWidth
                              sx={{ marginBottom: 2 }}
                            />
                            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                              <Select
                                {...register(`guests.${index}.attending` as const)}
                                value={guest.attending}
                                onChange={(e) => {
                                  const guests = [...formData.guests];
                                  guests[index].attending = e.target.value as string;
                                  setFormData({ ...formData, guests });
                                }}
                              >
                                <MenuItem value="Yes">Yes</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                              </Select>
                            </FormControl>
                            {guest.attending === 'Yes' && (
                              <FormControl fullWidth>
                                <Select
                                  {...register(`guests.${index}.foodRestrictions` as const)}
                                  value={guest.foodRestrictions || 'None'}
                                  onChange={(e) => {
                                    const guests = [...formData.guests];
                                    guests[index].foodRestrictions = e.target.value as string;
                                    setFormData({ ...formData, guests });
                                  }}
                                >
                                  <MenuItem value="None">None</MenuItem>
                                  <MenuItem value="Chicken">Chicken</MenuItem>
                                  <MenuItem value="Vegan">Vegan</MenuItem>
                                  <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                                </Select>
                              </FormControl>
                            )}
                            {/* Add Divider between guest sections */}
                            {index < formData.guests.length - 1 && (
                              <Divider sx={{ marginY: 2 }} />
                            )}
                          </Box>
                        ))
                      ) : (
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
                                        value={guest.attending}
                                        onChange={(e) => {
                                          const guests = [...formData.guests];
                                          guests[index].attending = e.target.value as string;
                                          setFormData({ ...formData, guests });
                                        }}
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
                                          value={guest.foodRestrictions || 'None'}
                                          onChange={(e) => {
                                            const guests = [...formData.guests];
                                            guests[index].foodRestrictions = e.target.value as string;
                                            setFormData({ ...formData, guests });
                                          }}
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
                      )}
                    </Grid>
                  </Grid>

                  <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end', width: '100%', padding: 3 }}>
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
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default RSVP;
