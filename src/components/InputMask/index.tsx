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
import InputMask from 'react-input-mask';
import { Container, Error, TooltipText } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  mask?: any;
  icon?: React.ComponentType<IconBaseProps>;
  containerStyle?: object;
}

const Input: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  mask,
  icon: Icon,
  ...rest
}) => {
  const inputRef = useRef<any>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

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
      <InputMask
        mask={mask}
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {/* {error && (
        <Error title={error}>
          <FiAlertCircle color="#c56060" size={20} />
        </Error>
      )} */}
    </Container>
  );
};
export default Input;
