import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ActionIcon, Button, Modal, PasswordInput, Space, Text, TextInput, Title, rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { IconLogin2 } from "@tabler/icons-react";
import iconStyle from "../utils/iconStyle";

const LoginButton = ({ setIsLoggedIn }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginFail, setIsLoginFail] = useState(false);
  const [isServerError, setIsServerError] = useState(false);

  // React Router hooks
  const navigate = useNavigate(); // For redirecting to a different page on the front-end
  // const [searchParams, setSearchParams] = useSearchParams(); // For extracting the query params from the URL
  // console.log("SEARCH PARAMS");

  // const theme = useMantineTheme();

  const handleSubmitForm = async () => {
    try {
      const res = await axios({ method: "post", url: "http://localhost:3000/loginUser", data: { username, password }, withCredentials: true });
      if (res.data.username) {
        // navigate("/");
        setIsLoggedIn(true);
        close();
        notifications.show({
          color: "green",
          title: "Success!",
          message: "You have successfully logged into your account.",
        });
      } else {
        setIsLoginFail(true);
        setIsServerError(false);
        notifications.show({
          color: "red",
          title: "Oops!",
          message: "Username and/or password is incorrect. Please try again.",
        });
      }
    } catch (err) {
      setIsLoginFail(false);
      setIsLoginFail(true);
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        transitionProps={{ transition: "fade", duration: 200, timingFunction: "ease" }}
      >
        {/* <TextInput label="Username" value={username} onChange={(e) => setUsername(e.target.value)} withAsterisk />
        <PasswordInput mt="md" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} withAsterisk />
        <Button mt="md" w="100%" onClick={handleSubmitForm}>
          Log In
        </Button> */}

        <Title order={1} size="h2">
          Sign into your account
        </Title>
        <Space h="md" />
        <TextInput label="Username" value={username} onChange={(e) => setUsername(e.target.value)} withAsterisk />
        <Space h="sm" />
        <PasswordInput label="Password" value={password} onChange={(e) => setPassword(e.target.value)} withAsterisk />
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
        <Space h="sm" />
        <Button w="100%" onClick={handleSubmitForm}>
          Log In
        </Button>
      </Modal>

      <ActionIcon variant="transparent" onClick={open}>
        <IconLogin2 style={iconStyle} />
      </ActionIcon>
    </>
  );
};

export default LoginButton;
