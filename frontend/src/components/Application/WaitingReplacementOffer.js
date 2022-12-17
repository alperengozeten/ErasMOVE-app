import * as React from "react";
import {
    Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import PropTypes from 'prop-types';


export const WaitingReplacementOffer = ({offer}) => {
//   const offer = {
//     from: "Eray Tüzün",
//     student: "Alperen Gözeten",
//     university: "Bilkent University",
//     status: "Waiting for your response...",
//     info: "You have a replacement offer for the Exchange Program.",
//   };

  return (
    <form autoComplete="off">
      <Card>
        <CardHeader
          subheader="You have a replacement offer to be answered."
          title="Replacement Offer"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                disabled
                label="From"
                name="from"
                value={offer.from}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                disabled
                label="To"
                name="to"
                value={offer.student}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                disabled
                label="New University"
                name="uni"
                value={offer.university}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                disabled
                label="Status"
                name="status"
                value={offer.status}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                disabled
                label="Info"
                name="info"
                value={offer.info}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Button color="success" variant="contained">
                Accept
              </Button>
            </Grid>
            <Grid item md={6} xs={12}>
              <Button color="error" variant="contained">
                Decline
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
    </form>
  );
};

WaitingReplacementOffer.propTypes = {
  offer: PropTypes.object,
};
