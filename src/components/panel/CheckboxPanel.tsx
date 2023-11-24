import React, { PropsWithChildren } from 'react';
import { Checkbox } from '@navikt/ds-react';
import classnames from 'classnames';
import styled from 'styled-components';

interface Properties extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string | undefined;
  value: any;
  checked?: boolean | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const StyledCheckbox = styled(Checkbox)`
  &.checkbox-panel {
    width: 100%;
    background-color: #fff;
    border: 1px solid #6a6a6a;
    border-radius: 0.25rem;
    display: block;
    position: relative;
    font-family: 'Source Sans Pro', Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.375rem;
    font-weight: 400;

    &.active {
      background-color: #cce1ff;
      border: 1px solid transparent;
    }

    &:hover {
      border: 1px solid #0067c5;
      box-shadow: #a0a0a0 0 2px 1px 0;
      cursor: pointer;
    }

    &:focus-visible {
      outline: rgba(0, 52, 125, 1) solid 1px;
    }

    .navds-checkbox__label {
      outline: none;
      padding: var(--a-spacing-4);
    }
  }
`;

const CheckboxPanelCustom: React.FC<Properties> = ({
  name,
  value,
  checked,
  onChange,
  children,
}: PropsWithChildren<Properties>) => {
  return (
    <StyledCheckbox
      value={value}
      name={name}
      onChange={onChange}
      className={classnames('checkbox-panel', {
        active: checked,
        'non-active': !checked,
      })}
    >
      {children}
    </StyledCheckbox>
  );
};
export default CheckboxPanelCustom;
