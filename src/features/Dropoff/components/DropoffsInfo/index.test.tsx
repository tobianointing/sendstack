// Import necessary testing libraries and dependencies
import { fireEvent, render, screen } from "@testing-library/react";
import { DropoffsInfo } from "./DropoffsInfo";

describe("DropoffsInfo", () => {
  it('should call handleAddDropoff when "Add Dropoff" button is clicked', () => {
    const onStepChangeMock = jest.fn();
    const props = {
      onStepChange: onStepChangeMock,
    };

    render(<DropoffsInfo {...props} />);

    const addDropoffButton = screen.getByText("Add Dropoff");
    fireEvent.click(addDropoffButton);

    expect(onStepChangeMock).toHaveBeenCalledWith(4);
  });
});
