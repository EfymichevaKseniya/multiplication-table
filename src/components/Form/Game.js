import React  from 'react';
import { Navigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import './form.css';
import CardOfGame from '../CardOfGame/CardOfGame';


const url = "https://internsapi.public.osora.ru/api/game/play";
const token = localStorage.getItem('token') ?? '';

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }
  componentDidMount() {
      if (!token) {
          this.props.history.push("/login");
      }
    }
  handleSubmit = async (values) => {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(values),
      })

      if (response.ok) {
        let json = await response.json();
        let data = await json.data;
        // this.props.history.push("/test");
        // <Navigate to='/test' element={<CardOfGame {...data} />} />
        console.log(data);
        this.setState(data);
      }
  };

  render() {
    return (
      <>
        <Formik
          initialValues={{type_hard: 0, type: 1}}
          onSubmit={this.handleSubmit}
        >
          {() => {
            return (
              <Form className='form'>
                  <Field name="type_hard" as="select">
                    <option value={1}>Easy/Легко</option>
                    <option value={2}>Hard/Сложно</option>
                  </Field>
                <button className='form__btn' type="submit">
                  Старт
                </button>
              </Form>
            );
          }}
        </Formik>
        {this.state && <CardOfGame {...this.state} />}
      </>
    );
  }
}

export default Game;
