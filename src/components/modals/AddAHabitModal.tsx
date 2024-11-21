import { Modal, View } from "react-native-ui-lib";
import { useAtomValue, useSetAtom } from "jotai/react";
import React, { useEffect, useState } from "react";
import { Portal } from "react-native-portalize";

import {
  closeCurrentOpenModalAtom,
  getCurrentOpenModalAtom,
} from "../../state/modals";
import { AddACustomHabitModalPart } from "./parts/AddCustomHabitModalPart";
import { AddATrackedHabitModalPart } from "./parts/AddATrackedHabitModalPart";

import { styles } from "./AddAHabitModal.styles";

interface Props {}

export const AddAHabitModal = ({}: Props) => {
  const currentOpenModal = useAtomValue(getCurrentOpenModalAtom);
  const closeCurrentOpenModal = useSetAtom(closeCurrentOpenModalAtom);

  const [shouldDisplayContent, setShouldDisplayContent] = useState(false);
  const [currentView, setCurrentView] = useState<AddAHabitModalParts>("main");

  useEffect(() => {
    setInterval(() => setShouldDisplayContent(true), 1);
  }, []);

  return (
    <Portal>
      <Modal
        animationType="slide"
        visible={currentOpenModal === "add-a-habit"}
        onRequestClose={() => {
          closeCurrentOpenModal();
        }}
      >
        {!shouldDisplayContent && <View style={styles.placeholderView}></View>}
        {currentView === "add-a-custom-habit" && shouldDisplayContent && (
          <AddACustomHabitModalPart setCurrentView={setCurrentView} />
        )}
        {currentView === "main" && shouldDisplayContent && (
          <AddATrackedHabitModalPart setCurrentView={setCurrentView} />
        )}
      </Modal>
    </Portal>
  );
};
