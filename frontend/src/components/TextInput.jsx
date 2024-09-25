import React from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  padding: 0px 4px;
  text-transorm: uppercase;
`;

const OutlinedInput = styled.div`
  border-radius: 8px;
  border: 0.5px solid ${({ theme }) => theme.text_secondary};
  background-color: transparent;
  color: ${({ theme }) => theme.text_secondary};
  outline: none;
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Input = styled.input`
  width: 100%;
  font-size: 14px;
  outline: none;
  border: none;
  resize: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text_secondary};
  &:focus {
    outline: none;
  
`;

const TextInput = ({
  label,
  placeholder,
  name,
  value,
  handleChange,
  textArea,
  rows,
  columns,
  isDisabled,
}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <OutlinedInput>
        <Input
          autoComplete="off"
          as={textArea ? "textarea" : "input"}
          name={name}
          rows={rows}
          columns={columns}
          placeholder={placeholder}
          value={value}
          disabled={isDisabled}
          onChange={(e) => handleChange(e)}
        />
      </OutlinedInput>
    </Container>
  );
};

export default TextInput;
