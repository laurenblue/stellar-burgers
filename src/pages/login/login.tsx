import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/reducers/UserSlice';
import { RootState, AppDispatch } from '../../services/store';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const Login: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthorized = useTypedSelector((state) => state.user.isAuthorized);
  const error = useTypedSelector((state) => state.user.error);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  if (isAuthorized) {
    navigate('/');
  }

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
