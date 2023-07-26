import { fireEvent, render, screen } from "@testing-library/react";
import { PickupAddressForm } from "./PickupAddressForm";

const locations = [
  { name: "Location 1", locationCode: "loc1" },
  { name: "Location 2", locationCode: "loc2" },
];

describe("PickupAddressForm", () => {
  it("renders all form fields", () => {
    render(<PickupAddressForm locations={locations} />);
    expect(screen.getByText("Pickup Area")).toBeInTheDocument();
    expect(screen.getByText("Pickup Option")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Pickup address e.g 12, Shoprite, Ikeja")
    ).toBeInTheDocument();
    expect(screen.getByText("Continue")).toBeInTheDocument();
  });

  it("displays error messages for invalid data", async () => {
    render(<PickupAddressForm locations={locations} />);
    fireEvent.click(screen.getByText("Continue"));
    expect(
      await screen.findByText("Please enter a pickup address")
    ).toBeInTheDocument();
  });
});
