/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { indigo } from "@mui/material/colors";

export default function AddressForm({ handleNext, setDate }) {
  const [formDate, setFormDate] = useState({
    startDate: "",
    finalDate: "",
  });
  console.log(formDate);
  const [formErrors, setFormErrors] = useState({
    startDate: "",
    finalDate: "",
  });
  useEffect(() => {
    setDate({
      startDate: formDate.startDate,
      finalDate: formDate.finalDate,
    });
  }, [formDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate" || name === "finalDate") {
      setFormDate((prevFormDate) => ({
        ...prevFormDate,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Proceed to the next step or perform other actions
      handleNext();
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Validate startDate
    if (!formDate.startDate.trim()) {
      errors.startDate = "startDate is required";
      isValid = false;
    }

    // Validate finalDate
    if (!formDate.finalDate.trim()) {
      errors.finalDate = "finalDate code is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  return (
    <React.Fragment>
      <Typography variant="h6" color={indigo[900]} gutterBottom>
        Your Information
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="startDate"
              name="startDate"
              type="date"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
              value={formDate.startDate}
              onChange={handleChange}
              error={!!formErrors.startDate}
              helperText={formErrors.startDate}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="finalDate"
              name="finalDate"
              type="date"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              value={formDate.finalDate}
              onChange={handleChange}
              error={!!formErrors.finalDate}
              helperText={formErrors.finalDate}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="Use this address for payment details"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit" sx={{ mt: 3, ml: 1 }}>
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
