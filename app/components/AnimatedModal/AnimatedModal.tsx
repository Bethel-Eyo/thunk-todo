import React, { FC } from "react";
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

interface AnimatedModalProps {
  closeModal: () => void;
  modalVisible: boolean;
  slideAnim: Animated.Value;
}

const AnimatedModal: FC<AnimatedModalProps> = ({ closeModal, modalVisible, slideAnim }) => {
  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="none" // Disable default modal animations
      onRequestClose={closeModal}
    >
      <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>You have updated the status of this todo Item</Text>
          <TouchableOpacity onPress={closeModal}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Close</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default AnimatedModal;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay background
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});
