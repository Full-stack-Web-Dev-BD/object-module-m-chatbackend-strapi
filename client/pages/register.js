import Link from "next/link";
import Head from "next/head";
import { Card, CardHeader, CardContent, Button } from "@material-ui/core";
import { useState } from "react";
import axios from "axios";
import { remoteProxyURL } from "../config";

//Register  UI

export default () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  // Submithandler
  const submitHandler = (e) => {
    e.preventDefault();
    if ((email, password, name)) {
      axios
        .post(`${remoteProxyURL}/auth/local/register`, {
          username: name,
          email,
          password,
        })
        .then((resp) => {
          window.location.href = "/";
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            setError({
              message: err.response.data.message[0].messages[0].message,
            });
          }
        });
    } else {
      return alert("Please Fill up  required filed !");
    }
  };
  return (
    <div>
      <Head>
        <title>Sign up </title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
          crossorigin="anonymous"
        />
      </Head>
      <div className="row">
        <div className="col-md-4 offset-md-4 mt-5">
          <Card>
            <CardHeader title="Sign Up" />
            {error.message ? (
              <div>
                <p className="text-danger text-center"> {error.message} </p>
              </div>
            ) : (
              ""
            )}
            <form onSubmit={(e) => submitHandler(e)}>
              <CardContent>
                <input
                  onChange={(e) => setName(e.target.value)}
                  className=" mb-3 form-control"
                  placeholder="Name"
                  type="text"
                />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className=" mb-3 form-control"
                  placeholder="Email"
                  type="email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className=" mb-3 form-control"
                  placeholder="Password"
                  type="password"
                />
                <div>
                  <Button variant="contained" color="info" type="submit">
                    Sign Up
                  </Button>
                  <div className="mt-4">
                    <p>
                      Already have account ?
                      <Link href="/">
                        <a> Go to Login</a>
                      </Link>
                    </p>
                  </div>
                </div>
              </CardContent>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};
