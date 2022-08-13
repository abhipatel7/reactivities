import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Modal as SemanticModal } from "semantic-ui-react";
import { useStore } from "stores";

const ModalContainer: FC = () => {
  const {
    modalStore: {
      modal: { open, body },
      closeModal,
    },
  } = useStore();

  return (
    <SemanticModal open={open} onClose={closeModal} size="mini">
      <SemanticModal.Content>{body}</SemanticModal.Content>
    </SemanticModal>
  );
};

export default observer(ModalContainer);
