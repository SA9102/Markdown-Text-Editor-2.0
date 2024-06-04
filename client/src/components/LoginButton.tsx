// React
import { useState } from "react";

// Mantine
import { ActionIcon, Button, Modal, PasswordInput, Space, Text, TextInput, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";

// Tabler Icons
import { IconLogin2 } from "@tabler/icons-react";

// Other third-party packages
import axios from "axios";

// Utils
import iconStyle from "../utils/iconStyle";

type props = {
  setIsLoggedIn: (param: boolean) => void;
};

const LoginButton = ({ setIsLoggedIn }: props) => {
  const [opened, { open, close }] = useDisclosure(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginFail, setIsLoginFail] = useState(false);
  const [isServerError, setIsServerError] = useState(false);

  const handleSubmitForm = async () => {
    try {
      const res = await axios({ method: "post", url: "https://mte2-backend.onrender.com/loginUser", data: { username, password }, withCredentials: true });
      if (res.data.username) {
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

      <ActionIcon color="orange.8" onClick={open}>
        <IconLogin2 style={iconStyle} />
      </ActionIcon>
    </>
  );
};

export default LoginButton;
