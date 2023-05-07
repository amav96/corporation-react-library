import { BaseProps } from "../Form/Form.type";

export interface PropsDate extends BaseProps {
    onCalendarClose?: Function,
    onCalendarOpen?: Function,
    isClearable?: boolean,
    placeholderText?: string,
    dateFormat?: string
    showTimeSelect?: boolean,
    onDate?: Function, 
}

export interface PropsDateKey extends PropsDate {
    key: string;
  }
  