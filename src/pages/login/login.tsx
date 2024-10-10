import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../../services/reducers/UserSlice';
import { RootState, AppDispatch } from '../../services/store';
import { Navigate } from 'react-router-dom';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

interface LocationState {
  from?: {
    pathname: string;
  };
}

export const Login: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthorized = useTypedSelector((state) => state.user.isAuthorized);
  const error = useTypedSelector((state) => state.user.error);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((data) => {
        const from = (location.state as any)?.from?.pathname || '/';
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  if (isAuthorized) {
    return <Navigate to='/' replace />;
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
