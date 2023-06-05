
import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import { useState, createContext, useContext } from "react";

export default function Review({ review }) {
  // const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Total
      </Typography>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Start Date: {review.startDate}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Final Date: {review.finalDate}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Final Date: {review.price}
          </Typography>
        </ListItem>
      </List>
      {/* <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Deliver To
                    </Typography>
                    <Typography gutterBottom>{addresses.join(', ')}</Typography>
                </Grid>
            </Grid> */}
    </React.Fragment>
  );
}
