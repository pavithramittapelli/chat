import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import { Container, Stack, Typography } from '@mui/material';

const LoginContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '0', // Removed minimum height
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4),
    border: `1px solid #555`, // Added outline
    borderRadius: theme.shape.borderRadius, // Optional for rounded corners
    width: '750px',
    maxWidth: '100%', // Ensure container adapts to smaller screens
    margin: 'auto', // Center horizontally on all screen sizes
}));

function Login() {
    const theme = useTheme();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
        // Implement your login logic here
    };

    return (
        <LoginContainer>
            <form onSubmit={handleSubmit}>
                <Stack direction={'column'} spacing={3} p={2}>
                    <Typography variant='h4' sx={{ textAlign: 'center' }}>
                        Login
                    </Typography>
                    {/* Rest of the form elements (TextField, Button, Link) */}
                    <TextField
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{ width: '700px' }} // Set TextField width
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{ width: '700px' }} // Set TextField width
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, p: 2, fontWeight: 'bold', fontSize: '1em', justifyContent: 'center' }}>
                        Sign In
                    </Button>
                </Stack>
                <Stack direction={'row'} spacing={3} justifyContent={'flex-end'} p={2}>
                    <Link href="#" underline="none" sx={{ mt: 1 }}>
                        Forgot Password?
                    </Link>
                    <Link href="/register" underline="none" sx={{ mt: 1 }}>
                        Create Account
                    </Link>
                </Stack>
            </form>
        </LoginContainer>
    );
}

export default Login;
