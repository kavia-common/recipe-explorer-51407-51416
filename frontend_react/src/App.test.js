import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

test("renders Recipe Explorer header", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  expect(screen.getByText(/Recipe Explorer/i)).toBeInTheDocument();
  expect(screen.getByRole("search", { name: /search recipes/i })).toBeInTheDocument();
});
