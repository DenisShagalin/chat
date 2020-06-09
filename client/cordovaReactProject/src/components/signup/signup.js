import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Input from '../reusable/input';
import Button from '../reusable/button';
import { signUp } from '../../common/actions/auth';
import './signup.css';

const SignUp = ({ signUp }) => {
  const [nick, setNick] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const isAllFieldsFilled = !!nick && !!password && !!email
  return(
    <div className='signup__container'>
      <Input
        label='Nickname *'
        value={nick}
        onChange={(e) => setNick(e.target.value)}
        className='s_input'
      />
      <Input
        label='Password *'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='s_input'
        type='password'
      />
      <Input
        label='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='s_input'
      />
      <Input
        label='Email *'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='s_input'
      />
      <Button
        title='Register'
        disabled={!nick || !password}
        onClick={() => {
          isAllFieldsFilled && signUp({
            nick,
            password,
            name,
            email,
          });
        }}
      />
      <Link to='/signin'>
        Back
      </Link>
    </div>
  )
}

export default connect(() => ({}), {
  signUp,
})(SignUp);
