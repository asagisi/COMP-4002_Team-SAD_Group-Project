import { useState } from "react";

type ValidationResult = {
  isValid: boolean;
  errorMessages: string[];
};

type UseFormInputReturn = {
  inputValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessages: string[];
  validate: (validator: (inputValue: string) => ValidationResult) => boolean;
};

export default function useFormInput(initialValue = ""): UseFormInputReturn {
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setErrorMessages([]);
  };

  const validate = (validator: (inputValue: string) => ValidationResult): boolean => {
    const result = validator(inputValue);

    if (result.isValid) {
      setErrorMessages([]);
    } else {
      setErrorMessages(result.errorMessages);
    }

    return result.isValid;
  };

  return { inputValue, onChange, errorMessages, validate };
}
