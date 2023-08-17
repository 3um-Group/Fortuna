import * as React from "react";
import * as ReactDOMClient from "react-dom/client";
import NewsApiView from "./components/NewsApiView";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = ReactDOMClient.createRoot(div);
  root.render(<NewsApiView />);
  root.unmount();
});
