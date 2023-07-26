import { render, screen } from "@testing-library/react";
import { RequestDialog } from "./RequestDialog";

describe("RequestDialog", () => {
  it("renders the Send Package button", () => {
    render(<RequestDialog />);
    const sendPackageButton = screen.getByRole("button", {
      name: /send package/i,
    });
    expect(sendPackageButton).toBeInTheDocument();
  });
});
