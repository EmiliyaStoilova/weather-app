import React from "react";
import { LoadingOverlay } from "components";

describe("<LoadingOverlay />", () => {
  it("mounts ", () => {
    cy.mount(<LoadingOverlay />);
  });
});
