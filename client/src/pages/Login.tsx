import React, { useState } from "react";
import { TextField, FormControl, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"
import { postLogin } from "../api";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const { setAuth } = useAuth() as any;

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        setError("");
        setEmailError(false)
        setPasswordError(false)

        if (email == '') {
            setEmailError(true)
        }
        if (password == '') {
            setPasswordError(true)
        }

        if (email && password) {
            event.preventDefault();
            try {
                const response = await postLogin({
                    email,
                    password,
                });
                if (response?.errors)    {
                    setError(response?.message ?? 'Login Failed, please check your username and password and try again');
                } else {
                    setAuth(response);
                    navigate('/tasks');
                }
            } catch(ex) {
                console.log(ex);
            }
        }
    }

    return (
        <React.Fragment>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <h2>Login Form</h2>
                <TextField
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{ mb: 3 }}
                    fullWidth
                    value={email}
                    error={emailError}
                />
                <TextField
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="password"
                    value={password}
                    error={passwordError}
                    fullWidth
                    sx={{ mb: 3 }}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button variant="outlined" color="secondary" type="submit">Login</Button>

            </form>
            <small>Need an account? <Link to="/signup">Register here</Link></small>
        </React.Fragment>
    );
}

export default Login;