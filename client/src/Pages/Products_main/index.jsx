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
        <div className="content-container" style={{ marginBottom: "4%" }}>
          <Container maxWhidth="false">
            <Grid container spacing={6} marginTop="2px">
              <Grid item xs={4}>
                <MediaCard />
              </Grid>
              <Grid item xs={4}>
                <MediaCard />
              </Grid>
              <Grid item xs={4}>
                <MediaCard />
              </Grid>
              <Grid item xs={4}>
                <MediaCard />
              </Grid>
              <Grid item xs={4}>
                <MediaCard />
              </Grid>
              <Grid item xs={4}>
                <MediaCard />
              </Grid>
              <Grid item xs={4}>
                <MediaCard />
              </Grid>
              <Grid item xs={4}>
                <MediaCard />
              </Grid>
              <Grid item xs={4}>
                <MediaCard />
              </Grid>
              <Grid item xs={4}>
                <MediaCard />
              </Grid>
              <Grid item xs={4}>
                <MediaCard />
              </Grid>
              <Grid item xs={4}>
                <MediaCard />
              </Grid>
              <Grid item xs={4}>
                <MediaCard />
              </Grid>
              <Grid item xs={4}>
                <MediaCard />
              </Grid>
              <Grid item xs={4}>
                <MediaCard />
              </Grid>
              <Grid item xs={4}>
                <MediaCard />
              </Grid>
              <Grid item xs={4}>
                <MediaCard />
              </Grid>
              <Grid item xs={4}>
                <MediaCard />
              </Grid>
            </Grid>
          </Container>
        </div>
        <Footer />
      </>
    </div>
  );
};

export default Main;
