import React, { PropsWithChildren } from 'react';
import { Checkbox } from '@navikt/ds-react';
import classnames from 'classnames';
import styled from 'styled-components';
import {
  ABlue100,
  ABlue500,
  ABorderActionSelected,
  ABorderDefault,
  AShadowMedium,
} from '@navikt/ds-tokens/dist/tokens';

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
    border: 1px solid ${ABorderDefault};
    border-radius: 0.25rem;
    display: block;
    position: relative;
    font-family: 'Source Sans Pro', Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.375rem;
    font-weight: 400;

    &.active {
      background-color: ${ABlue100};
      border: 1px solid transparent;
    }

    &:hover {
      border: 1px solid ${ABlue500};
      box-shadow: ${AShadowMedium};
      cursor: pointer;
    }

    &:focus-visible {
      outline: ${ABorderActionSelected} solid 1px;
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
