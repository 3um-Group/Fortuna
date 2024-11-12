import * as ReactDOMClient from "react-dom/client";
import App from "./App";

// Mocking Header component from `@3um-group/atomic-sdk`
jest.mock("@3um-group/atomic-sdk", () => ({
  Header: () => <div>Header</div>
}));

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = ReactDOMClient.createRoot(div);
  root.render(<App />);
  root.unmount();
});
