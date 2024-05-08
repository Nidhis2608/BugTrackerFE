import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setbugdata } from "../redux/Actions";
import Bugscard from "../components/Bugscard";

const Tracker = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
  const [severity, setSeverity] = useState("");
  const [filteredCritical, setFilteredCritical] = useState([]);
  const [filteredMajor, setFilteredMajor] = useState([]);
  const [filteredMedium, setFilteredMedium] = useState([]);
  const [filteredLow, setFilteredLow] = useState([]);
  const dispatch = useDispatch();
  const bugsdata = useSelector((state) => state.auth.bugsdata);
  const [newbugsdata, setnewugsData] = useState([]);
  useEffect(() => {
    const fetchBugs = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://bugtrackerbe-nf9l.onrender.com/api/bugs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(setbugdata(response.data.bugs));
        console.log(response.data);
        setnewugsData(response.data);
      } catch (error) {
        console.error("Error fetching bugs:", error);
      }
    };
    fetchBugs();
  }, [bugsdata]);

  useEffect(() => {
    const filterBugs = () => {
      const critical = bugsdata.filter((bug) => bug.severity === "Critical");
      setFilteredCritical(critical);

      const major = bugsdata.filter((bug) => bug.severity === "Major");
      setFilteredMajor(major);

      const medium = bugsdata.filter((bug) => bug.severity === "Medium");
      setFilteredMedium(medium);

      const low = bugsdata.filter((bug) => bug.severity === "Low");
      setFilteredLow(low);
    };

    filterBugs();
  }, [bugsdata]);

  const postBug = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "https://bugtrackerbe-nf9l.onrender.com/api/bugs",
        {
          title,
          description,
          source,
          severity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("New bug added:", response.data);
      setTitle("");
      setDescription("");
      setSource("");
      setSeverity("");
    } catch (error) {
      console.error("Error adding bug:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postBug();
  };

  return (
    <>
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="md"
        display={"flex"}
        flexDirection={"column"}
        w="100%"
        h="200px"
        alignItems={"center"}
        justifyContent={"center"}
        gap="10px"
        //  backgroundColor={"#E3FEF7"}
        color={"black"}
      >
        <form
          display={"flex"}
          flexDirection={"column"}
          w="100%"
          h="200px"
          onSubmit={handleSubmit}
          style={{ gap:"10px"}}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            h="200px"
            w="100%"
            spacing={4}
            gap={"10px"}
          >
            <Box display={"flex"} flexDirection={"row"} w="100%"  gap="10px" borderRadius={"20px"}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Source</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter source"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Severity</FormLabel>
                <Select
                  placeholder="Select severity"
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                >
                  <option value="Critical">Critical</option>
                  <option value="Major">Major</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Select>
              </FormControl>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Button type="submit" colorScheme="teal" style={{borderRadius:"40px"}} >
                Add Bug
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
          backgroundColor: "#E3FEF7",
          gap: "10px",
         
        }}
      >
        <Box
          style={{
            width: "25%",
            padding: "10px",
            backgroundColor: "#f81f1f",
            border: "1px solid #ccc",
            boxSizing: "border-box",
            borderRadius: "10px",
          }}
        >
          <h1 style={{ textAlign: "center", fontWeight: "600"}} >
            Critical Bugs
          </h1>
          {filteredCritical.map((bug) => (
            <Box
              style={{
                borderRadius: "10px",
                backgroundColor: "#f65252",
                gap: "10px",
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
                marginTop: "10px",
              }}
            >
              <Bugscard key={bug.id} bug={bug} />
            </Box>
          ))}
        </Box>
        <Box
          style={{
            width: "25%",
            padding: "10px",
            backgroundColor: "#f99c00",
            border: "1px solid #ccc",
            boxSizing: "border-box",
            borderRadius: "10px",
          }}
        >
          <h1 style={{ textAlign: "center", fontWeight: "600"}}>Major Bugs</h1>
          {filteredMajor.map((bug) => (
            <Box
              style={{
                marginTop: "10px",
                borderRadius: "10px",
                backgroundColor: "#ffba46",
                gap: "10px",
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
            >
              <Bugscard key={bug.id} bug={bug} />
            </Box>
          ))}
        </Box>
        <Box
          style={{
            width: "25%",
            padding: "10px",
            backgroundColor: "#67c4c8",
            border: "1px solid #ccc",
            boxSizing: "border-box",
            borderRadius: "10px",
          }}
        >
          <h1 style={{ textAlign: "center", fontWeight: "600"}}>
            Medium Bugs
          </h1>
          {filteredMedium.map((bug) => (
            <Box
              style={{
                marginTop: "10px",
                borderRadius: "10px",
                backgroundColor: "#c8fdff",
                gap: "10px",
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
            >
              <Bugscard key={bug.id} bug={bug} />
            </Box>
          ))}
        </Box>
        <Box
          style={{
            width: "25%",
            padding: "10px",
            backgroundColor: "#2ee32e",
            boxSizing: "border-box",
            borderRadius: "10px"
          }}
        >
          {" "}
          <h1 style={{ textAlign: "center", fontWeight: "600"}}>Low Bugs</h1>
          {filteredLow.map((bug) => (
            <Box
              style={{
                borderRadius: "10px",
                backgroundColor: "#9dfd9d",
                gap: "10px",
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
                marginTop: "10px",
              }}
            >
              <Bugscard key={bug.id} bug={bug} />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Tracker;
