import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Text,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { HamburgerIcon } from "@chakra-ui/icons";
import { logoutaction } from "../redux/Actions";
import { useEffect, useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [avatarUrl, setAvatarURL] = useState("");

  useEffect(() => {
    const url = localStorage.getItem("user");
    setAvatarURL(url);
  }, []);

  console.log(avatarUrl);

  const auth = useSelector((state) => state.auth.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // console.log({ before: auth });
  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://bug-tracker-umcg.onrender.com/api/logout",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      dispatch(logoutaction());
      localStorage.clear();
      console.log({ "<<<<": auth });
      navigate("/");
    }, 2000);
  };
  return (
    <>
      <Box>
        <Flex
          p={"1.4rem"}
          boxShadow="base"
          bg={"#003C43"}
          display={"flex"}
          alignItems={"center"}
          direction={{ base: "row", md: "row" }}
          justifyContent={"center"}
        >
          <Box>
            <Link to={"/"}>
              <Heading
                as="h2"
                fontSize={{ base: "1.6rem", md: "2rem" }}
                color={"white"}
                ml={"80px"}
              >
                BugTracker🐞
              </Heading>
            </Link>
          </Box>
          <Spacer />
          <Box>
            <IconButton
              icon={<HamburgerIcon color="white" fontSize={"1.6rem"} />}
              aria-label="Open navigation"
              onClick={onOpen}
              display={{ base: "flex", md: "none" }}
              bgColor="green"
            />

            <Flex
              gap={4}
              display={{ base: "none", md: "flex" }}
              justifyContent="space-around"
              mr={"80px"}
            >
              <Link to="/">
                <Button
                  fontSize={"1.3rem"}
                  color={"white"}
                  bg={"transparent"}
                  _hover={{ bg: "transparent", color: "#aedadd" }}
                >
                  Home
                </Button>
              </Link>

              {auth ? (
                <>
                  <Link to="/tracker">
                    <Button
                      fontSize={"1.3rem"}
                      color={"white"}
                      bg={"transparent"}
                      _hover={{ bg: "transparent", color: "#aedadd" }}
                    >
                      Dashboard
                    </Button>
                  </Link>

                  <Button
                    fontSize={"1.3rem"}
                    color={"white"}
                    bg={"transparent"}
                    onClick={handleLogout}
                    _hover={{ bg: "transparent", color: "#aedadd" }}
                  >
                    Logout
                  </Button>
                  <Image
                    w="50px"
                    h="50px"
                    borderRadius={"50%"}
                    src={avatarUrl}
                    alt="profilepictures"
                  />
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button
                      fontSize={"1.3rem"}
                      color={"white"}
                      bg={"transparent"}
                      _hover={{ bg: "transparent", color: "#aedadd" }}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button
                      fontSize={"1.3rem"}
                      color={"white"}
                      bg={"transparent"}
                      _hover={{ bg: "transparent", color: "#aedadd" }}
                    >
                      SignUp
                    </Button>
                  </Link>
                </>
              )}
            </Flex>
          </Box>
        </Flex>

        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <Box>
                <Link
                  className="hover:bg-primeGreen-600 block py-2"
                  color="#2f4e44"
                  to="/"
                  onClick={onClose}
                >
                  Home
                </Link>
              </Box>
              {auth ? (
                <>
                  <Link
                    to="/tracker"
                    className="hover:bg-primeGreen-600 block py-2"
                    color="#2f4e44"
                    onClick={onClose}
                  >
                    Dashboard
                  </Link>

                  <Text
                    className="hover:bg-primeGreen-600 block py-2"
                    color="#2f4e44"
                    onClick={onClose}
                  >
                    Logout
                  </Text>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="hover:bg-primeGreen-600 block py-2"
                    color="#2f4e44"
                    onClick={onClose}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="hover:bg-primeGreen-600 block py-2"
                    color="#2f4e44"
                    onClick={onClose}
                  >
                    SingUp
                  </Link>
                </>
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;
