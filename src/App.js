import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

import RecipeList from "./components/recipeList";

import User from "./user";

import Home from "./Home";
import Login from "./login";
import Register from "./register";
import { Routes, Route, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
function App() {
  const [email] = useState("");
  const [password] = useState("");
  let navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);

  const fetchData = async () => {
    axios
      .get("http://localhost:8000/api/v1/recipes")
      .then(function (response) {
        // handle success

        setRecipes(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  // useEffect(() => {
  //   fetchData();
  // }, []);
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    fetchData();

    if (authToken) {
      navigate("/home");
    }
  }, [navigate]);
  const handleAction = (id) => {
    const authentication = getAuth();
    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password).then(
        (response) => {
          navigate("/home");
          sessionStorage.setItem(
            "Auth Token",
            response._tokenResponse.refreshToken
              .catch((error) => {
                if (error.code === "auth/wrong-password") {
                  toast.error("Please check the Password");
                }
                if (error.code === "auth/user-not-found") {
                  toast.error("Please check the Email");
                }
              })
              .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                  toast.error("Email Already in Use");
                }
              })
          );
        }
      );
    }
    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password).then(
        (response) => {
          navigate("/home");
          sessionStorage.setItem(
            "Auth Token",
            response._tokenResponse.refreshToken
              .catch((error) => {
                if (error.code === "auth/wrong-password") {
                  toast.error("Please check the Password");
                }
                if (error.code === "auth/user-not-found") {
                  toast.error("Please check the Email");
                }
              })
              .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                  toast.error("Email Already in Use");
                }
              })
          );
        }
      );
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/recipe"
          element={<RecipeList title="Recipe" smiya={recipes} />}
        />
        <Route path="/home" element={<Home title="Recipe" smiya={recipes} />} />

        <Route path="/" element={<Login title="Login" />} />
        <Route path="/login" element={<Login title="Login" />} />
        <Route path="/register" element={<Register title="Register" />} />

        <Route path="/user/:id" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
