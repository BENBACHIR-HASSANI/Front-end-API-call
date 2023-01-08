import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
// import { auth } from "./firebase-config";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { auth } from "./firebase-config";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onSubmitRegister = (e) => {
    createUserWithEmailAndPassword(auth, email, password).then((response) => {
      sessionStorage.setItem("Auth Token", response._tokenResponse);
    });
    e.preventDefault();
    console.log("clicked");
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
                <h3>Register</h3>
              </div>
              <div class="card-body">
                <Form onSubmit={onSubmitRegister}>
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
                    Register
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
