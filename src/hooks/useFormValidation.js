import { useCallback, useState } from "react";

export default function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isInputValid, setIsInputValid] = useState([]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const validationMessage = e.target.validationMessage;
    const valid = e.target.validity.valid;
    const form = e.target.form;

    setValues((prevState) => {
      return { ...prevState, [name]: value };
    });
    setErrors((prevState) => {
      return { ...prevState, [name]: validationMessage };
    });

    setIsInputValid((prevState) => {
      return { ...prevState, [name]: valid };
    });

    setIsValid(form.checkValidity());
  };

  const reset = (data = {}) => {
    setValues(data);
    setErrors({});
    setIsInputValid([]);
    setIsValid(false);
  };

  const setValue = useCallback((name, value) => {
    setValues((prevState) => {
      return { ...prevState, [name]: value };
    });
  }, []);

  return {
    handleChange,
    values,
    errors,
    isValid,
    isInputValid,
    reset,
    setValue,
  };
}
