import React  from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './form.css';

const loginSchema = Yup.object().shape({
  password: Yup.string()
    .min(4, "Слишком короткий пароль!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Введите email")
});

const url = "https://internsapi.public.osora.ru/api/auth/login";

class LoginForm extends React.Component {
  handleSubmit = async (values) => {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values),
      })

      if (response.ok) {
        let json = await response.json();
        let data = await json.data;
        localStorage.setItem('token', data.access_token);
        this.context.router.history.push("/game");
      }
  };

  render() {
    return (
      <>
        <Formik
          initialValues={{ email: "test@mail.ru", password: "123456" }}
          validationSchema={loginSchema}
          onSubmit={this.handleSubmit}
        >
          {() => {
            return (
              <Form className='form'>
                <h1 className='form__title'>Вход</h1>
                <label className='form__label'>
                  Email:
                  <Field type="email" name="email" />
                  <ErrorMessage name="email" component="div" />
                </label>
                <label className='form__label'>
                  Пароль:
                  <Field type="password" name="password" />
                  <ErrorMessage name="password" component="div" />
                </label>
                <button className='form__btn' type="submit">
                  Войти
                </button>
              </Form>
            );
          }}
        </Formik>
      </>
    );
  }
}

export default LoginForm;
