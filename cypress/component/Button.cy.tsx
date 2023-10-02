import React from "react";
import { Button } from "components";

const buttonProps = {
  text: "Test Button"
};

const buttonSelector = '[data-test="button"]';

describe("<Button />", () => {
  it("display text", () => {
    cy.mount(<Button {...buttonProps} onClick={() => null} />);
    cy.get(buttonSelector).contains(buttonProps.text);
  });

  it("click", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(<Button {...buttonProps} onClick={onChangeSpy} />);
    cy.get(buttonSelector).click();
    cy.get("@onChangeSpy").should("have.been.called");
  });

  it("disabled", () => {
    cy.mount(<Button {...buttonProps} onClick={() => null} disabled />);
    cy.get(buttonSelector).should("be.disabled");
  });
});
