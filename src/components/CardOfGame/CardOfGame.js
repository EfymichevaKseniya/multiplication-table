import React  from 'react';
import { Formik, Form } from 'formik';

const url = "https://internsapi.public.osora.ru/api/game/play";

class CardOfGame extends React.Component {
  constructor(props) {
    super(props);
    this.points = props.points;
    this.time = props.time;
    this.question = props.question;
    this.options = [];
  };
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
      }
  };

  renderAnswers = () => {
    this.props.options.map((item) =>  {
        return (
          <button className='form__btn' type="submit" name='answer'>
            {item}
          </button>
        )
      })
    };

  render() {
    return (
      <>
        <Formik
          initialValues={{answer: 0, type_hard: 0, type: 2}}
          onSubmit={this.handleSubmit}
        >
          {() => {
            return (
              <Form className='form'>
                <span className='form__title'>Score: {this.props.points}</span>
                <span className='form__title'>Timer: {this.props.time}</span>
                <span className='form__title'>{this.props.question} = ?</span>
                {
                  this.renderAnswers
                }
              </Form>
            );
          }}
        </Formik>
      </>
    );
  }
}

export default CardOfGame;
