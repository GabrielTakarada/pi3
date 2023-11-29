import React from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import MediaCard from "../../Components/Cards";
import { Grid } from "@mui/material";
import { Container } from "@mui/system";

const Main = () => {
  return (
    <div style={{ backgroundColor: "#F2DCC2" }}>
      <>
        <Navbar />
        <div className="content-container">
          <Container maxWhidth="false">
            <Grid container spacing={8} marginTop="2px">
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
              <Grid item xs={6}>
                <MediaCard />
              </Grid>
            </Grid>
          </Container>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <Footer />
      </>
    </div>
  );
};

export default Main;
