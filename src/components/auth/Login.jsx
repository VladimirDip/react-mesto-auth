import React from "react";
import useFormValidation from "../../hooks/useFormValidation";

function Login({ authorization, isDisabled }) {
  const { handleChange, errors, values, isValid } = useFormValidation();

  function handleSubmit(e) {
    e.preventDefault();
    const dataUser = {};
    dataUser.email = values.email;
    dataUser.password = values.password;

    authorization(dataUser);
  }

  return (
    <div className="startPage">
      <h2 className="startPage__name">Вход</h2>
      <form
        noValidate
        name={"Вход"}
        className="startPage__form"
        onSubmit={handleSubmit}
      >
        <div className="startPage__label">
          <input
            value={values.email ? values.email : ""}
            onChange={handleChange}
            required={true}
            minLength={2}
            maxLength={30}
            type="text"
            name="email"
            placeholder="email"
            className="startPage__input"
          />
          <span className="startPage__input-error">{errors.email}</span>
        </div>
        <div className="startPage__label">
          <input
            value={values.password ? values.password : ""}
            onChange={handleChange}
            required={true}
            minLength={6}
            maxLength={12}
            type="password"
            name="password"
            placeholder="Пароль"
            className="startPage__input "
          />
          <span className="startPage__input-error">{errors.password}</span>
        </div>
        <button
          type="submit"
          aria-label="saveButton"
          className={`${
            isValid
              ? "startPage__button"
              : "startPage__button startPage__button_inactive"
          }`}
          disabled={!isValid}
        >
          Войти
        </button>
        <div className="emptyName"></div>
      </form>
    </div>
  );
}

export default Login;
