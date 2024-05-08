import { Box, Button, Heading, Image } from "@chakra-ui/react";
import bug from "../assets/bug.avif";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const auth = useSelector((state) => state.auth.auth);
  console.log(auth);

  return (
    <>
      <Box className="flex justify-center" mt={{ base: "0", md: "0rem" }} style={{backgroundColor:"#E3FEF7"}}>
        <Box
          className="flex items-center justify-center   gap-[3rem]"
          flexDirection={{ base: "column", md: "row" }}
          w={{ base: "100%", md: "70%" }}
          p={"2rem"}
        >
          <Box>
            <Image src={bug} alt="Notes" style={{borderRadius:"40px", width:"90%", height:"30%"}}/>
          </Box>
          <Box width={{ base: "100%", md: "40%" }}>
            <Heading
              as={"h1"}
              fontSize={{ base: "9rem", md: "3rem" }}
              color={"#135D66"}
            >
              The simplest way to Track bugs.
            </Heading>
            {auth ? (
              <>
                <Link to="/tracker">
                  <Button
                    mt={"2rem"}
                    fontSize={"1.3rem"}
                    // color={"#135D66"}
                    colorScheme="teal"
                    // bg={"white"}
                    p={"1.3rem 3rem"}
                    fontWeight={"bold"}
                    // border={" 1px solid black"}
                    // _hover={{ bg: "#aedadd", color: "#596e79" }}
                    style={{borderRadius:"40px"}}
                  >
                    Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/signup">
                  <Button
                    mt={"2rem"}
                    fontSize={"1.3rem"}
                    color={"#135D66"}
                    bg={"white"}
                    p={"1.3rem 3rem"}
                    border={" 1px solid black"}
                    _hover={{ bg: "#aedadd", color: "#596e79" }}
                    style={{borderRadius:"40px"}}
                  >
                    SignUp
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
