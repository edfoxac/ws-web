/* eslint-disable react/prop-types */
import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import ptBR from 'date-fns/locale/pt-BR';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import InputMask from 'react-input-mask';

import { addHours, format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { Container, Error, TooltipText } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  dataAtual: string;
  onNameChange(name: any): any;
  icon?: React.ComponentType<IconBaseProps>;
  containerStyle?: object;
}

const Input: React.FC<InputProps> = ({
  name,
  onNameChange,
  dataAtual,
  containerStyle = {},
  icon: Icon,
  ...rest
}) => {
  const inputRef = useRef<any>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, error, registerField } = useField(name);

  const znDate = zonedTimeToUtc(dataAtual, 'America/Sao_Paulo');
  const addedDate = addHours(znDate, 24);
  const parsedDate1 = format(new Date(addedDate), 'yyyy-MM-dd');

  const [date, setDate] = useState(new Date(parsedDate1));
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleInputFocused = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleInputChange = useCallback(
    (nameChange: any) => {
      onNameChange(nameChange);
      const znDate2 = zonedTimeToUtc(nameChange, 'America/Sao_Paulo');
      const addedDate2 = addHours(znDate2, 24);
      const parsedDate2 = format(new Date(addedDate2), 'yyyy-MM-dd');
      setDate(new Date(parsedDate2));
    },
    [onNameChange],
  );

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
    >
      {error ? (
        <Error title={error}>
          <FiAlertCircle color="#c56060" size={20} />
        </Error>
      ) : (
        <>
          <TooltipText title={`${rest.placeholder}`}>
            {Icon && <Icon size={20} />}
          </TooltipText>
        </>
      )}

      <DatePicker
        dateFormat="dd-MM-yyyy"
        locale={ptBR}
        selected={date}
        onChange={(data) => handleInputChange(data)}
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
        customInput={<InputMask mask="99-99-9999" />}
      />
    </Container>
  );
};
export default Input;
