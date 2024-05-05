import { useState } from 'react';
import axios from 'axios';

type FormProps = {
    email: string;
    password: string;
};

const LoginPage = () => {
    const [form, setForm] = useState<FormProps>({ email: '', password: '' });

    const handleChange = (input: any) => {
        setForm({ ...form, [input.name]: input.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/getUser`, form);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div id="login-page">
            <h1>Login</h1>
            <form>
                <input type="email" id="email" name="email" placeholder="Email" value={form.email} onChange={(e) => handleChange(e.target)} />
                <input type="password" id="password" name="password" placeholder="Password" value={form.password} onChange={(e) => handleChange(e.target)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
