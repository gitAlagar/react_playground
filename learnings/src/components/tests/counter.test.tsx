import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Counter from "./counter";
describe("Counter Component", () => {
  test("renders count and increments", async () => {
    const { getByTestId, getByRole } = render(<Counter />);

    // Check default value
    const countText = getByTestId("count-value");
    expect(countText).toHaveTextContent("Count: 0");

    // Click button
    const button = getByRole("button", { name: /increment/i });
    await userEvent.click(button);

    // Check updated value
    expect(countText).toHaveTextContent("Count: 1");
  });
});
