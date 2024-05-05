import { Routes, Route, Link } from 'react-router-dom';

import EditorPage from '../pages/EditorPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import { Grid } from '@mui/joy';

const App = () => {
    return (
        <Grid container spacing={2} id="main">
            <Grid></Grid>
            {/* <h1>Hello</h1> */}
            <Link to="/">Editor</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Routes>
                <Route path="/" element={<EditorPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                {/* <Route path="*" element={<EditorPage />} /> */}
            </Routes>
        </Grid>
    );
};

export default App;
