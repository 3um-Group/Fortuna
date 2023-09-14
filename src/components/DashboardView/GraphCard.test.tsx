import * as React from "react";
import * as ReactDOMClient from "react-dom/client";

import GraphCard, {defaultProps as exampleProps} from './GraphCard';

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = ReactDOMClient.createRoot(div);
  root.render(<GraphCard className="example" title={exampleProps.title} data={exampleProps.data}/>);
  root.unmount();
});
