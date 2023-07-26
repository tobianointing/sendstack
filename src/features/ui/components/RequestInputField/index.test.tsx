import { render, screen } from "@testing-library/react";
import { RequestInputField } from "./RequestInputField";

describe("RequestInputField", () => {
  const placeholder = "Enter your name";
  const Icon = () => <svg data-testid="request-input-field-icon" />;
  const field = { name: "name", value: "", onChange: jest.fn() };

  it("renders the input field with the given placeholder", () => {
    render(
      <RequestInputField field={field} placeholder={placeholder} Icon={Icon} />
    );
    const input = screen.getByPlaceholderText(placeholder);
    expect(input).toBeInTheDocument();
  });

  it("renders the input field with the given type", () => {
    render(
      <RequestInputField
        field={field}
        placeholder={placeholder}
        type="password"
        Icon={Icon}
      />
    );
    const input = screen.getByPlaceholderText(placeholder);
    expect(input).toHaveAttribute("type", "password");
  });

  it("renders the input field with the given icon", () => {
    render(
      <RequestInputField field={field} placeholder={placeholder} Icon={Icon} />
    );
    const icon = screen.getByTestId("request-input-field-icon");
    expect(icon).toBeInTheDocument();
  });
});
