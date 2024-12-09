import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Animated } from "react-native";
import AnimatedModal from "../AnimatedModal/AnimatedModal";

describe("AnimatedModal", () => {
  const closeModalMock = jest.fn();
  const slideAnim = new Animated.Value(0);

  it("renders correctly when modalVisible is true", () => {
    const { getByTestId } = render(
      <AnimatedModal closeModal={closeModalMock} modalVisible={true} slideAnim={slideAnim} />
    );

    const modal = getByTestId("animated-modal");
    expect(modal).toBeTruthy();  // Modal should be visible
  });

  it("does not render when modalVisible is false", () => {
    const { queryByTestId } = render(
      <AnimatedModal closeModal={closeModalMock} modalVisible={false} slideAnim={slideAnim} />
    );

    const modal = queryByTestId("animated-modal");
    expect(modal).toBeNull();  // Modal should not be rendered
  });

  it("calls closeModal when the close button is pressed", async () => {
    const { getByText } = render(
      <AnimatedModal closeModal={closeModalMock} modalVisible={true} slideAnim={slideAnim} />
    );

    const closeButton = getByText("Close");
    fireEvent.press(closeButton);
    await waitFor(() => expect(closeModalMock).toHaveBeenCalledTimes(1));
  });
});
