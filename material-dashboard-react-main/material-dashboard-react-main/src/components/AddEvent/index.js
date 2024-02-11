import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import axios from "axios";

function AddEvent() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [type, setType] = useState(""); // State for dropdown value
  const [description, setDescription] = useState(""); // State for description

  const url = "http://localhost:8009/api/data/VolunteersEmail"; // Conditionally set the URL based on the selected type

  const data = {
    name: name,
    email: email,
    password: pass,
    phone: "", // Add phone field value if needed
    address: "", // Add address field value if needed
    description: type === "organization" ? description : "Expertise: " + description, // Conditionally set description based on type
  };

  const handleSignUp = () => {
    axios
      .post(url)
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Create Event
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Event creation
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Organisation Id"
                variant="standard"
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Title"
                variant="standard"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Budget"
                variant="standard"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="No Of Voluenteer Required"
                variant="standard"
                fullWidth
                onChange={(e) => setPass(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Event Location"
                variant="standard"
                fullWidth
                onChange={(e) => setPass(e.target.value)}
              />
            </MDBox>
            {/* <MDBox mb={2}>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Select Type</option>
                <option value="organization">Organization</option>
                <option value="volunteer">Volunteer</option>
              </select>
            </MDBox> */}
            <MDBox mb={2}>
              <MDInput
                type="text"
                label={"Description"}
                variant="standard"
                fullWidth
                multiline
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSignUp}>
                Sign Up
              </MDButton>
            </MDBox>
            {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default AddEvent;
