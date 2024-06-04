import { Modal, Text } from "@mantine/core";

type props = {
  opened: boolean;
  onClose: () => void;
};

const DeletionModal = ({ opened, onClose }: props) => {
  <Modal opened={opened} onClose={onClose}>
    <Text>Hello</Text>
  </Modal>;
};

export default DeletionModal;
