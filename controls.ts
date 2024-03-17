import { goToHistoryPage } from './jobSteps';
import { logMessage } from './logging';
import { cancelMessage, historyHeader, TIME_TO_WAIT_FOR_ELEMENT, unsavedMessage } from './messages';
import { validateTableLinkClickable, validateTableLinkNonClickable, validateTableRow } from './table';

export const validateSelect2 = (
  id: string,
  label: string,
  placeholder: string | null,
  value: string | null,
  options: string[] | null,
  isRequired = false,
  isEnabled = true,
): void => {
  logMessage(
    `Validate Select: Id=${id}, Label=${label}, Placeholder=${placeholder}, Value=${value}, Options=[${options}], Required=${isRequired}, Enabled=${isEnabled}`,
  );

  cy.get(`#${id}`).as('select');
  cy.get(`#${id}-Wrapper`).children('.vtx-select').children('.ant-select-selector').as('selector');
  cy.get('@select').should('exist');

  if (isEnabled) {
    cy.get('@select').should('be.enabled');
  }

  if (label) {
    cy.get(`#${id}-Label`).should('have.text', label);
  }

  if (placeholder) {
    cy.get('@selector').children('.ant-select-selection-placeholder').should('have.text', placeholder);
  }

  if (value) {
    cy.get('@selector').children('.ant-select-selection-item').should('have.text', value);
  }

  if (isRequired && !value) {
    cy.get(`#${id}-Validation`)
      .should('exist')
      .should('be.visible')
      .invoke('text')
      .should('eq', 'This is a required field');
  }

  if (options) {
    cy.get('@select').click({ force: true });

    // The Drop list is is an Overlay not connected to the Select
    cy.get(`#${id}_list`).as('list');
    cy.get('@list').should('exist');

    // Only test the first 9 Items.  The rest needs to be scrolled into view before they become available.
    options.slice(0, 9)?.forEach((menuItem: string) => {
      cy.get('@list').get('.ant-select-item-option-content').contains(menuItem);
    });

    // cy.get('div.ant-select-dropdown:not(div.ant-select-dropdown-hidden) > div  div.rc-virtual-list-holder-inner > div').then(optionsArray => {
    //   const actualOptions: string[] = [...optionsArray].map(o => o.innerText);

    //   // Compare the Options - Only compare the size of the Actual Options.  Not all Options are visible until scrolled.
    //   const optionsEqual: boolean = _.isEqual(actualOptions, options?.slice(0, actualOptions.length));

    //   if (optionsEqual === false) {
    //     logMessage('Expected Options:', options?.slice(0, actualOptions.length));

    //     logMessage('Actual Options:', actualOptions);

    //     // Give the Logger change to dump the Options before throwing the Exception
    //     logMessage(`Options Not Equal`).then(() => expect(optionsEqual).to.be.true);
    //   }
    // });

    cy.get('@select').type('{esc}', { force: true });
  }
};

export const validateSelect = (
  id: string,
  label: string,
  placeholder: string | null,
  value: string | null,
  options: string[] | null,
  isRequired = false,
  isEnabled = true,
): void => {
  logMessage(
    `Validate Select: Id=${id}, Label=${label}, Placeholder=${placeholder}, Value=${value}, Options=[${options}], Required=${isRequired}, Enabled=${isEnabled}`,
  );

  cy.get(`#${id}`).as('select');
  cy.get(`#${id}-Wrapper`)
    .children('[data-automation-class="vtx-select"]')
    .children('.vertexSelect')
    .as('selector');
  cy.get('@select').should('exist');

  // if (isEnabled) {
  //   cy.get('@select').should('be.enabled');
  // }

  if (label) {
    cy.get(`#${id}-Label`).should('have.text', label);
  }

  if (placeholder) {
    cy.get(`#${id} > .vertexSelect__control`).should('have.text', placeholder);
  }

  if (value) {
    cy.get('@selector').children('.vertexSelect__control').should('have.text', value);
  }

  if (isRequired && !value) {
    cy.get(`#${id}-Validation`)
      .should('exist')
      .should('be.visible')
      .invoke('text')
      .should('eq', 'This is a required field');
  }

  if (options) {
    cy.get(`#${id} > .vertexSelect__control`).click({ force: true });

    // The Drop list is is an Overlay not connected to the Select
    // cy.get(`#${id}_list`).as('list');
    // cy.get('@list').should('exist');

    // Only test the first 9 Items.  The rest needs to be scrolled into view before they become available.
    options.slice(0, 9)?.forEach((menuItem: string) => {
      //cy.get('@list').get('.ant-select-item-option-content').contains(menuItem);
      cy.get('[data-automation-class="vtx-select"]')
        .children('.vertexSelect')
        .children('.vertexSelect__menu')
        .contains(menuItem);
    });

    // cy.get('div.ant-select-dropdown:not(div.ant-select-dropdown-hidden) > div  div.rc-virtual-list-holder-inner > div').then(optionsArray => {
    //   const actualOptions: string[] = [...optionsArray].map(o => o.innerText);

    //   // Compare the Options - Only compare the size of the Actual Options.  Not all Options are visible until scrolled.
    //   const optionsEqual: boolean = _.isEqual(actualOptions, options?.slice(0, actualOptions.length));

    //   if (optionsEqual === false) {
    //     logMessage('Expected Options:', options?.slice(0, actualOptions.length));

    //     logMessage('Actual Options:', actualOptions);

    //     // Give the Logger change to dump the Options before throwing the Exception
    //     logMessage(`Options Not Equal`).then(() => expect(optionsEqual).to.be.true);
    //   }
    // });

    //cy.get('@select').type('{esc}', { force: true });
  }
};

export const validateSelectSearchAhead = (
  id: string,
  label: string,
  placeholder: string | null,
  isEnabled = true,
  validationMessage = '',
): void => {
  logMessage(
    `Validate Search Ahead: Id=${id}, Label=${label}, Placeholder=${placeholder}, Enabled=${isEnabled}, Validation=${validationMessage}`,
  );

  cy.get(`#${id}`).as('selectSearchAhead');
  cy.get(`#${id}-Wrapper`).children('.vtx-select').children('.ant-select-selector').as('selector');
  cy.get('@selectSearchAhead').should('exist');

  if (isEnabled) {
    cy.get('@selectSearchAhead').should('be.enabled');
  }

  if (label) {
    cy.get(`#${id}-Label`).should('have.text', label);
  }

  if (placeholder) {
    cy.get('@selector').children('.ant-select-selection-placeholder').should('have.text', placeholder);
  }
  if (validationMessage) {
    cy.get(`#${id}-Validation`)
      .should('exist')
      .should('be.visible')
      .invoke('text')
      .should('eq', validationMessage);
  }
};

export const validateDate = (
  id: string,
  label: string,
  placeholder: string | null,
  value: string | null,
  isEnabled = true,
  validationMessage = '',
): void => {
  logMessage(
    `Validate Date: Id=${id}, Label=${label}, Placeholder=${placeholder}, Value=${value}, Enabled=${isEnabled}, Validation=${validationMessage}`,
  );

  cy.get(`#${id}`).as('date');
  cy.get('@date').should('exist');

  if (isEnabled) {
    cy.get('@date').should('be.enabled');
  }

  if (label) {
    cy.get(`#${id}-Label`).should('have.text', label);
  }

  if (placeholder) {
    cy.get('@date').invoke('attr', 'placeholder').should('eq', placeholder);
  }

  if (value) {
    cy.get('@date').should('have.value', value);
  }

  if (validationMessage) {
    cy.get(`#${id}-Validation`)
      .should('exist')
      .should('be.visible')
      .invoke('text')
      .should('eq', validationMessage);
  }
};

export const validateInputField = (
  id: string,
  label: string | null,
  placeholder: string | null,
  value: string | null,
  isEnabled: boolean,
  validationMessage: string | null,
): void => {
  logMessage(
    `Validate Input Field: Id=${id}, Label=${label}, Placeholder=${placeholder}, Value=${value}, Enabled=${isEnabled}, Validation=${validationMessage}`,
  );

  cy.get(`#${id}`).as('inputField');
  cy.get('@inputField').should('exist');

  if (isEnabled) {
    cy.get('@inputField').should('be.enabled');
  }

  if (label) {
    cy.get(`#${id}-Label`).should('have.text', label);
  }

  if (placeholder) {
    cy.get('@inputField').invoke('attr', 'placeholder').should('eq', placeholder);
  }

  if (value) {
    cy.get('@inputField').should('have.value', value);
  }

  if (validationMessage) {
    cy.get(`#${id}-Validation`)
      .should('exist')
      .should('be.visible')
      .invoke('text')
      .should('eq', validationMessage);
  }
};

export const validateElementNotExists = (id: string): void => {
  logMessage(`Validate Element Does Not Exists: Id=${id}`);

  cy.get(`#${id}`).should('not.exist');
};

export const historyDropdown = (
  id: string,
  values: string[] | string | null,
  isMultiSelect = false,
): void => {
  logMessage(`Select from Dropdown: Id=${id}, Values=${values}, MultiSelect=${isMultiSelect}`);

  cy.get(`.${id}`).as('dropDown');
  cy.get('@dropDown').should('exist');
  if (values) {
    cy.get('@dropDown').click({ force: true });
    if (!isMultiSelect) {
      cy.get(
        'div.ant-select-dropdown:not(div.ant-select-dropdown-hidden) > div  div.rc-virtual-list-holder-inner > div',
      )
        .get('.ant-select-item-option-content')
        .contains(`${values}`)
        .click({ force: true });
      // cy.get(`.${id}-Wrapper`)
      //   .children('.vtx-select')
      //   .children('.ant-select-selector')
      //   .children('.ant-select-selection-item')
      //   .should('have.text', `${values}`);
    } else {
      cy.get(`.${id}-Wrapper`)
        .children('.vtx-multiple-select')
        .children('.ant-select-selector')
        .children('.ant-select-selection-overflow')
        .as('selector');
      for (let i = 0; i < values.length; i++) {
        cy.get(
          'div.ant-select-dropdown:not(div.ant-select-dropdown-hidden) > div  div.rc-virtual-list-holder-inner > div',
        )
          .get('.ant-select-item-option-content')
          .contains(`${values[i]}`)
          .click({ force: true });
      }
      for (let i = 0; i < values.length; i++) cy.get('@selector').should('contain.text', `${values[i]}`);
      cy.get('@selector').children('.ant-select-selection-overflow-item-suffix').click();
    }
  }
};

export const selectValueFromDropdown = (
  id: string,
  values: string[] | string | null,
  isMultiSelect = false,
  clickTwice = false,
): void => {
  logMessage(`Select from Dropdown: Id=${id}, Values=${values}, MultiSelect=${isMultiSelect}`);

  cy.get(`#${id}`).as('dropDown');
  cy.get('@dropDown').should('exist');
  if (values) {
    if (clickTwice == true) {
      cy.get(`#${id} > .vertexSelect__control`).should('exist').click({ force: true });
    }
    if (!isMultiSelect) {
      cy.get(`#${id} > .vertexSelect__control`).should('exist').trigger('mouseover').click({ force: true });

      cy.get('@dropDown').get('.vertexSelect__menu-list').contains(`${values}`).click({ force: true });
      cy.get(`#${id}-Wrapper`)
        .children('[data-automation-class="vtx-select"]')
        .children('.vertexSelect')
        .children('.vertexSelect__control')
        .should('have.text', `${values}`);
    } else {
      cy.get(`#${id}-Wrapper`)
        .children('.vtx-multiple-select')
        .children('.ant-select-selector')
        .children('.ant-select-selection-overflow')
        .as('selector');
      for (let i = 0; i < values.length; i++) {
        cy.get(
          'div.ant-select-dropdown:not(div.ant-select-dropdown-hidden) > div  div.rc-virtual-list-holder-inner > div',
        )
          .get('.ant-select-item-option-content')
          .contains(`${values[i]}`)
          .click({ force: true });
      }
      for (let i = 0; i < values.length; i++) cy.get('@selector').should('contain.text', `${values[i]}`);
      cy.get('@selector').children('.ant-select-selection-overflow-item-suffix').click();
    }
  }
};

export const selectValueFromDropdown2 = (
  id: string,
  values: string[] | string | null,
  isMultiSelect = false,
): void => {
  logMessage(`Select from Dropdown: Id=${id}, Values=${values}, MultiSelect=${isMultiSelect}`);

  cy.get(`#${id}`).as('dropDown');
  cy.get('@dropDown').should('exist');
  if (values) {
    cy.get('@dropDown').click({ force: true });
    if (!isMultiSelect) {
      cy.get(
        'div.ant-select-dropdown:not(div.ant-select-dropdown-hidden) > div  div.rc-virtual-list-holder-inner > div',
      )
        .get('.ant-select-item-option-content')
        .contains(`${values}`)
        .click({ force: true });
      cy.get(`#${id}-Wrapper`)
        .children('.vtx-select')
        .children('.ant-select-selector')
        .children('.ant-select-selection-item')
        .should('have.text', `${values}`);
    } else {
      cy.get(`#${id}-Wrapper`)
        .children('.vtx-multiple-select')
        .children('.ant-select-selector')
        .children('.ant-select-selection-overflow')
        .as('selector');
      for (let i = 0; i < values.length; i++) {
        cy.get(
          'div.ant-select-dropdown:not(div.ant-select-dropdown-hidden) > div  div.rc-virtual-list-holder-inner > div',
        )
          .get('.ant-select-item-option-content')
          .contains(`${values[i]}`)
          .click({ force: true });
      }
      for (let i = 0; i < values.length; i++) cy.get('@selector').should('contain.text', `${values[i]}`);
      cy.get('@selector').children('.ant-select-selection-overflow-item-suffix').click();
    }
  }
};

export const selectValueFromTree = (
  id: string,
  value: string | null,
  validCategory: boolean | null = true,
): void => {
  logMessage(`Select from Tree: Id=${id}, Value=${value}`);

  cy.get(`#${id}`).as('tree');
  cy.get('@tree').should('exist');

  if (value && validCategory === true) {
    cy.get('@tree').click({ force: true });
    wait(5000);
    cy.get('.ant-select-selector').last().type(`${value}`), { force: true };

    cy.get(
      'div.ant-select-dropdown:not(div.ant-select-dropdown-hidden) > div  div.ant-select-tree-list-holder-inner > div',
    )
      .get('.ant-select-tree-title')
      .contains(`${value}`)
      .click({ force: true });
  }

  if (validCategory === false) {
    cy.get('@tree').click({ force: true });
    wait(5000);
    cy.get('.ant-select').click({ force: true }).type(`${value}`), { force: true };
  }
};

export const inputField = (id: string, value: any | null): void => {
  logMessage(`Input Field: Id=${id}, Value=${value}`);

  cy.get(`#${id}`).clear();
  cy.get(`#${id}`).as('inputField');
  cy.get('@inputField').should('exist');
  cy.get('@inputField').clear();

  if (value) {
    cy.get('@inputField').type(`${value}`);
    cy.get('@inputField').should('have.value', `${value}`);
  }
};

export const leftNavigationLink = (id: string): void => {
  logMessage(`Left Navigation Link: Id=${id}`);

  cy.get(`[data-testid=${id}]`).click();
};

export const validateLeftNavigationLink = (id: string, value: string, isActive = true): void => {
  cy.get(`[data-testid=${id}`).parentsUntil('.li').as('navigationLink');
  cy.get('@navigationLink').should('exist');
  cy.get('@navigationLink').contains(value);

  if (isActive) {
    cy.get('@navigationLink').should('have.class', 'active');
  } else {
    cy.get('@navigationLink').should('not.have.class', 'active');
  }
};

export const validateHyperlinkText = (
  id: string,
  value: string,
  exact: boolean = true,
  maxTimeMilliseconds: number = 4000,
): void => {
  logMessage(`Validate Text: Id=${id}, Value=${value}`);

  cy.get(`[data-testid=${id}`, { timeout: maxTimeMilliseconds }).as('navigationLink');
  cy.get('@navigationLink').should('exist');

  if (exact) {
    cy.get('@navigationLink').invoke('text').should('eq', value);
  } else {
    cy.get('@navigationLink').contains(value);
  }
};

export const validateLeftNavigationLinkNotExists = (id: string): void => {
  cy.get(`[data-testid=${id}`).should('not.exist');
};

export const navigationLink = (id: string): void => {
  logMessage(`Navigation Link: Id=${id}`);

  cy.get(`#${id}`).click({ force: true });
};

export const validateNavigationLink = (id: string, value: string): void => {
  logMessage(`Validate Navigation Link: Id=${id}, Value=${value}`);

  cy.get(`#${id}`).as('navigationLink');
  cy.get('@navigationLink').should('exist');
  cy.get('@navigationLink').invoke('text').should('eq', value);
};

export const validateButton = (
  id: string,
  value: string,
  isEnabled = true,
  maxTimeMilliseconds: number = 4000,
): void => {
  logMessage(`Validate Button: Id=${id}, Value=${value}, Enabled=${isEnabled}`);

  cy.get(`#${id}`, { timeout: maxTimeMilliseconds }).as('button');
  cy.get('@button').should('exist');
  cy.get('@button').invoke('text').should('eq', value);

  if (isEnabled) {
    cy.get('@button').should('be.enabled');
  } else {
    cy.get('@button').should('be.disabled');
  }
};

export const validateButtonNotExists = (id: string): void => {
  logMessage(`Validate Button Does Not Exists: Id=${id}`);

  cy.get(`#${id}`).should('not.exist');
};

export const validateIconButton = (id: string, value: string): void => {
  logMessage(`Validate Icon Button: Id=${id}, Value=${value}`);

  cy.get(`#${id}`).as('button');
  cy.get('@button').should('exist');
  cy.get('@button').invoke('text').should('eq', value);
};

export const waitForButton = (id: string, enabled: boolean, maxTimeMilliseconds: number = 10000): void => {
  logMessage(`Wait for Button: Id=${id}, Enabled=${enabled}`);

  if (enabled) {
    cy.get(`#${id}`, { timeout: maxTimeMilliseconds }).should('be.enabled');
  } else {
    cy.get(`#${id}`, { timeout: maxTimeMilliseconds }).should('be.disabled');
  }
};

export const clickButton = (id: string): void => {
  logMessage(`Click Button: Id=${id}`);

  cy.get(`#${id}`).as('button');
  cy.get('@button').should('exist');
  cy.get('@button').should('be.enabled');
  cy.get('@button').click();
};

export const clickIconButton = (id: string): void => {
  logMessage(`Click Button: Id=${id}`);

  cy.get(`#${id}`).as('button');
  cy.get('@button').should('exist');
  cy.get('@button').click({ force: true });
};

export const clicksaveButton = (id: string): void => {
  logMessage(`Click Button: Id=${id}`);

  cy.get(`#${id}`).as('button');
  cy.get('@button').should('exist');
  cy.get('@button').then((btn) => {
    if (btn.is('enabled')) {
      cy.get('@button').click();
    } else {
      cy.get('@button').should('be.disabled');
    }
  });
};

export const clickIcon = (id: string): void => {
  logMessage(`Click Icon: Id=${id}`);

  cy.get(`#${id}`).as('icon');
  cy.get('@icon').should('exist');
  cy.get('@icon').click();
};

export const clickHyperlink = (id: string): void => {
  logMessage(`Click Hyperlink: Id=${id}`);

  cy.get(`[data-testid=${id}]`).as('hyperlink');
  cy.get('@hyperlink').should('exist');
  cy.get('@hyperlink').click();
};

export const clickMenu = (id: string): void => {
  logMessage(`Click Icon: Id=${id}`);

  cy.get(`${id}`).as('icon');
  cy.get('@icon').should('exist');
  cy.get('@icon').click();
};

export const downloadconfigReport = (id: string): void => {
  logMessage(`Click Icon: Id=${id}`);

  cy.get(`${id}`).as('icon');
  cy.get('@icon').should('exist');
  cy.get('@icon').click();
};

export const validateInputFieldSimple = (
  id: string,
  placeholder: string | null,
  value: string | null,
  isEnabled = true,
): void => {
  logMessage(`Validate Input Field: Id=${id}, Placeholder=${placeholder}, Enabled=${isEnabled}`);

  cy.get(`#${id}`).as('inputField');
  cy.get('@inputField').should('exist');

  if (isEnabled) {
    cy.get('@inputField').should('be.enabled');
  }

  if (value) {
    cy.get('@inputField').should('have.value', value);
  }

  if (placeholder) {
    cy.get('@inputField').invoke('attr', 'placeholder').should('eq', placeholder);
  }
};

export const validateText = (
  id: string,
  value: string,
  exact: boolean = true,
  maxTimeMilliseconds: number = 4000,
): void => {
  logMessage(`Validate Text: Id=${id}, Value=${value}`);

  cy.get(`#${id}`, { timeout: maxTimeMilliseconds }).as('textField');
  cy.get('@textField').should('exist');

  if (exact) {
    cy.get('@textField').invoke('text').should('eq', value);
  } else {
    cy.get('@textField').contains(value);
  }
};

export const validateDataIDText = (
  id: string,
  value: string,
  exact: boolean = true,
  maxTimeMilliseconds: number = 4000,
): void => {
  logMessage(`Validate Data ID Text: Id=${id}, Value=${value}`);

  cy.get(`[data-testid=${id}]`, { timeout: maxTimeMilliseconds }).as('textField');
  cy.get('@textField').should('exist');

  if (exact) {
    cy.get('@textField').invoke('text').should('eq', value);
  } else {
    cy.get('@textField').contains(value);
  }
};

export const validateConfirmationMessage = (
  heading: string,
  message: string,
  okButtonName: string,
  cancelButtonName: string,
): void => {
  logMessage(
    `Validate Confirmation Message Text: Heading=${heading}, Message=${message}, OK=${okButtonName}, Cancel=${cancelButtonName}`,
  );

  validateText('confirmationHeading', heading);
  validateText('confirmationMessage', message);

  validateButton('okConfirmationButton', okButtonName, true);
  validateButton('cancelConfirmationButton', cancelButtonName, true);
};

export const validateCheckbox = (id: string, isEnabled: boolean = true, isChecked: boolean = false): void => {
  logMessage(`Validate Checkbox: Id=${id}, Enabled=${isEnabled}, Checked=${isChecked}`);

  cy.get(`#${id}`).as('checkbox');
  cy.get('@checkbox').should('exist');
  if (isEnabled) {
    cy.get('@checkbox').should('be.enabled');
  } else {
    cy.get('@checkbox').should('be.disabled');
  }

  if (isChecked) {
    cy.get('@checkbox').should('be.checked');
  } else {
    cy.get('@checkbox').should('not.be.checked');
  }
};

export const clickCheckbox = (id: string, checked: boolean): void => {
  logMessage(`Click Checkbox: Id=${id}, Checked=${checked}`);

  cy.get(`#${id}`).as('checkbox');
  cy.get('@checkbox').should('exist');
  cy.get('@checkbox').should('be.enabled');

  if (checked) {
    cy.get('@checkbox').should('not.be.checked');
    cy.get('@checkbox').check();
  } else {
    cy.get('@checkbox').should('be.checked');
    cy.get('@checkbox').uncheck();
  }
};

export const validateFileSelectNoFile = (
  id: string,
  fileInformation: string,
  dragDropText: string,
  dragDropInformation: string,
  required: boolean | null = null,
): void => {
  logMessage(
    `Validate File Select Without File: Id=${id}, FileInfo=${fileInformation}, DragDrop=${dragDropText}, DragDropInfo=${dragDropInformation}, Required=${required}`,
  );

  cy.get(`#${id}`).as('fileSelectNoFile');
  cy.get('@fileSelectNoFile').should('exist');

  validateText('fileUploadDragDropText', dragDropText);

  validateText('fileUploadDragDropInformation', dragDropInformation);

  if (required) {
    validateText('fileUploadValidation', 'This is a required file');
  }

  if (fileInformation) {
    // validate the Tooltip
    cy.get('.vtx-icon-info-circle').last().trigger('mouseover');
    cy.get('.ant-tooltip').should('be.visible');
    cy.get('#fileInformation').should('have.text', fileInformation);
    cy.get('.vtx-icon-info-circle').last().trigger('mouseout');
  }
};

export const validateFileSelectWithFile = (
  id: string,
  fileName: string,
  fileType: string,
  downloadTimeoutMilliseconds = 10000,
): void => {
  logMessage(`Validate File Select With File: Id=${id}, FileName=${fileName}, FileType=${fileType}`);

  cy.get(`#${id}`).as('fileSelectWithFile');
  cy.get('@fileSelectWithFile').should('exist');

  validateText('fileName', fileName, false);

  validateButton('removeButton', 'Remove', true);

  // Validation Message should be Missing
  cy.get('#fileUploadValidation').should('not.exist');
};

export const fileSelect = (
  id: string,
  fileName: string,
  fileType: string,
  maxVirusScanTimeMilliseconds: number = 20000,
): void => {
  logMessage(`File Select: Id=${id}, FileName=${fileName}, FileType=${fileType}`);

  if (fileType === 'application/x-zip-compressed') {
    cy.fixture(fileName, null).then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent,
        fileName: fileName,
        mimeType: fileType,
      });
    });
  } else {
    cy.fixture(fileName).then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent,
        fileName: fileName,
        mimeType: fileType,
      });
    });
  }

  cy.get('.vtx-icon-bug', { timeout: maxVirusScanTimeMilliseconds }).should('be.visible');
};

export const validateStepper = (id: string, step: number, titles: string[]): void => {
  logMessage(`Validate Stepper: Id=${id}, Step=${step}, Titles=${titles}`);

  cy.get(`.ant-steps-icon`).as('icon');
  cy.get('@icon').should('exist');
  cy.get('@icon').contains(step);

  cy.get(`.ant-steps-item-title`).as('title');
  cy.get('@title').should('exist');

  // The Stepper Title can span multiple lines.  Test each line separately
  titles.forEach((title: string) => {
    cy.get('@title').contains(title);
  });
};

export const waitForElement = (
  id: string,
  value: string | null = null,
  maxTimeMilliseconds: number = 10000,
): void => {
  logMessage(`Wait for Element: Id=${id}, Value=${value}`);

  if (value) {
    cy.get(`#${id}`, { timeout: maxTimeMilliseconds })
      .should('be.visible')
      .contains(value, { timeout: maxTimeMilliseconds });
  } else {
    cy.get(`#${id}`, { timeout: maxTimeMilliseconds }).should('be.visible');
  }
};

export const waitForElements = (
  id: string,
  value: string | null = null,
  maxTimeMilliseconds: number = 10000,
): void => {
  logMessage(`Wait for Element: Id=${id}, Value=${value}`);

  if (value) {
    cy.get(`${id}`, { timeout: maxTimeMilliseconds })
      .should('be.visible')
      .contains(value, { timeout: maxTimeMilliseconds });
  } else {
    cy.get(`${id}`, { timeout: maxTimeMilliseconds }).should('be.visible');
  }
};

export const validateProgressBar = (id: string, descriptionId: string): void => {
  logMessage(`Validate Progress Bar: Id=${id}`);

  cy.get(`#${id}`).as('progress');
  cy.get('@progress').should('exist');

  // Look for Partial Match
  validateText(descriptionId, 'For the last', false);
};

export const wait = (timeMilliseconds: number): void => {
  cy.wait(timeMilliseconds);
};

export const validateFileDownload = (fileName: string, downloadTimeoutMilliseconds = 30000): void => {
  logMessage(`Validate File Download: FileName=${fileName}`);

  cy.verifyDownload(fileName, { timeout: downloadTimeoutMilliseconds, interval: 30000 });
};

export const validateFilesContains = (sourceFile: string, destFile: string): void => {
  logMessage(`Validate File Contains: SourceFile=${sourceFile}, DownloadedFile=${destFile}`);

  cy.readFile(sourceFile, 'utf-8').then((input) => {
    input = input.replace(/(\r\n|\n|\r)/gm, ' ');
    cy.readFile(destFile, 'utf-8').then((output) => {
      output = output.replace(/(\r\n|\n|\r)/gm, ' ');
      expect(output).to.equal(input);
    });
  });
};

export const validatePendingOperation = (id: string, message: string): void => {
  logMessage(`Validate Pending Operation: Id=${id}, Message=${message}`);

  cy.get(`#${id}`).as('pendingOperation');
  cy.get('@pendingOperation').should('exist');
  cy.get('@pendingOperation').invoke('text').should('eq', message);
};

export const validateLoadingIndicator = (id: string, isVisible = true): void => {
  logMessage(`Validate Loading Indicator: Id=${id}, Visible=${isVisible}`);

  if (isVisible) {
    cy.get(`#${id}`).should('exist');
  } else {
    cy.get(`#${id}`).should('not.exist');
  }
};

export const getUuidFromUrl = (): string => {
  let uuid = '';

  cy.url().then((url) => {
    const index: number = url.lastIndexOf('/');
    uuid = url.substring(index + 1);

    logMessage(`UUID from URL: ${uuid} from ${url}`);
  });

  return uuid;
};

export const validateSwitchStatus = (id: string, value: string): void => {
  logMessage(`Validate Switch Auto Approve is Off/On: Id=${id}, Value=${value}`);

  cy.get(`[data-automation-id=${id}]`)
    .should('exist')
    .then((val) => {
      if (val.text() == value) {
        logMessage(`Auto Approve Switch is disabled, Need to Enabled`);

        // switch the button
        cy.wrap(val).click();

        // Cancel Button - Enabled
        validateButton('cancelButton', 'Cancel', true);

        //Save button - enabled
        validateButton('saveButton', 'Save', true);

        //click on save button
        clickButton('saveButton');

        //Validate the alert message
        validateText('notificationDescription', 'The Settings were saved.');
      } else {
        logMessage(`Auto Approve Switch is Enabled`);
      }
    });
};

export const validateSwitch = (id: string, value: string, isEnabled = true): void => {
  logMessage(`Validate Switch: Id=${id}, Value=${value}, Enabled=${isEnabled}`);

  cy.get(`[data-automation-id=${id}]`).as('switch');
  cy.get('@switch').should('exist');
  cy.get('@switch').invoke('text').should('eq', value);

  if (isEnabled) {
    cy.get('@switch').should('be.enabled');
  } else {
    cy.get('@switch').should('be.disabled');
  }
};

export const toggleSwitch = (id: string): void => {
  logMessage(`Toggle Switch: Id=${id}`);

  cy.get(`[data-automation-id=${id}]`).as('switch');
  cy.get('@switch').should('exist');
  cy.get('@switch').should('be.enabled');
  cy.get('@switch').click();
};

export const validateVirusIcon = (VirusIconColor: string): void => {
  if (VirusIconColor === 'red') {
    cy.get('.vtx-icon-color-red.vtx-icon-bug').last().trigger('mouseover');
    cy.get('.ant-tooltip').should('be.visible');
  }
  if (VirusIconColor === 'blue') {
    cy.get('.vtx-icon-color-blue.vtx-icon-bug').last().trigger('mouseover');
    cy.get('.ant-tooltip').should('be.visible');
  } else {
    cy.get('.vtx-icon-color-green.vtx-icon-bug').last().trigger('mouseover');
    cy.get('.ant-tooltip').should('be.visible');
  }
};

export const validateErrorFile = (fileName: string, downloadTimeoutMilliseconds = 10000): void => {
  const errorFileName =
    fileName.slice(0, fileName.length - 4) + ' - Errors' + fileName.slice(fileName.length - 4);

  logMessage('Validate Error File:', errorFileName);

  // Leave enough time for the errors to be downloaded
  validateText('fileViewerHeader', errorFileName, true, 10000);

  validateButton('exportButton', 'Export', true);
  validateButton('closeButton', 'Close', true);

  clickButton('exportButton');

  cy.verifyDownload(errorFileName, { timeout: downloadTimeoutMilliseconds, interval: 600 });

  clickButton('closeButton');
};

export const validateBreadCrumb = (id: string, value: string | null = null): void => {
  logMessage(`Validate BreadCrumb: Id=${id}, Value=${value},`);

  cy.get(`#${id}`).as('breadCrumb');
  cy.get('@breadCrumb').should('exist');
  cy.get('@breadCrumb').should('be.visible');
};

export const selectValueFromTableFilterDropdown = (
  columnName: string,
  index: number,
  value: string | null,
): void => {
  logMessage(`Select from Table Filter: ColumnName=${columnName}, Value=${value}`);

  // Construct the ID from the Column Name
  const id = `search-${columnName}-${index}-option`;

  if (value) {
    // Expand the Drop List
    cy.get(`#${id} > .searchTypeSelect__control > .searchTypeSelect__value-container > .vtx-select`)
      .should('exist')
      .click();

    // Select the Correct Value from the Drop List
    cy.get(`#${id} > .searchTypeSelect__menu > .searchTypeSelect__menu-list`)
      .contains(`${value}`)
      .click({ force: true });

    // Verify that the Correct Value has been selected
    cy.get(`#${id} > .searchTypeSelect__control`).should('have.text', `${value}`);
  }
};

export const selectPopulateSubmitFilter = (
  columnName: string,
  dropdownvalue: string,
  inputvalue1: any | null = null,
  andor: string | null = null,
  dropdownvalue2: string | null = null,
  inputvalue2: any | null = null,
  inputForAndOr: string | null = null,
): void => {
  logMessage(
    `Select from Dropdown: columnName=${columnName}, DropDownvalue=${dropdownvalue},InputTextValue=${inputvalue1}`,
  );

  if (columnName != 'status') {
    // Select the Correct Filter
    selectValueFromTableFilterDropdown(columnName, 1, dropdownvalue);

    if (inputvalue1) {
      cy.get(`#search-${columnName}-1-from-value`).as('inputField');
      cy.get('@inputField').should('exist');
      cy.get('@inputField').clear({ force: true });
      cy.get('@inputField').type(`${inputvalue1}{enter}`, { force: true });
    }

    if (andor) {
      cy.get(`#search-condition-${columnName}-${andor}`).click({ force: true });

      if (andor === 'and' || 'or') {
        validateButton(`${columnName}-searchButton`, 'Filter', false);

        // Select the Correct Filter
        selectValueFromTableFilterDropdown(columnName, 2, dropdownvalue2);
      } else {
        validateButton(`${columnName}-searchButton`, 'Filter', true);

        // Select the Correct Filter
        selectValueFromTableFilterDropdown(columnName, 2, dropdownvalue2);
      }

      // cy.get(`#search-${columnName}-2-from-value`)
      //   .click({ force: true })
      //   .type(`${inputForAndOr}{enter}`, { force: true });

      // cy.get(`#${columnName}-searchButton`).as('button');
      // cy.get('@button').should('exist');
      // cy.get('@button').should('be.enabled');
      // cy.get('@button').click({ force: true });
    }

    if (inputvalue2) {
      if (dropdownvalue == 'In range (included)') {
        cy.get(`#search-${columnName}-1-to-value`).as('inputField');
        cy.get('@inputField').should('exist');
        cy.get('@inputField').clear({ force: true });
        cy.get('@inputField').type(`${inputvalue2}{enter}`, { force: true });
      } else if (dropdownvalue == 'In range (excluded)') {
        cy.get(`#search-${columnName}-1-to-value`).as('inputField');
        cy.get('@inputField').should('exist');
        cy.get('@inputField').clear({ force: true });
        cy.get('@inputField').type(`${inputvalue2}{enter}`, { force: true });
      } else {
        cy.get(`#search-${columnName}-2-from-value`).as('inputField');
        cy.get('@inputField').should('exist');
        cy.get('@inputField').clear({ force: true });
        cy.get('@inputField').type(`${inputvalue2}{enter}`, { force: true });
      }
    }

    validateButton(`${columnName}-searchButton`, 'Filter', true);
    cy.get(`#${columnName}-searchButton`).as('button');
    cy.get('@button').should('exist');
    cy.get('@button').should('be.enabled');
    cy.get('@button').click({ force: true });
  }

  if (columnName === 'status') {
    cy.get('#select-status-search').click({ force: true }).type(`${inputvalue1}{enter}`, { force: true });

    cy.get('#select-status-radio-group')
      .contains(`${dropdownvalue}`, { matchCase: false })
      .click({ force: true });

    cy.get(`#${columnName}-searchButton`).as('button');
    cy.get('@button').should('exist');
    cy.get('@button').should('be.enabled');
    cy.get('@button').click({ force: true });
  }

  // Give the Grid Chance to Refresh after the filter selection
  wait(1000);
};

export const sortColumnInHistory = (columnName: string, pageName: string): void => {
  const historyMenuList = ['name', 'filename', 'date', 'version', 'user', 'status', 'error'];
  const reviewMenuList = ['name', 'description', 'taxcat', 'probability', 'status'];
  const SMEreviewMenuList = ['Added Date and Time', 'Item Count', 'Status', 'Days in Queue', 'Batch Number'];
  const SMEBatchReviewList = ['product_name', 'taxcat_reviewed', 'probability', 'source_name'];

  if (pageName === 'History Page') {
    cy.get('.ant-table-filter-column').each((item, index, $list) => {
      if (columnName == historyMenuList[index]) {
        cy.get('.ant-table-filter-column').eq(index).click({ force: true });
      }
    });
  }

  if (pageName === 'Review Page') {
    cy.get('.ant-table-filter-column').each((item, index, $list) => {
      if (columnName == reviewMenuList[index]) {
        cy.get('.ant-table-filter-column').eq(index).click({ force: true });
      }
    });
  }

  if (pageName === 'SME Review Page') {
    if (columnName == 'Batch Number') {
      cy.get('.ant-table-cell-content > .ant-table-column-sorters').click({ force: true });
    }

    cy.get('.ant-table-filter-column').each((item, index, $list) => {
      if (columnName == SMEreviewMenuList[index]) {
        cy.get('.ant-table-filter-column').eq(index).click({ force: true });
      }
    });
  }

  if (pageName === 'SME Batch Review Page') {
    cy.get('.ant-table-filter-column').each((item, index, $list) => {
      if (columnName == SMEBatchReviewList[index]) {
        cy.get('.ant-table-column-title > .ant-table-column-sorters').eq(index).click({ force: true });
      }
    });
  }
};

export const clickFilterIcon = (columnName: string, pageName: string): void => {
  const historyMenuList = ['name', 'filename', 'date', 'version', 'user', 'status', 'error'];
  const reviewMenuList = ['name', 'description', 'taxcat', 'probability', 'status'];
  const SMEreviewMenuList = ['Added Date and Time', 'Item Count', 'status', 'Days in Queue'];
  const SMEBatchReviewList = ['product_name', 'taxcat_reviewed', 'probability', 'source_name'];

  if (pageName === 'History Page') {
    cy.get('.ant-table-filter-column > .ant-dropdown-trigger').each((item, index, $list) => {
      if (columnName == historyMenuList[index]) {
        cy.get('.ant-table-filter-column > .ant-dropdown-trigger').eq(index).click({ force: true });
      }
    });
  }

  if (pageName === 'Review Page') {
    cy.get('.ant-table-filter-column > .ant-dropdown-trigger').each((item, index, $list) => {
      if (columnName == reviewMenuList[index]) {
        cy.get('.ant-table-filter-column > .ant-dropdown-trigger').eq(index).click({ force: true });
      }
    });
  }

  if (pageName === 'SME Review Page') {
    cy.get('.ant-table-filter-column > .ant-dropdown-trigger').each((item, index, $list) => {
      if (columnName == SMEreviewMenuList[index]) {
        cy.get('.ant-table-filter-column > .ant-dropdown-trigger').eq(index).click({ force: true });
      }
    });
  }

  if (pageName === 'SME Batch Review Page') {
    cy.get('.ant-table-filter-column > .ant-dropdown-trigger').each((item, index, $list) => {
      if (columnName == SMEBatchReviewList[index]) {
        cy.get('.ant-table-filter-column > .ant-dropdown-trigger').eq(index).click({ force: true });
      }
    });
  }
};

export const uploadFileRequest = (fileName: string, aliasName: string, token: string) => {
  const url = Cypress.env('uploadmappingendpoint');

  const data = new FormData();
  data.append('file', fileName);

  cy.intercept('POST', url)
    .as(aliasName)
    .window()
    .then((win) => {
      cy.fixture(fileName, 'binary')
        .then((binary) => Cypress.Blob.binaryStringToBlob(binary))
        .then((blob) => {
          const xhr = new win.XMLHttpRequest();
          data.set('user-file', blob, fileName);
          xhr.open('POST', Cypress.env('uploadmappingendpoint'));
          xhr.setRequestHeader('Authorization', `Bearer ${token}`);
          xhr.send(data);
        });
    });
};

export const selectStatusDropdownInHistory = (id: string, value: string | null): void => {
  logMessage(`Select Status: ID=${id}, Value=${value}`);

  if (value) {
    // Expand the Drop List
    cy.get(`#${id} > .statusSelector__control`).should('exist').trigger('mouseover').click({ force: true });

    // Select the Correct Value from the Drop List
    cy.get(`#${id} > .statusSelector__menu > .statusSelector__menu-list`)
      .contains(`${value}`)
      .click({ force: true });

    // Verify that the Correct Value has been selected
    cy.get(`#${id} > .statusSelector__control`).should('have.text', `${value}`);
  }
};

export const validateUnsavedText = (
  element: string,
  value: string,
  maxTimeMilliseconds: number = 4000,
): void => {
  logMessage(`Validate Text: Element=${element}, Value=${value}`);

  cy.contains(value);
  // cy.get(element).contains(value);
};

export const validateUnsavedButton = (element: string, value: string, isEnabled = true): void => {
  logMessage(`Validate Button: Id=${element}, Value=${value}, Enabled=${isEnabled}`);

  cy.get(element).as('button');
  cy.get('@button').should('exist');
  cy.get('@button').invoke('text').should('eq', value);

  if (isEnabled) {
    cy.get('@button').should('be.enabled');
  } else {
    cy.get('@button').should('be.disabled');
  }
};

export const clickUnsavedButton = (element: string): void => {
  logMessage(`Click Button: Element=${element}`);

  cy.get(element).as('button');
  cy.get('@button').should('exist');
  cy.get('@button').should('be.enabled');
  cy.get('@button').click();
};

export const validateUnsavedConfirmationMessage = (
  heading: string,
  message: string,
  leavePage: string,
  stayOnPage: string,
): void => {
  logMessage(
    `Validate Confirmation Message Text: Heading=${heading}, Message=${message}, LeavePage=${leavePage}, StayOnPage=${stayOnPage}`,
  );

  validateUnsavedText('#rcDialogTitle0 > h2', heading);
  validateUnsavedText('.ant-modal-body', message);

  validateUnsavedButton('.ant-modal-footer > .ant-btn-default', stayOnPage, true);
  validateUnsavedButton('.ant-modal-footer > .ant-btn-primary', leavePage, true);
};

export const validateAndClickButton = (buttonOption: string): void => {
  // Validate the Confirmation Message
  validateUnsavedConfirmationMessage('Unsaved Changes', unsavedMessage, 'Leave Page', 'Stay on this Page');

  // Click the Yes
  if (buttonOption == 'Leave Page') {
    clickUnsavedButton('.ant-modal-footer > .ant-btn-primary');
  } else {
    clickUnsavedButton('.ant-modal-footer > .ant-btn-default');
  }
};

export const validateCancelledJobOnHistory = (
  cancelJobName: string,
  productFile: string,
  currentUser: string,
): void => {
  // Validate the Confirmation Message
  validateConfirmationMessage('Cancel Job?', cancelMessage(cancelJobName), 'Yes', 'No');

  // Click the Yes
  clickButton('okConfirmationButton');

  wait(15000);

  // Wait for the Job History to reload.  Will take some time
  validateText('tcHeader', historyHeader, true, 40000);

  const columnValues: any[] = [cancelJobName, productFile, null, null, currentUser, 'Cancelled', '', ''];

  validateTableRow('JobsHistory', 'Name', cancelJobName, columnValues);
};

export const validateCancelledJob = (
  cancelJobName: string,
  productFile: string,
  currentUser: string,
  isCancel: boolean,
  isHistory: boolean = false,
): void => {
  logMessage(
    `Validate the Cancel Job: JobName=${cancelJobName}, ProductFile=${productFile},CurrentUser=${currentUser}, IsCancel=${isCancel}, isHistory=${currentUser}`,
  );

  let columnValues: any[] = [];

  // Validate the Confirmation Message
  validateConfirmationMessage('Cancel Job?', cancelMessage(cancelJobName), 'Yes', 'No');

  if (isCancel) {
    // Click the Yes
    clickButton('okConfirmationButton');

    columnValues = [cancelJobName, productFile, null, null, currentUser, 'Cancelled', '', ''];
    if (isHistory) {
      wait(15000);
    }
  } else {
    // Click the No
    clickButton('cancelConfirmationButton');

    if (!isHistory) {
      // Wait for Job Status to change to 'Mapped'
      waitForElement('jobStatus', 'Mapped', TIME_TO_WAIT_FOR_ELEMENT);

      //Go to History Page
      goToHistoryPage();
    }

    columnValues = [cancelJobName, productFile, null, null, currentUser, 'Mapped', '', 'Actions'];
  }

  // Wait for the Job History to reload.  Will take some time
  validateText('tcHeader', historyHeader, true, TIME_TO_WAIT_FOR_ELEMENT);

  validateTableRow('JobsHistory', 'Name', cancelJobName, columnValues);
};

export const validateSelectValue = (element: string, value: string): void => {
  cy.get(element).should('have.text', `${value} / page`);
};

export const validateDummyCategoryTree = (id: string, fileName: string): void => {
  logMessage(`Validate File Select With File: Id = ${id}, FileName = ${fileName}`);

  cy.get(`#${id}`).as('tree');
  cy.get('@tree').should('exist');
  cy.get('@tree').click({ force: true }).click({ force: true });

  cy.fixture(fileName).then((json) => {
    for (var indx in json) {
      logMessage('adjusments as 1st', json[indx].code);

      cy.get('.ant-select-selection-item').then(($typ) => {
        cy.wrap(json).each(($array, index) => {
          cy.get(`#${id}`).clear({ force: true }).click({ force: true });
          cy.get('.ant-select-selection-item > span').type(json[index].code), { force: true };

          cy.get(
            'div.ant-select-dropdown:not(div.ant-select-dropdown-hidden) > div  div.ant-select-tree-list-holder-inner > div',
          )
            .get('.ant-select-tree-title')
            .contains(json[index].code);

          cy.get('.ant-select-tree-treenode-disabled > .ant-select-tree-node-content-wrapper').each(
            ($elm, ind) => {
              cy.wrap($elm)
                .invoke('text')
                .then((text) => {
                  logMessage(text);
                  if (text === json[index].code) {
                    cy.get(
                      '.ant-select-tree-treenode-disabled > .ant-select-tree-node-content-wrapper',
                    ).should('have.css', 'cursor', 'not-allowed');
                  }
                });
            },
          );
        });
      });

      break;
    }
  });
};

export const validateStatusNonClickable = (status: string, isNonClickable: boolean): void => {
  logMessage(`Validate the Jobs is Non Clickable : Status=${status}, Is Non Clickable=${isNonClickable}`);
  // Clicking on Name column Filter Icon
  clickFilterIcon('status', 'History Page');

  // Selecting, Populating and clicking the Filter button
  selectPopulateSubmitFilter('status', status, status);

  cy.get('#JobsHistory').get('tr').get('.ant-table-row').as('jobRow');
  cy.get('@jobRow')
    .invoke('attr', 'data-row-key')
    .then((uuid) => {
      const jobId: any = uuid;
      logMessage('Job Id: ', jobId);

      if (isNonClickable) {
        validateTableLinkNonClickable('JobsHistory', jobId, 'name');

        // Validate Header - This means the UI did not Navigate to any Step
        validateText('tcHeader', historyHeader);
      } else {
        validateTableLinkClickable('JobsHistory', jobId, 'name');
      }

      // Click Clear Filter button
      clickIcon('clearFiltersButton');
    });
};

export const clickReviewInActions = (batchIndex: number): void => {
  logMessage(`Get Batch Number by Index: IndexValue=${batchIndex}`);

  cy.get('.ant-table-cell-fix-right > .reviewButton > .columnLinkWithText > #undefined-name')
    .eq(batchIndex)
    .click({ force: true });
};

export const validateTextByClass = (
  className: string,
  value: string,
  exact: boolean = true,
  maxTimeMilliseconds: number = 4000,
): void => {
  logMessage(`Validate Text: Id=${className}, Value=${value}`);

  cy.get(`.${className}`, { timeout: maxTimeMilliseconds }).as('textField');
  cy.get('@textField').should('exist');

  if (exact) {
    cy.get('@textField').invoke('text').should('eq', value);
  } else {
    cy.get('@textField').contains(value);
  }
};

export const clickIconByClassName = (className: string): void => {
  logMessage(`Click Icon: Id=${className}`);

  cy.get(`.${className} > .vtx-icon`).as('icon');
  cy.get('@icon').should('exist');
  cy.get('@icon').click();
};

export const validateElement = (id: string, isExists: boolean = true): void => {
  logMessage(`Validate Element Exists or Not: Id=${id}`);
  if (isExists) {
    cy.get(`#${id}`).should('exist');
  } else {
    cy.get(`#${id}`).should('not.exist');
  }
};
