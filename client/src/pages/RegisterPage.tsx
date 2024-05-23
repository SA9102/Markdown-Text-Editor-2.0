// React
import { useState } from "react";

// Third-party packages
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import { Button, TextInput } from '@mantine/core';
import { PasswordInput, Text, Anchor, Stack, TextInput, Title, Button } from "@mantine/core";

const RegisterPage = () => {
  // useState
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
        navigate("/login?success=true");
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
      <Stack w="400" mx="auto" mt="30">
        <Title>Create an account.</Title>

        <TextInput
          label="Username"
          error={isInvalidUsername ? "Invalid username." : isUsernameTaken ? "Username already taken." : ""}
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <PasswordInput label="Password" error={isInvalidPassword ? "Invalid password." : ""} name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Text size="xs" c="gray">
          Password must:
          <br />- Be at least 8 characters long
          <br />- Have at least one uppercase letter
          <br />- Have at least one lowercase letter
          <br />- Have at least one number
          <br />- Have at least one special character from: £ $ % & * @ ^
        </Text>
        <PasswordInput
          label="Confirm Password"
          error={isPasswordMismatch ? "Passwords don't match." : ""}
          name="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {isServerError && (
          <Text c="red" size="xs">
            A server error occurred. Please try again.
          </Text>
        )}
        <Button onClick={handleSubmitForm}>Register</Button>
        <Text size="sm" ta="center">
          Already have an account? <Anchor onClick={() => navigate("/login")}>Sign in here.</Anchor>
        </Text>
        <Text size="sm" ta="center">
          <Anchor onClick={() => navigate("/")}>Home</Anchor>
        </Text>
      </Stack>
    </>
  );

  // return (
  //   <>
  //     {/* <Stack w={300} mx="auto" bg="red.5">
  //       <Box>
  //         <Text component="label" size="sm" fw={500}>
  //           Username
  //         </Text>
  //       </Box>
  //       <TextInput name="username" />
  //       <Text component="label" size="sm" fw={500}>
  //         Username
  //       </Text>
  //       <TextInput name="username" /> */}

  //       {/* <Group justify="space-between" mb={5}>
  //         <Text component="label" htmlFor="password" size="sm" fw={500}>
  //           Password
  //         </Text>

  //         <Anchor href="#" onClick={(event) => event.preventDefault()} pt={2} fw={500} fz="xs">
  //           Forgot your password?
  //         </Anchor>
  //       </Group>
  //       <PasswordInput placeholder="Your password" id="password" /> */}
  //     </Stack>
  //   </>
  //   // <Sheet
  //   //   variant="outlined"
  //   //   sx={{
  //   //     width: 300,
  //   //     mx: 'auto', // margin left & right
  //   //     my: 4, // margin top & bottom
  //   //     py: 3, // padding top & bottom
  //   //     px: 2, // padding left & right
  //   //     display: 'flex',
  //   //     flexDirection: 'column',
  //   //     gap: 2,
  //   //     borderRadius: 'sm',
  //   //     boxShadow: 'md',
  //   //   }}
  //   // >
  //   //   <div>
  //   //     <Typography level="h4" component="h1">
  //   //       Welcome!
  //   //     </Typography>
  //   //     <Typography level="body-sm">Register an account to save your files.</Typography>
  //   //   </div>
  //   //   <FormControl>
  //   //     <FormLabel>
  //   //       Username
  //   //       <Tooltip
  //   //         variant="outlined"
  //   //         placement="right"
  //   //         arrow
  //   //         title={
  //   //           <Box sx={{ display: 'flex', flexDirection: 'column', padding: 1 }}>
  //   //             <Typography level="title-sm">Username Criteria:</Typography>
  //   //             <Typography level="body-xs">
  //   //               <br />- Be at least 3 characters long
  //   //               <br />- Can only contain letters, numbers and underscore (_)
  //   //               <br />- Must start with a letter
  //   //               <br />- Cannot contain spaces
  //   //             </Typography>
  //   //           </Box>
  //   //         }
  //   //       >
  //   //         <InfoOutlinedIcon sx={{ ml: 1 }} />
  //   //       </Tooltip>
  //   //     </FormLabel>
  //   //     <Input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
  //   //     {isInvalidUsername && (
  //   //       <Typography level="body-sm" marginTop={1} color="danger">
  //   //         Username does not fulfill all criteria.
  //   //       </Typography>
  //   //     )}
  //   //     {isUsernameTaken && (
  //   //       <Typography level="body-sm" marginTop={1} color="danger">
  //   //         Username already taken.
  //   //       </Typography>
  //   //     )}
  //   //   </FormControl>
  //   //   <FormControl>
  //   //     <FormLabel>
  //   //       Password
  //   //       <Tooltip
  //   //         variant="outlined"
  //   //         placement="right"
  //   //         arrow
  //   //         title={
  //   //           <Box sx={{ display: 'flex', flexDirection: 'column', padding: 1 }}>
  //   //             <Typography level="title-sm">Password Criteria:</Typography>
  //   //             <Typography level="body-xs">
  //   //               <br />- Be at least 8 characters long
  //   //               <br />- Have at least one uppercase letter
  //   //               <br />- Have at least one lowercase letter
  //   //               <br />- Have at least one number
  //   //               <br />- Have at least one special character from £$%&*@^
  //   //             </Typography>
  //   //           </Box>
  //   //         }
  //   //       >
  //   //         <InfoOutlinedIcon sx={{ ml: 1 }} />
  //   //       </Tooltip>
  //   //     </FormLabel>
  //   //     <Input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
  //   //     {isInvalidPassword && (
  //   //       <Typography level="body-sm" marginTop={1} color="danger">
  //   //         Password does not fulfill all criteria.
  //   //       </Typography>
  //   //     )}
  //   //   </FormControl>

  //   //   <FormControl>
  //   //     <FormLabel>Confirm Password</FormLabel>
  //   //     <Input type="password" name="confpassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
  //   //     {isPasswordMismatch && (
  //   //       <Typography level="body-sm" marginTop={1} color="danger">
  //   //         Passwords do not match.
  //   //       </Typography>
  //   //     )}
  //   //   </FormControl>
  //   //   <Button type="submit" onClick={handleSubmitForm}>
  //   //     Register
  //   //   </Button>
  //   //   <Typography endDecorator={<Link href="/login">Sign in</Link>} fontSize="sm" sx={{ alignSelf: 'center' }}>
  //   //     Already have an account?
  //   //   </Typography>
  //   // </Sheet>
  // );
};

export default RegisterPage;
