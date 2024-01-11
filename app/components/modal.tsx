'use client'
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Divider } from "@nextui-org/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  stars: number;
  radio: number;
  review: string;
  select: string;
  singleChoice: number;
  badge: any;
  checkbox: any;
  text1: string;
  text2: string;
}

export const ModalSubmit = (props: ModalProps) => {

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={props.onClose}
        backdrop={"blur"}
        size="5xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Suas Respostas</ModalHeader>
              <ModalBody className="grid sm:grid-cols-1 md:grid-cols-2">
                <div>
                  <span>Questões de estrela: {props.stars}</span>
                  <Divider />
                </div>
                <div>
                  <span>Questões que tem os rádios fixos de 1 até 10: {props.radio}</span>
                  <Divider />
                </div>
                <div>
                  <span>Descreva o motivo de sua avaliação: {props.review}</span>
                  <Divider />
                </div>
                <div>
                  <span>Qual loja você frequenta?: {props.select}</span>
                  <Divider />
                </div>
                <div>
                  <span>Pergunta de escolha única: {props.singleChoice}</span>
                  <Divider />
                </div>
                <div>
                  <span>Questões de múltipla escolha: {props.badge}</span>
                  <Divider />
                </div>
                <div>
                  <span>Checkbox: {props.checkbox}</span>
                  <Divider />
                </div>
                <div>
                  <span>Questões de texto: {props.text1}</span>
                  <Divider />
                </div>
                <div>
                  <span>Questões de texto: {props.text2}</span>
                  <Divider />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
