import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as XLSX from 'xlsx';
import {
  Container,
  Typography,
  TextField,
  Button,
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
  Box,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

type FoodRestrictions = 'None' | 'Chicken' | 'Vegan' | 'Vegetarian';

interface Guest {
  firstName: string;
  lastName: string;
  attending: string;
  foodRestrictions: FoodRestrictions;
}

interface FormData {
  guests: Guest[] | null;
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

const schema = yup.object().shape({
  guests: yup
    .array()
    .of(
      yup.object().shape({
        firstName: yup.string().required('First Name is required'),
        lastName: yup.string().required('Last Name is required'),
        attending: yup.string().required('Attending status is required'),
        foodRestrictions: yup
          .mixed<FoodRestrictions>()
          .oneOf(['None', 'Chicken', 'Vegan', 'Vegetarian'])
          .required(),
      })
    )
    .nullable()
    .default(null),
});

const defaultTheme = createTheme();

export const Dashboard: React.FC = () => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [rsvpData, setRsvpData] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      guests: null,
    },
  });

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

    const postData = async () => {
      try {
        const response = await axios.post<RSVP[]>(
          "https://eqlh2tuls9.execute-api.us-east-1.amazonaws.com/PROD/rsvp",
          { lastName: 'sirias' },  // Assuming you want to POST this data
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('id_token')}`,
            },
          }
        );
        console.log(response.data); 
        setRsvpData(response.data);
      } catch (error) {
        console.error("Error posting data", error);
      }
    };

    postData();
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://eqlh2tuls9.execute-api.us-east-1.amazonaws.com/PROD/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('id_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit RSVP.');
      }

      console.log('RSVP submitted successfully:', await response.json());

    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    reset();
    setFormData(null);
  };

  const handleDownloadExcel = () => {
    if (!rsvpData || rsvpData.length === 0) {
      alert('No data to download');
      return;
    }

    const formattedData = rsvpData.map((rsvp) => {
      const guestsData = rsvp.guests.map((guest) => ({
        'First Name': guest.firstName,
        'Last Name': guest.lastName,
        'Attending': guest.attending ? 'Yes' : 'No',
        'Food Restrictions': guest.foodRestrictions || 'None',
      }));

      return {
        'RSVP ID': rsvp.rsvpId,
        'Last Name': rsvp.lastName,
        'Email': rsvp.email,
        'Phone': rsvp.phone,
        'Comments': rsvp.comments || '',
        ...guestsData,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'RSVP Data');

    XLSX.writeFile(workbook, 'RSVP_Guests.xlsx');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">Navigation</Typography>
              <Box mt={2}>
                <Typography><a href="#" onClick={handleClear}>Clear Form</a></Typography>
                <Typography><a href="https://clientportal.totalpartyplanner.com/?id=IOvVDYamb4wF4DV1me+UyuT7r7GyZ16Cy8HAOO+9k3RmpYX0KlzApsvqR9NDMEQh9Su1a5iWBEJugDVSCILdPYhAjbgnSmVFjuhTFBubmJ53CBTRZjFmlzaImSFVzloAD+mLyUycXzEHScnzFcpQ2/+5O/wszg2rsJjnZqznFvjtsApvI8Ce3r5ICQy0ydcrhsIz3lH8L4sXjfl8QR+4UPNrqMVvt0h5bAi/Nyg1q34EJ5ARW22UC4Y0kykBUBwK">Venue Portal</a></Typography>
                <Typography><a href="https://booking.weddings-unlimited.com/manage?id=5028&surname=Sirias">Video/DJ Portal</a></Typography>
                <Typography><a href="https://tuxedo.josbank.com/wedding-tracker?utm_source=JAB&utm_medium=Ecomm&utm_campaign=TopNav&utm_terms=WedGroupManager&_gl=1*bm7jp3*_ga*MTA0MTQ3MTQ2MC4xNzI0Nzk5MTI1*_ga_T6SWH68K36*MTcyNDc5OTIzNC4xLjEuMTcyNDc5OTI0Ni4wLjAuMA..">Grooms Portal</a></Typography>
                <Typography><a href="https://www.williams-sonoma.com/registry/p9prlfd9k6/registry-list.html">Williams Sonoma</a></Typography>
                <Typography><a href="https://www.amazon.com/wedding/registry/2XTOVT67D2JK3?ref=wr_search_page_result_1">Amazon Registry</a></Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={9}>
            <Typography variant="h4" gutterBottom>RSVP Form</Typography>

            {error && <Typography color="error">{error}</Typography>}

            <Grid container justifyContent="flex-end" sx={{ marginBottom: 2 }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#5d7a66', color: '#fff' }} // Custom green color
                onClick={handleDownloadExcel}
              >
                Download Excel
              </Button>
            </Grid>

            <form onSubmit={handleSubmit(onSubmit)}>
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
                    {Array.from({ length: formData?.guests?.length || 3 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <TextField
                            fullWidth
                            {...register(`guests.${index}.firstName` as const)}
                            error={!!errors.guests?.[index]?.firstName}
                            helperText={errors.guests?.[index]?.firstName?.message}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            fullWidth
                            {...register(`guests.${index}.lastName` as const)}
                            error={!!errors.guests?.[index]?.lastName}
                            helperText={errors.guests?.[index]?.lastName?.message}
                          />
                        </TableCell>
                        <TableCell>
                          <FormControl fullWidth>
                            <Select
                              {...register(`guests.${index}.attending` as const)}
                              defaultValue=""
                              error={!!errors.guests?.[index]?.attending}
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
                              defaultValue=""
                              error={!!errors.guests?.[index]?.foodRestrictions}
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

              <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
                <Button variant="outlined" color="secondary" onClick={handleClear}>
                  Clear
                </Button>
                <Button variant="contained" color="primary" type="submit" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit'}
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};


