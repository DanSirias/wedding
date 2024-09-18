import React, { useEffect, useState } from "react";
import {
  Container, Grid, Card, CardContent, Typography, Box, Paper,
  Table, TableBody, TableCell, TableHead, TableRow, IconButton, Collapse, Button, Modal, TextField, FormControl, Select, MenuItem
} from "@mui/material";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SetMealIcon from '@mui/icons-material/SetMeal';  // Import the SetMealIcon
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

  const { register, handleSubmit, formState: { errors }, control, setValue, reset } = useForm<FormData>({
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<RSVP[]>(`${apiUrl}?lastName=sirias`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
          },
        });
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

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        {/* Table for RSVP Data */}
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
                {rsvpData?.map((rsvp) => (
                  <React.Fragment key={rsvp.rsvpId}>
                    <TableRow>
                      <TableCell>
                        <IconButton size="small" onClick={() => toggleRow(rsvp.rsvpId)}>
                          {openRow[rsvp.rsvpId] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        {rsvp.rsvpId}
                        {/* Show SetMeal icon if any guest has foodRestrictions other than "None" */}
                        {rsvp.guests.some(guest => guest.foodRestrictions !== 'None') && (
                          <SetMealIcon sx={{ ml: 1, color: '#aed581' }} />  // Add icon with margin-left
                        )}
                      </TableCell>
                      <TableCell>{rsvp.lastName}</TableCell>
                      <TableCell>{rsvp.email}</TableCell>
                      <TableCell>{rsvp.phone}</TableCell>
                      <TableCell>{rsvp.comments || ''}</TableCell>
                    </TableRow>

                    {/* Expandable Guests Table */}
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
                                  <TableRow
                                    key={index}
                                    sx={{
                                      backgroundColor: guest.attending ? 'transparent' : '#ef9a9a'  // Conditional background color
                                    }}
                                  >
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
      </Container>
    </ThemeProvider>
  );
};
