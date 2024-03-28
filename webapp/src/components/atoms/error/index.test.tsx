/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { Error } from ".";
import "@testing-library/jest-dom";

describe("Atom: Error", () => {
  it("should not be empty", () => {
    render(<Error testId="testid" />);
    expect(screen.getByTestId("testid")).not.toBeEmptyDOMElement();
  });
  it("should render text pass by props", () => {
    const ERROR_MESSAGE = "Error";
    render(<Error testId="testid" message={ERROR_MESSAGE} />);
    expect(screen.getByTestId("testid")).toHaveTextContent(ERROR_MESSAGE);
  });
});
