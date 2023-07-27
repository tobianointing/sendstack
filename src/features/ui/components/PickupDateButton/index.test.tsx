import { fireEvent, render } from "@testing-library/react";
import { PickupDateButton } from "./PickupDateButton";

describe("PickupDateButton", () => {
  const onClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the day and date", () => {
    const { getByText } = render(<PickupDateButton day="Mon" date="Oct 18" />);
    expect(getByText("Mon")).toBeInTheDocument();
    expect(getByText("Oct 18")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const { getByRole } = render(
      <PickupDateButton day="Mon" date="Oct 18" onClick={onClick} />
    );
    fireEvent.click(getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
