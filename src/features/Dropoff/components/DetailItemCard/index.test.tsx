import { render } from "@testing-library/react";
import { DetailItemCard, Props } from "./DetailItemCard";

const renderDetailItemCard = (props: Props) => {
  return render(<DetailItemCard {...props} />);
};

describe("DetailItemCard", () => {
  it("should render the title and value correctly", () => {
    const title = "Test Title";
    const value = "Test Value";
    const { getByText } = renderDetailItemCard({ title, value });

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(value)).toBeInTheDocument();
  });
});
