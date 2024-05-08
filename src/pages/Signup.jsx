import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("https://via.placeholder.com/150");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);

    try {
      const response = await axios.post(
        "https://bugtrackerbe-nf9l.onrender.com/api/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setShowModal(true);
      setModalMessage("Registration successful");
    } catch (error) {
      console.log(error);
      setShowModal(true);

      setModalMessage("Registration failed");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <div className="flex h-[32rem] items-center" style={{backgroundColor:"#E3FEF7"}}>
      <Container>
        <Box
          p={"2rem"}
          bg={"white"}
          borderRadius={10}
          boxShadow={"1px 7px 9px 1px"}
        >
          <form onSubmit={handleSubmit} >
            <Heading as={"h1"} color={"#135D66"} textAlign={"center"} mb={4}>
              SignUp
            </Heading>
            <h3 style={{textAlign:"center", fontSize:"28px", color:"#003C43"}}>Nice to see you here 😊</h3>
            <FormControl>
              <Stack spacing={5}>
                <Input
                  type="text"
                  placeholder="Username"
                  border={"1px solid gray"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  border={"1px solid gray"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  border={"1px solid gray"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
                <Button type="submit" color="#135D66" width="full"  style={{borderRadius:"40px"}}  _hover={{ bg: "#aedadd", color: "#596e79" }}>  
                  Sign Up
                </Button>

                <Text textAlign={"center"}>
                  Already have an account?{" "}
                  <Text as={Link} to="/login" color="#135D66" fontWeight="bold">
                    Login
                  </Text>
                </Text>
              </Stack>
            </FormControl>
          </form>
        </Box>
        <Modal isOpen={showModal} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Registration Status</ModalHeader>
            <ModalBody>{modalMessage}</ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={closeModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </div>
  );
};

export default Signup;
