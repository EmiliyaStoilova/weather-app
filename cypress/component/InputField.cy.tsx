import React from "react";
import { InputField } from "components";

const inputProps = {
  value: "",
  placeholder: "Type here..."
};

const inputSelector = '[data-test="input"]';

describe("<InputField />", () => {
  it("function call", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(<InputField {...inputProps} handleChange={onChangeSpy} />);
    cy.get(inputSelector).type(".");
    cy.get("@onChangeSpy").should("have.been.called");
  });
});
