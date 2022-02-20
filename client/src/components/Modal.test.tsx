import { create } from "react-test-renderer";

import Modal from "./Modal";

xdescribe("Modal Component", () => {
  test("renders the Modal Component", () => {
    const tree = create(
      <Modal
        title="Modal Title"
        setOpen={(event: {}, reason: "backdropClick" | "escapeKeyDown") => {}}
        open={true}
        actions={[]}
      >
        <h1>Modal Title</h1>
        <p>Modal Content</p>
      </Modal>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});