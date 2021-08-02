import React, { FC } from 'react';
import KalenderIkonSVG from '../../assets/KalenderIkonSVG';

export interface Props {
  onClick: () => void;
  disabled?: boolean;
  isOpen: boolean;
}

const CalendarButton: FC<Props> = ({
  onClick,
  disabled,
  isOpen,
}): JSX.Element => {
  return (
    <button
      ref={(c) => c}
      type="button"
      className="nav-datovelger__kalenderknapp"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
      }}
      disabled={disabled}
      aria-expanded={isOpen}
    >
      <span className="sr-only">Kalender</span>
      <span aria-hidden={true} className="nav-datovelger__kalenderknapp__icon">
        <KalenderIkonSVG height={16} width={16} />
      </span>
    </button>
  );
};
export default CalendarButton;
