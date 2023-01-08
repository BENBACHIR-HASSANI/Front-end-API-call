import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "./firebase-config";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onSubmitLogin = (e) => {
    e.preventDefault();
    console.log("clicked");

    console.log("email and password are" + email + password);
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response);
        sessionStorage.setItem(
          "Auth Token",
          response._tokenResponse.refreshToken
        );
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/wrong-password") {
          console.log(error);
          toast.error("Please check the Password");
        }
        if (error.code === "auth/user-not-found") {
          toast.error("Please check the Email");
        }
      });
    navigate("/home");
  };
  let navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (authToken) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div style={{ marginLeft: "350px", marginTop: "30px" }}>
      <div class="row ml-5">
        <div class="col-sm-8 mt-5">
          <div class="card">
            <div class="card-body">
              <div class="card-header">
                <h3>Login</h3>
              </div>
              <div class="card-body">
                <Form onSubmit={onSubmitLogin}>
                  <div class="form-row">
                    <Form.Group>
                      <div class="form-group col-md-12">
                        <Form.Label>Email :</Form.Label>
                        <Form.Control
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          name="email"
                          placeholder="Email"
                        />
                      </div>
                    </Form.Group>
                    <Form.Group>
                      <div class="form-group col-md-12">
                        <Form.Label>Password :</Form.Label>
                        <Form.Control
                          type="password"
                          className="form-control"
                          onChange={onChangePassword}
                          name="password"
                          placeholder="password"
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <br />
                  <button type="submit" class="btn btn-primary">
                    Login
                  </button>
                </Form>
                {/* <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="email"
          label="Enter the Email"
          variant="outlined"
          onChange={onChangeEmail}
        />
        <TextField
          id="password"
          label="Enter the Password"
          variant="outlined"
          onChange={onChangePassword}
        />
      </Box> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
