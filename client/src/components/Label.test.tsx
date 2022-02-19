import { create } from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "../store";
import Label, { Color, Variant } from "./Label";

describe("Label Component", () => {
  test("renders the Label Component", () => {
    const tree = create(
      <Provider store={store}>
        <Router>
          <Label color={Color.default} variant={Variant.ghost}>
            Label Text
          </Label>
        </Router>
      </Provider>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});