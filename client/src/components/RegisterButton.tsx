import { useState } from "react";
import axios from "axios";

import { ActionIcon, Button, Modal, PasswordInput, Space, Stack, Text, TextInput, Title, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUserPlus } from "@tabler/icons-react";
import iconStyle from "../utils/iconStyle";
import { useNavigate } from "react-router-dom";

import { notifications } from "@mantine/notifications";

const RegisterButton = ({ setIsLoggedIn }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isServerError, setIsServerError] = useState(false);
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [isInvalidUsername, setIsInvalidUsername] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [isPasswordMismatch, setIsPasswordMismatch] = useState(false);

  // React Router hooks
  const navigate = useNavigate();

  const handleSubmitForm = async () => {
    let illegalFlag = false;

    setIsUsernameTaken(false);

    // Credentials validation
    if (!username.match(/^[a-zA-Z][a-zA-Z0-9_]{2,}$/)) {
      setIsInvalidUsername(true);
      illegalFlag = true;
    } else {
      setIsInvalidUsername(false);
    }

    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[£$%&*@^]).{8,}$/)) {
      setIsInvalidPassword(true);
      illegalFlag = true;
      setIsPasswordMismatch(false);
    } else {
      setIsInvalidPassword(false);
      if (password !== confirmPassword) {
        setIsPasswordMismatch(true);
        illegalFlag = true;
      } else {
        setIsPasswordMismatch(false);
      }
    }

    if (illegalFlag) {
      return;
    }

    // If the credentials are valid, send them to the server
    try {
      setIsServerError(false);
      const res = await axios({ method: "post", url: "http://localhost:3000/registerUser", data: { username, password } });
      console.log(res);
      if (res.data.success) {
        // navigate("/login?success=true");
        setIsLoggedIn(true);
        close();
        notifications.show({
          color: "green",
          title: "Success!",
          message: "You have successfully created an account, and are now logged in.",
        });
      } else {
        setIsUsernameTaken(true);
      }
    } catch (err) {
      console.log(err);
      setIsServerError(true);
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        // title="Create An Account"
        withCloseButton={false}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        transitionProps={{ transition: "fade", duration: 200, timingFunction: "ease" }}
      >
        {/* <Title order={1} size="h3">
          Create an account
        </Title>
        <TextInput label="Username" value={username} onChange={(e) => setUsername(e.target.value)} withAsterisk />
        <PasswordInput mt="md" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} withAsterisk />
        <PasswordInput mt="md" label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} withAsterisk />
        <Button mt="md" w="100%">
          Register
        </Button> */}
        <Title order={1} size="h2">
          Create an account
        </Title>
        <Space h="md" />
        <TextInput
          label="Username"
          error={isInvalidUsername ? "Invalid username." : isUsernameTaken ? "Username already taken." : ""}
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          withAsterisk
        />
        <Space h="sm" />
        <PasswordInput label="Password" error={isInvalidPassword ? "Invalid password." : ""} name="password" value={password} onChange={(e) => setPassword(e.target.value)} withAsterisk />
        <Space h="xs" />
        <Text size="xs" c="gray">
          Password must:
          <br />- Be at least 8 characters long
          <br />- Have at least one uppercase letter
          <br />- Have at least one lowercase letter
          <br />- Have at least one number
          <br />- Have at least one special character from: £ $ % & * @ ^
        </Text>
        <Space h="sm" />
        <PasswordInput
          label="Confirm Password"
          error={isPasswordMismatch ? "Passwords don't match." : ""}
          name="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          withAsterisk
        />
        {isServerError && (
          <Text c="red" size="xs">
            A server error occurred. Please try again.
          </Text>
        )}
        <Space h="sm" />
        <Button w="100%" onClick={handleSubmitForm}>
          Register
        </Button>
      </Modal>

      <ActionIcon variant="transparent" onClick={open}>
        <IconUserPlus style={iconStyle} />
      </ActionIcon>
    </>
  );
};

export default RegisterButton;
