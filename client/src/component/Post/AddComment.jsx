import React, { useState } from "react";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Box,
  Textarea,
  ButtonGroup,
  IconButton,
  HStack,
  Text,
} from "@chakra-ui/react";
import { FaRegCommentAlt } from "react-icons/fa";

const AddComment = ({ handleCommentSubmit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const onSubmit = () => {
    handleCommentSubmit(name, description);
    onClose();
    setName("");
    setDescription("");
  };

  const close = () => {
    onClose();
    setName("");
    setDescription("");
  };

  return (
    <>
      <Box onClick={onOpen} display="inline-flex" alignItems={"center"} cursor="pointer">
      
        <IconButton
          aria-label="Comment"
          icon={<FaRegCommentAlt />}
          
        />
        <Text ml = {2}>
          Add new comment
        </Text>
      </Box>
   
      

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reply</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            

            <FormControl mt={4}>
              <FormLabel>Enter your response</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Your reply goes here"
                h={"10em"}
              />
            </FormControl>

            <Box display={"flex"} justifyContent={"space-between"} mt={"0.3em"}>
              <Button colorScheme="red" onClick={close}>
                Cancel
              </Button>
              <ButtonGroup>
                <Button mr={"0.5em"} colorScheme="blue" onClick={onClose}>
                  Save
                </Button>
                <Button colorScheme="blue" onClick={onSubmit}>
                  Reply
                </Button>
              </ButtonGroup>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddComment;
