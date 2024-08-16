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
} from '@mui/material';

interface Guest {
  firstName: string; // Must be a string, cannot be undefined
  lastName: string; // Must be a string, cannot be undefined
  foodRestrictions?: string; // Optional, can be undefined
  attending: string; // Must be a string, cannot be undefined
}

interface FormData {
  rsvpId: string; // Must be a string, cannot be undefined
  lastName: string; // Must be a string, cannot be undefined
  email: string; // Must be a string, cannot be undefined
  phone: string; // Must be a string, cannot be undefined
  comments?: string; // Optional, can be undefined
  guests: Guest[]; // Must be an array of Guest objects
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

  const fetchRSVPData = async (rsvpId: string, lastName: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://eqlh2tuls9.execute-api.us-east-1.amazonaws.com/PROD/rsvp?pin=${rsvpId}&lastName=${lastName}`);
      
      if (!response.ok) {
        throw new Error('Error fetching data. Please check your PIN and Last Name.');
      }
  
      const data: FormData = await response.json();
      console.log(data); 
      setFormData(data);
      
      // Populate form fields with fetched data
      setValue('email', data.email);
      setValue('phone', data.phone);
      setValue('comments', data.comments);
      data.guests.forEach((guest: Guest, index: number) => {
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
      // Handle form submission logic here
      console.log('Form Submitted', data);
    } catch (err) {
      setError('Error submitting RSVP. Please try again or contact us.');
    }
  };

  const handleClear = () => {
    reset();
    setFormData(null);
  };

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
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
            <TextField
              label="Last Name"
              {...register('lastName')}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => fetchRSVPData(
                (document.querySelector('input[name="rsvpId"]') as HTMLInputElement).value,
                (document.querySelector('input[name="lastName"]') as HTMLInputElement).value
              )}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'View Invite Now'}
            </Button>
            {error && <Typography color="error">{error}</Typography>}
            {formData && (
              <>
                <Typography variant="h6">General Info</Typography>
                <TextField
                  label="RSVP Pin"
                  value={formData.rsvpId}
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  label="Email"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  label="Phone"
                  {...register('phone')}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
                <TextField
                  label="Comments"
                  {...register('comments')}
                  error={!!errors.comments}
                  helperText={errors.comments?.message}
                  fullWidth
                  multiline
                  rows={2}
                />
                <Typography variant="h6">Guests List</Typography>
                {formData.guests.map((guest : any, index : any) => (
                  <Box key={index} sx={{ border: 1, borderColor: 'lightgray', p: 2, mb: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          label="First Name"
                          value={guest.firstName}
                          InputProps={{ readOnly: true }}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Last Name"
                          value={guest.lastName}
                          InputProps={{ readOnly: true }}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <InputLabel>Attending?</InputLabel>
                          <Select
                            {...register(`guests.${index}.attending` as const)}
                            defaultValue={guest.attending}
                          >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      {guest.attending === 'Yes' && (
                        <Grid item xs={6}>
                          <FormControl fullWidth>
                            <InputLabel>Food Restrictions</InputLabel>
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
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                ))}
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleClear}
                  >
                    Clear
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    RSVP Now
                  </Button>
                </Stack>
              </>
            )}
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default RSVP;
