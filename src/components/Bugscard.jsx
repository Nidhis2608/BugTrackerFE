import React, { useState } from "react";
import { BsTrash, BsPencil } from "react-icons/bs";
import axios from "axios";
import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const Bugscard = ({ bug }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(bug.title);
  const [editedDescription, setEditedDescription] = useState(bug.description);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `https://bugtrackerbe-nf9l.onrender.com/api/bugs/${bug._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting bug:", error);
    }
  };

  const handleEdit = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(
        `https://bugtrackerbe-nf9l.onrender.com/api/bugs/${bug._id}`,
        {
          title: editedTitle,
          description: editedDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Bug edited:", response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error editing bug:", error);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "10px",
          boxSizing: "border-box",
        }}
      >
        {isEditing ? (
          <>
            <Input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <Input
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <Button colorScheme="blue" onClick={handleEdit}>
              Save
            </Button>
          </>
        ) : (
          <>
            <div>{bug.title}</div>
            <div className="flex flex-col gap-2">
              <BsTrash style={{ cursor: "pointer" }} onClick={handleDelete} />
              <BsPencil
                style={{ cursor: "pointer" }}
                onClick={() => setIsEditing(true)}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Bugscard;
