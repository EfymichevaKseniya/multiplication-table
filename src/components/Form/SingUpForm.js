import React  from 'react';
import { Navigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './form.css';

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Введите email"),
  name: Yup.string().required("Поле не может быть пустым"),
  password: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Поле не может быть пустым"),
  password_confirmation: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const url = 'https://internsapi.public.osora.ru/api/auth/signup';

class SignUp extends React.Component {
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
        <Navigate to='/login' />
      }
  };

  render() {
    return (
      <>
        <h1>Регистрация</h1>
        <Formik
          initialValues={{ email: 'test@mail.ru', password: '123456', password_confirmation: '123456', name: 'Petr'}}
          validationSchema={SignUpSchema}
          onSubmit={this.handleSubmit}
        >
          {() => {
            return (
              <Form className='form'>
                <h1 className='form__title'>Вход</h1>
                <label className='form__label'>
                  Имя:
                  <Field type="name" name="name" />
                  <ErrorMessage name="name" component="div" />
                </label>
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
                <label className='form__label'>
                  Повторите пароль:
                  <Field type="password" name="password_confirmation" />
                  <ErrorMessage name="password_confirmation" component="div" />
                </label>
                <button className='form__btn' type="submit">
                  Зарегистрироваться
                </button>
              </Form>
            );
          }}
        </Formik>
      </>
    );
  }
}

export default SignUp;