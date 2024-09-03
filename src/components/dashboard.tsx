import React, { useEffect, useState } from "react";
import {
  Container, Grid, Card, CardContent, Typography, Box, Paper,
  Table, TableBody, TableCell, TableHead, TableRow, IconButton, Collapse, Button, Modal, TextField, FormControl, Select, MenuItem
} from "@mui/material";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import * as XLSX from 'xlsx';  // Import xlsx library
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#321115",
      dark: "#847072",
    },
  },
});

type FoodRestrictions = 'None' | 'Chicken' | 'Vegan' | 'Vegetarian';

interface Guest {
  lastName: string;
  firstName: string;
  attending: boolean;
  foodRestrictions: FoodRestrictions; // No longer optional
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

interface FormData {
  rsvpId: string;
  guests: Guest[];
}

const schema = yup.object().shape({
  rsvpId: yup.string().required('RSVP ID is required'),
  guests: yup.array().of(
    yup.object().shape({
      firstName: yup.string().required('First Name is required'),
      lastName: yup.string().required('Last Name is required'),
      attending: yup.boolean().required('Attending status is required'),
      foodRestrictions: yup.string().oneOf(['None', 'Chicken', 'Vegan', 'Vegetarian']).required('Food Restriction is required'),
    })
  ).required(),
});

export const Dashboard: React.FC = () => {
  const [rsvpData, setRsvpData] = useState<RSVP[] | null>(null);
  const [openRow, setOpenRow] = useState<{ [key: string]: boolean }>({});
  const [openModal, setOpenModal] = useState(false);
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [editedRSVP, setEditedRSVP] = useState<RSVP | null>(null);

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      rsvpId: '',
      guests: [{ firstName: '', lastName: '', attending: false, foodRestrictions: 'None' }],
    },
  });

  const totalRSVPs = rsvpData?.length || 0;
  const totalAttendingGuests = rsvpData?.reduce((total, rsvp) => 
    total + rsvp.guests.filter(guest => guest.attending).length, 0
  ) || 0;
  const totalDeclinedGuests = rsvpData?.reduce((total, rsvp) => 
    total + rsvp.guests.filter(guest => !guest.attending).length, 0
  ) || 0;

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
    const rsvp = rsvpData?.find(r => r.rsvpId === rsvpId);
    if (rsvp) {
      setEditedRSVP(rsvp);
    }
  };

  const handleGuestChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { value: unknown }>, field: string) => {
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
  const handleCloseModal = () => {
    reset({
      rsvpId: '',
      guests: [{ firstName: '', lastName: '', attending: false, foodRestrictions: 'None' }],
    });
    setOpenModal(false);
  };

  const addAnotherGuest = () => {
    setValue('guests', [...(rsvpData?.[0]?.guests || []), { firstName: '', lastName: '', attending: false, foodRestrictions: 'None' }]);
  };

  const handleSubmitRSVP: SubmitHandler<FormData> = async (data) => {
    try {
      await axios.post("https://eqlh2tuls9.execute-api.us-east-1.amazonaws.com/PROD/rsvp", data, {
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
    if (!rsvpData) return;

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

        {/* Layout Section */}
        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">Navigation</Typography>
              <Box mt={2}>
                <Typography><a href="#" onClick={handleOpenModal}>Add RSVP</a></Typography>
                <Typography><a href="#">Venue Portal</a></Typography>
                <Typography><a href="https://booking.weddings-unlimited.com/manage?id=5028&surname=Sirias">Video/DJ Portal</a></Typography>
                <Typography><a href="https://tuxedo.josbank.com/wedding-tracker?utm_source=JAB&utm_medium=Ecomm&utm_campaign=TopNav&utm_terms=WedGroupManager&_gl=1*bm7jp3*_ga*MTA0MTQ3MTQ2MC4xNzI0Nzk5MTI1*_ga_T6SWH68K36*MTcyNDc5OTIzNC4xLjEuMTcyNDc5OTI0Ni4wLjAuMA..">Grooms Portal</a></Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={9}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                RSVP Data
              </Typography>
              <Grid container justifyContent="flex-end" sx={{ marginBottom: 2 }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#5d7a66', color: '#fff' }} // Custom green color
                onClick={handleDownloadExcel}
              >
                Download Excel
              </Button>
            </Grid>
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
                  {rsvpData?.map((rsvp) => (
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
                                          <FormControl fullWidth>
                                            <Select
                                              value={editedRSVP?.guests?.[index]?.attending ? "Yes" : "No"}
                                              onChange={(e) => {
                                                if (editedRSVP && editedRSVP.guests) {
                                                  const updatedGuests = [...editedRSVP.guests];
                                                  updatedGuests[index] = {
                                                    ...updatedGuests[index],
                                                    attending: e.target.value === "Yes", // Convert string to boolean
                                                  };
                                                  setEditedRSVP({
                                                    ...editedRSVP,
                                                    guests: updatedGuests,
                                                    rsvpId: editedRSVP.rsvpId, // Ensure rsvpId is provided
                                                  });
                                                }
                                              }}
                                            >
                                              <MenuItem value="Yes">Yes</MenuItem>
                                              <MenuItem value="No">No</MenuItem>
                                            </Select>
                                          </FormControl>
                                        ) : (
                                          guest.attending ? "Yes" : "No"
                                        )}
                                      </TableCell>

                                      <TableCell>
                                        {editingRow === rsvp.rsvpId ? (
                                          <FormControl fullWidth>
                                            <Select
                                              value={editedRSVP?.guests?.[index]?.foodRestrictions || 'None'}
                                              onChange={(e) => {
                                                if (editedRSVP && editedRSVP.guests) {
                                                  const updatedGuests = [...editedRSVP.guests];
                                                  updatedGuests[index] = {
                                                    ...updatedGuests[index],
                                                    foodRestrictions: e.target.value as FoodRestrictions, // Type safety
                                                  };
                                                  setEditedRSVP({
                                                    ...editedRSVP,
                                                    guests: updatedGuests,
                                                    rsvpId: editedRSVP.rsvpId, // Ensure rsvpId is provided
                                                  });
                                                }
                                              }}
                                            >
                                              <MenuItem value="None">None</MenuItem>
                                              <MenuItem value="Chicken">Chicken</MenuItem>
                                              <MenuItem value="Vegan">Vegan</MenuItem>
                                              <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                                            </Select>
                                          </FormControl>
                                        ) : (
                                          guest.foodRestrictions || 'None'
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
            <form onSubmit={handleSubmit(handleSubmitRSVP)}>
              <TextField
                fullWidth
                margin="normal"
                label="RSVP Pin"
                {...register("rsvpId")}
                error={!!errors.rsvpId}
                helperText={errors.rsvpId?.message}
              />
              {rsvpData?.[0]?.guests.map((guest, index) => (
                <Box key={index}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="First Name"
                    {...register(`guests.${index}.firstName`)}
                    error={!!errors.guests?.[index]?.firstName}
                    helperText={errors.guests?.[index]?.firstName?.message}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Last Name"
                    {...register(`guests.${index}.lastName`)}
                    error={!!errors.guests?.[index]?.lastName}
                    helperText={errors.guests?.[index]?.lastName?.message}
                  />
                </Box>
              ))}
              <Button onClick={addAnotherGuest} sx={{ marginTop: 2 }}>Add Another Guest</Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ marginTop: 2, float: 'right' }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
};
