import { useState } from 'react';
import axios from 'axios';

type FormProps = {
    username: string;
    email: string;
    password: string;
    conPassword: string;
};

const RegisterPage = () => {
    const [form, setForm] = useState<FormProps>({ username: '', email: '', password: '', conPassword: '' });

    const handleChange = (input: any) => {
        setForm({ ...form, [input.name]: input.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        axios
            .post('http://localhost:3000/register', form)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => console.log(error));
        if (form.password !== form.conPassword) {
            console.log('PASSWORDS DO NOT MATCH');
        } else {
        }
    };

    return (
        <div id="register-page">
            <h1>Register</h1>
            <form action="/register" method="post">
                <input type="text" id="username" name="username" placeholder="Username" value={form.username} onChange={(e) => handleChange(e.target)} />
                <input type="email" id="email" name="email" placeholder="Email" value={form.email} onChange={(e) => handleChange(e.target)} />
                <input type="password" id="password" name="password" placeholder="Password" value={form.password} onChange={(e) => handleChange(e.target)} />
                <input type="password" id="con-password" name="conPassword" placeholder="Confirm Password" value={form.conPassword} onChange={(e) => handleChange(e.target)} />
                <button type="submit" onClick={(e) => handleSubmit(e)}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
