import React from "react";
import { SelectField } from "components";
import { Units } from "pages/Weather/types";

const selectProps = {
  value: Units.STANDARD,
  options: [
    {
      value: Units.STANDARD,
      title: "Kelvin"
    },
    {
      value: Units.IMPERIAL,
      title: "Fahrenheit"
    },
    {
      value: Units.METRIC,
      title: "Celsius"
    }
  ]
};

const selectOptionSelector = '[data-test="select"]';

describe("<SelectField />", () => {
  it("mount", () => {
    cy.mount(<SelectField {...selectProps} onChange={() => null} />);
    cy.get(selectOptionSelector).should("have.value", Units.STANDARD);
  });

  it("function call", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(<SelectField {...selectProps} onChange={onChangeSpy} />);

    cy.get(selectOptionSelector).select("Celsius");
    cy.get("@onChangeSpy").should("have.been.called");
    // cy.get(selectOptionSelector);
  });
});
