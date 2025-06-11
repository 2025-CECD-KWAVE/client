import React, { useState } from 'react';
import {
    LoginContainer,
    LogoImage,
    Input,
    Button,
    Form,
    Label,
} from './LoginStyle';

import { useNavigate } from 'react-router-dom';
import kwaveLogo from '../../assets/kwave_logo.png';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const token = response.headers.get('Authorization');

            if (token) {
                localStorage.setItem('jwtToken', token);
                navigate('/');
            } else {
                console.warn('응답에 JWT 토큰이 없습니다.');
            }

        } catch (err) {
            console.error('로그인 실패:', err);
        }
    };

    return (
        <LoginContainer>
            <LogoImage src={kwaveLogo} alt="K-WAVE Logo" />
            <Form onSubmit={handleSubmit}>
                <Label>username</Label>
                <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <Label>password</Label>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit">Sign in</Button>
            </Form>
        </LoginContainer>
    );
}
