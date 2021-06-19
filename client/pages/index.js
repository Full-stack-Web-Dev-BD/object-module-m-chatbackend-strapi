import Link from "next/link";
import Head from "next/head";
import { Card, CardHeader, CardContent, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { remoteProxyURL } from "../config";

//Register  UI

export default ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  // Submithandler
  const submitHandler = (e) => {
    e.preventDefault();
    if ((email, password)) {
      axios
        .post(`${remoteProxyURL}/auth/local`, {
          identifier: email,
          password: password,
        })
        .then((resp) => {
          console.log(resp.data);
          window.localStorage.setItem("chatapptoken", resp.data.jwt);
          window.location.href = "/chatpage";
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
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
        <title>Login </title>
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
            <CardHeader title="Login Here" />
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
                    Login
                  </Button>
                  <div className="mt-4">
                    <p>
                      Not Registered ?
                      <Link href="/register">
                        <a> Go to Register</a>
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
