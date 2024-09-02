import React, { useState } from 'react';
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

export const RSVPForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      guests: null,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.example.com/rsvp', {
        method: 'POST',
        headers: {
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
    if (!formData || !formData.guests) {
      alert('No data to download');
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(formData.guests);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Guests');
    XLSX.writeFile(workbook, 'RSVP_Guests.xlsx');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>RSVP Form</Typography>

        <Grid container justifyContent="flex-end" sx={{ marginBottom: 2 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#5d7a66', color: '#fff' }} // Custom green color
            onClick={handleDownloadExcel}
          >
            Download
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
      </Container>
    </ThemeProvider>
  );
};

export default RSVPForm;
