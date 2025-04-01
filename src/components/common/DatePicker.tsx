import React from 'react';
import styled from 'styled-components';
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const DatePickerWrapper = styled.div`
  .rmdp-container {
    width: 100%;
  }
  
  .rmdp-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    font-family: 'AnjomanMax';
    font-size: 0.875rem;
    color: #1e293b;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }
  }

  .rmdp-calendar {
    font-family: 'AnjomanMax';
  }

  .rmdp-day.rmdp-selected span {
    background-color: #6366f1;
  }

  .rmdp-day:not(.rmdp-disabled):not(.rmdp-day-hidden) span:hover {
    background-color: #818cf8;
  }
`;

interface CustomDatePickerProps {
  value: DateObject | null;
  onChange: (date: DateObject | null) => void;
  placeholder?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  placeholder = 'انتخاب تاریخ'
}) => {
  return (
    <DatePickerWrapper>
      <DatePicker
        value={value}
        onChange={onChange}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        format="YYYY/MM/DD"
        placeholder={placeholder}
      />
    </DatePickerWrapper>
  );
};

export default CustomDatePicker;