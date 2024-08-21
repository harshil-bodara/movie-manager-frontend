import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { SlClose } from "react-icons/sl";
import { hanDelete } from "@/app/page";
import Buttons from "./button";

const DeleteModal = ({ isOpen, onOpenChange, id }: {isOpen: boolean, onOpenChange: any, id: string| number | undefined}) => {
  
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="bg-[#092C39]"
      hideCloseButton
      placement="center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="pt-6">
              <SlClose size={55} className="text-[#EB5757] mx-auto" />
            </ModalHeader>
            <ModalBody className="gap-2">
              <h3 className="text-center text-xl font-bold">Delete Movie</h3>
              <p className="text-center text-base">
                Are you sure you want to delete this movie?
              </p>
            </ModalBody>
            <ModalFooter className="p-6 justify-center gap-3">
              <Buttons variant="outline" onClick={onClose} className="h-12">
                No
              </Buttons>
              <Buttons variant="danger" onClick={() =>{hanDelete(id)}} className="h-12">
                Yes
              </Buttons>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
