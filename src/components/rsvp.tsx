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
  firstName: string;
  lastName: string;
  foodRestrictions: string;
  isAttending: boolean;
}

interface FormData {
  rsvpId: string;
  lastName: string;
  email: string;
  phone: string;
  comments: string;
  guests: Guest[];
}

const schema = yup.object().shape({
  rsvpId: yup.string().required('RSVP ID is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  comments: yup.string(),
  guests: yup.array().of(
    yup.object().shape({
      firstName: yup.string().required('First Name is required'),
      lastName: yup.string().required('Last Name is required'),
      foodRestrictions: yup.string().oneOf(['none', 'Chicken', 'Vegan', 'Vegetarian']),
      isAttending: yup.boolean().required('Attending status is required'),
    })
  ).required(),
});

export const RSVP: React.FC = () => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const fetchRSVPData = async (pin: string, lastName: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://eqlh2tuls9.execute-api.us-east-1.amazonaws.com/PROD/rsvp?pin=${pin}&lastName=${lastName}`);
      
      if (!response.ok) {
        throw new Error('Error fetching data. Please check your PIN and Last Name.');
      }

      const data = await response.json();
      const parsedData: FormData = {
        rsvpId: data[0].rsvpId.S,
        lastName: data[0].lastName.S,
        email: data[0].email.S,
        phone: data[0].phone.S,
        comments: data[0].comments.S,
        guests: data[0].guests.L.map((guest: any) => ({
          firstName: guest.M.firstName.S,
          lastName: guest.M.lastName.S,
          foodRestrictions: guest.M.foodRestrictions.S,
          isAttending: guest.M.isAttending.BOOL,
        }))
      };
      
      setFormData(parsedData);
      
      // Populate form fields with fetched data
      setValue('rsvpId', parsedData.rsvpId);
      setValue('lastName', parsedData.lastName);
      setValue('email', parsedData.email);
      setValue('phone', parsedData.phone);
      setValue('comments', parsedData.comments);
      parsedData.guests.forEach((guest, index) => {
        setValue(`guests.${index}.firstName`, guest.firstName);
        setValue(`guests.${index}.lastName`, guest.lastName);
        setValue(`guests.${index}.foodRestrictions`, guest.foodRestrictions);
        setValue(`guests.${index}.isAttending`, guest.isAttending);
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
              label="RSVP ID"
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
                  label="RSVP ID"
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
                {formData.guests.map((guest, index) => (
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
                            {...register(`guests.${index}.isAttending` as const)}
                            defaultValue={guest.isAttending ? "Yes" : "No"}
                          >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      {guest.isAttending && (
                        <Grid item xs={6}>
                          <FormControl fullWidth>
                            <InputLabel>Food Restrictions</InputLabel>
                            <Select
                              {...register(`guests.${index}.foodRestrictions` as const)}
                              defaultValue={guest.foodRestrictions}
                            >
                              <MenuItem value="none">None</MenuItem>
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
