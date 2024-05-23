// React
import { useState } from "react";

// Mantine
import { useMantineTheme, Button, Stack, TextInput, Text, Title, Anchor, PasswordInput } from "@mantine/core";

// Third-party packages
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const LoginPage = () => {
  // useState
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginFail, setIsLoginFail] = useState(false);
  const [isServerError, setIsServerError] = useState(false);

  // React Router hooks
  const navigate = useNavigate(); // For redirecting to a different page on the front-end
  const [searchParams, setSearchParams] = useSearchParams(); // For extracting the query params from the URL
  console.log("SEARCH PARAMS");

  const theme = useMantineTheme();

  const handleSubmitForm = async () => {
    try {
      const res = await axios({ method: "post", url: "http://localhost:3000/loginUser", data: { username, password }, withCredentials: true });
      if (res.data.username) {
        navigate("/");
      } else {
        setIsLoginFail(true);
        setIsServerError(false);
      }
    } catch (err) {
      setIsLoginFail(false);
      setIsLoginFail(true);
    }
  };

  return (
    <>
      <Stack w="400" mx="auto" mt="30">
        {searchParams.get("success") && (
          <Text size="sm" fw="bold" c="green">
            Account successfully created! You may now log in.
          </Text>
        )}
        <Title>Sign into your account.</Title>

        <TextInput label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <PasswordInput label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {isLoginFail && (
          <Text c="red" size="xs">
            Username or password is incorrect.
          </Text>
        )}
        {isServerError && (
          <Text c="red" size="xs">
            A server error occurred. Please try again.
          </Text>
        )}
        <Button onClick={handleSubmitForm}>Log In</Button>
        <Text size="sm" ta="center">
          Don't have an account? <Anchor onClick={() => navigate("/register")}>Create one here.</Anchor>
        </Text>
        <Text size="sm" ta="center">
          <Anchor onClick={() => navigate("/")}>Home</Anchor>
        </Text>
      </Stack>
    </>
  );
};

export default LoginPage;
