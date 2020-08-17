import React, { useRef, useEffect, useState, useCallback } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import { Container, Error, SelectArea, TooltipText } from './styles';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  containerStyle?: object;
}
const Select: React.FC<Props> = ({
  name,
  containerStyle = {},
  icon: Icon,
  ...rest
}) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!selectRef.current);
  }, []);

  const handleInputFocused = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  const customStyles = {
    // container: (provided: any) => ({
    //   width: '100%',
    // }),
    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: '1px dotted #f7ede8',
      color: state.isSelected ? '#f7ede8' : '#000',
      opacity: 1,
      backgroundColor: state.isSelected ? '#faaf40' : 'white',
    }),
    control: (provided: any) => ({
      ...provided,
      border: 0,
      margin: 0,
      background: 'transparent',
      color: '#f7ede8',
      minWidth: '200px',
      padding: 0,
    }),
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.3 : 1;
      const transition = 'opacity 300ms';
      return { ...provided, opacity, transition };
    },
  };

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
    >
      {/* {Icon && <Icon size={20} />} */}
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
      <SelectArea>
        <ReactSelect
          defaultValue={defaultValue}
          ref={selectRef}
          onFocus={handleInputFocused}
          onBlur={handleInputBlur}
          {...rest}
          styles={customStyles}
          theme={(theme) => ({
            ...theme,
            borderRadius: 5,
            colors: {
              ...theme.colors,
              primary25: '#faaf40',
              primary: 'transparent',
              neutral90: '#fff',
              neutral80: '#fff',
              primary50: '#faaf40',
            },
          })}
        />
      </SelectArea>
    </Container>
  );
};
export default Select;
