import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { withRouter } from '../withRouter';


import { LoginForm, SignUp, Game, CardOfGame } from '../';


class Container extends React.Component {
  render() {
    return (
      <>
        <Routes>
          <Route path='/login' element={<LoginForm />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/game' element={<Game />}/>
          {/* <Route path='/test' element={<CardOfGame />}/> */}
        </Routes>
      </>
    );
  }
}

export default withRouter(Container);