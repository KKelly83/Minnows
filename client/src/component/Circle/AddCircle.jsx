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
} from "@chakra-ui/react";

export default function AddCircle({ handleCircleSubmit }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = () => {
    handleCircleSubmit(name, description);
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
      <Button colorScheme="teal" onClick={onOpen}>
        + New Circle
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Circle</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name of the Circle</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Circle Name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Describe your Circle</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Fish Description"
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
                  Add a Circle
                </Button>
              </ButtonGroup>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
