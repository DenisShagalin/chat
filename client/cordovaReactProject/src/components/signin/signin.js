import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Input from '../reusable/input';
import Button from '../reusable/button';
import { signIn } from '../../common/actions/auth';
import './signin.css';

const SignIn = ({ signIn }) => {
  const [nick, setNick] = useState('');
  const [password, setPassword] = useState('');

  return(
    <div className='signin__container'>
      <Input
        label='Nickname'
        value={nick}
        onChange={(e) => setNick(e.target.value)}
        className='s_input'
      />
      <Input
        label='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='s_input'
        type='password'
      />
      <Button
        title='Confirm'
        disabled={!nick || !password}
        onClick={() => {
          signIn({
            nick,
            password,
          })
        }}
      />
      <Link to='/signup'>
        Registration
      </Link>
    </div>
  )
}

export default connect(() => ({}), {
  signIn,
})(SignIn);
