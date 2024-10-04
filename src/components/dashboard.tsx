import React, { useEffect, useState } from "react";
import {
  Container, Grid, Card, CardContent, Typography, Box, Paper,
  Table, TableBody, TableCell, TableHead, TableRow, IconButton, Collapse, Button, Modal, TextField, FormControl, Select, MenuItem
} from "@mui/material";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SetMealIcon from '@mui/icons-material/SetMeal';
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // Import add user icon
import * as XLSX from 'xlsx';
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
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
  foodRestrictions: FoodRestrictions;
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

const apiUrl = process.env.REACT_APP_API_RSVP;

export const Dashboard: React.FC = () => {
  const [rsvpData, setRsvpData] = useState<RSVP[] | null>(null);
  const [openRow, setOpenRow] = useState<{ [key: string]: boolean }>({});
  const [openModal, setOpenModal] = useState(false);
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [editedRSVP, setEditedRSVP] = useState<RSVP | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<RSVP[]>([]);

  const { register, handleSubmit, formState: { errors }, control, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      rsvpId: '',
      guests: [{ firstName: '', lastName: '', attending: false, foodRestrictions: 'None' }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "guests"
  });

  const totalRSVPs = rsvpData?.length || 0;
  const totalAttendingGuests = rsvpData?.reduce((total, rsvp) =>
    total + rsvp.guests.filter(guest => guest.attending).length, 0
  ) || 0;
  const totalDeclinedGuests = rsvpData?.reduce((total, rsvp) =>
    total + rsvp.guests.filter(guest => !guest.attending).length, 0
  ) || 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<RSVP[]>(`${apiUrl}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('id_token')}`,
          },
        });
        setRsvpData(response.data);
        setFilteredData(response.data);
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (rsvpData) {
      const filtered = rsvpData.filter(rsvp =>
        rsvp.rsvpId.toLowerCase().includes(query) ||  
        rsvp.guests.some(guest =>
          guest.firstName.toLowerCase().includes(query) ||
          guest.lastName.toLowerCase().includes(query)
        )
      );
      setFilteredData(filtered);
    }
  };

  const handleEdit = (rsvpId: string) => {
    setEditingRow(rsvpId);
    const rsvp = rsvpData?.find(r => r.rsvpId === rsvpId);
    if (rsvp) {
      setEditedRSVP({ ...rsvp, guests: [...rsvp.guests] });
    }
  };

  const handleGuestChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: string } }, field: string) => {
    if (editedRSVP) {
      const updatedGuests = [...editedRSVP.guests];
      updatedGuests[index] = { ...updatedGuests[index], [field]: event.target.value };
      setEditedRSVP({ ...editedRSVP, guests: updatedGuests });
    }
  };

  const handleAddGuestInEdit = () => {
    if (editedRSVP) {
      setEditedRSVP({
        ...editedRSVP,
        guests: [
          ...editedRSVP.guests,
          { firstName: '', lastName: '', attending: false, foodRestrictions: 'None' }
        ],
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
    setEditedRSVP(null);
  };

  const handleUpdate = async () => {
    if (!editedRSVP) return;

    try {
      await axios.put(`${apiUrl}`, editedRSVP, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
        },
      });
      setEditingRow(null);
      setEditedRSVP(null);
      const response = await axios.get<RSVP[]>(`${apiUrl}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
        },
      });
      setRsvpData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error updating RSVP", error);
    }
  };

  const handleSubmitRSVP: SubmitHandler<FormData> = async (data) => {
    try {
      await axios.post(`${apiUrl}`, data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
        },
      });
      handleCloseModal();
    } catch (error) {
      console.error("Error adding RSVP", error);
    }
  };

  const handleDownloadExcel = () => {
    if (!rsvpData) return;
  
    const formattedData = rsvpData.flatMap((rsvp) => {
      return rsvp.guests.map((guest) => ({
        rsvpId: rsvp.rsvpId,
        firstName: guest.firstName,
        lastName: guest.lastName,
        email: rsvp.email,
        phone: rsvp.phone,
        comments: rsvp.comments || '',
        attending: guest.attending ? "Yes" : "No",
        foodRestrictions: guest.foodRestrictions || 'None',
      }));
    });
  
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "RSVP Data");
  
    XLSX.writeFile(workbook, "RSVP_Data.xlsx");
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    reset({
      rsvpId: '',
      guests: [{ firstName: '', lastName: '', attending: false, foodRestrictions: 'None' }],
    });
    setOpenModal(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
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

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">Navigation</Typography>
              <Box mt={2}>
                <Typography><a href="#" onClick={handleOpenModal}>Add RSVP</a></Typography>
                <Typography><a href="https://clientportal.totalpartyplanner.com">Venue Portal</a></Typography>
                <Typography><a href="https://booking.weddings-unlimited.com">Video/DJ Portal</a></Typography>
                <Typography><a href="https://vibodj.app.link">DJ Portal</a></Typography>
                <Typography><a href="https://studioclient.com">Photography Portal</a></Typography>
                <Typography><a href="https://tuxedo.josbank.com">Grooms Portal</a></Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={9}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                RSVP Data
              </Typography>

              <Grid container justifyContent="space-between" sx={{ marginBottom: 2 }}>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: '#5d7a66', color: '#fff' }}
                  onClick={handleDownloadExcel}
                >
                  Download Excel
                </Button>
                <TextField
                  label="Search RSVP ID or Guest Name"
                  variant="outlined"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  sx={{ width: 300 }}
                />
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
                  {filteredData
                    .sort((a, b) => {
                      const aHasDeclinedAllGuests = a.guests.every(guest => !guest.attending);
                      const bHasDeclinedAllGuests = b.guests.every(guest => !guest.attending);
                      
                      return aHasDeclinedAllGuests === bHasDeclinedAllGuests
                        ? 0
                        : aHasDeclinedAllGuests
                        ? 1
                        : -1;
                    })
                    .map((rsvp) => {
                      const hasDeclinedAllGuests = rsvp.guests.every(guest => !guest.attending);
                      const hasFoodRestrictions = rsvp.guests.some(guest => guest.foodRestrictions !== 'None');

                      return (
                        <React.Fragment key={rsvp.rsvpId}>
                          <TableRow
                            sx={{
                              backgroundColor: hasDeclinedAllGuests ? '#ef9a9a' : 'transparent',
                            }}
                          >
                            <TableCell>
                              <IconButton size="small" onClick={() => toggleRow(rsvp.rsvpId)}>
                                {openRow[rsvp.rsvpId] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                              </IconButton>
                            </TableCell>
                            <TableCell>
                              {rsvp.rsvpId}
                              {hasFoodRestrictions && (
                                <SetMealIcon sx={{ ml: 1, color: '#ff6f00' }} />
                              )}
                            </TableCell>
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
                                      {editedRSVP?.guests.map((guest, index) => (
                                        <TableRow key={index}>
                                          <TableCell>
                                            {editingRow === rsvp.rsvpId ? (
                                              <TextField
                                                fullWidth
                                                value={guest.firstName || ''}
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
                                                value={guest.lastName || ''}
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
                                                  value={guest.attending ? "Yes" : "No"}
                                                  onChange={(e) => handleGuestChange(index, { target: { value: e.target.value } }, 'attending')}
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
                                                  value={guest.foodRestrictions || 'None'}
                                                  onChange={(e) => handleGuestChange(index, { target: { value: e.target.value } }, 'foodRestrictions')}
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
                                  {editingRow === rsvp.rsvpId && (
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                      <IconButton onClick={handleAddGuestInEdit} color="primary" aria-label="add guest">
                                        <PersonAddIcon />
                                      </IconButton>
                                      <Box>
                                        <Button variant="contained" color="primary" onClick={handleUpdate}>
                                          Update
                                        </Button>
                                        <Button variant="contained" color="secondary" onClick={handleCancelEdit} sx={{ ml: 2 }}>
                                          Cancel
                                        </Button>
                                      </Box>
                                    </Box>
                                  )}
                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      );
                    })}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>

        <Modal open={openModal} onClose={handleCloseModal}>
          <Box sx={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600, maxHeight: '80vh',
            bgcolor: 'background.paper', borderRadius: 2,
            boxShadow: 24, p: 4, overflowY: 'auto'
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
              {fields.map((field, index) => (
                <Grid container spacing={2} key={field.id}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="First Name"
                      {...register(`guests.${index}.firstName`)}
                      error={!!errors.guests?.[index]?.firstName}
                      helperText={errors.guests?.[index]?.firstName?.message}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Last Name"
                      {...register(`guests.${index}.lastName`)}
                      error={!!errors.guests?.[index]?.lastName}
                      helperText={errors.guests?.[index]?.lastName?.message}
                    />
                  </Grid>
                </Grid>
              ))}
              <Button onClick={() => append({ firstName: '', lastName: '', attending: false, foodRestrictions: 'None' })} sx={{ marginTop: 2 }}>
                Add Another Guest
              </Button>
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
