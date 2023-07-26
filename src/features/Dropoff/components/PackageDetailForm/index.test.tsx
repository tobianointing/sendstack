import { render, screen } from "@testing-library/react";
import { PackageDetailForm } from "./PackageDetailForm";

describe("PackageDetailForm", () => {
  test("renders form fields", () => {
    render(<PackageDetailForm />);
    // Check if the item category and item size fields are rendered
    const itemCategoryInput = screen.getByText("Item Category");
    const itemSizeInput = screen.getByText("Item Size");
    expect(itemCategoryInput).toBeInTheDocument();
    expect(itemSizeInput).toBeInTheDocument();
  });
});
