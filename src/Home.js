import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home(props) {
  console.log(props);
  const handleLogout = () => {
    sessionStorage.removeItem("Auth Token");
    navigate("/login");
  };
  let navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    console.log(authToken);
    if (authToken) {
      navigate("/home");
    }

    if (!authToken) {
      navigate("/register");
    }
  }, [navigate]);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [setUsers] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/")
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setUsers(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  });
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <br />
        <br />

        <div class="row ml-3" style={{ width: "2520px", height: "100%", marginLeft: "150px"}}>
          <div class="col-sm-6 mt-5">
            <div class="card">
              <div class="card-body">
                <button
                  className="btn btn-primary"
                  onClick={handleLogout}
                  style={{ float: "right" }}
                >
                  Logout
                </button>

                <br />
                <br />
                <div class="card-header">
                  <h3>Home</h3>
                </div>

                <br />

                <table
                  className="table table-striped"
                  style={{ backgroundColor: "white" }}
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>ID</th>
                      <th>Recipe Name</th>
                      <th>Ingredients</th>
                      <th>Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.smiya.map((e, i) => {
                      return (
                        <>
                          <tr>
                            <td></td>
                            <td>{e.id}</td>
                            <td>{e.recipeName}</td>
                            <td>{e.ingredients}</td>
                            <td>{e.method}</td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// return (
//   <div>
//     Home Page
//     <button onClick={handleLogout}>Log out</button>
//   </div>
// );
