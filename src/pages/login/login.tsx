import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../../services/reducers/UserSlice';
import { AppDispatch } from '../../services/store';
import { Navigate } from 'react-router-dom';

export const Login: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthorized = useSelector((state) => state.user.isAuthorized);
  const error = useSelector((state) => state.user.error);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        // Используем путь из localStorage для перенаправления
        const from = localStorage.getItem('redirectPath') || '/';
        localStorage.removeItem('redirectPath'); // Очищаем сохранённый маршрут после использования
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  // Если пользователь уже авторизован, перенаправляем на сохранённый маршрут
  if (isAuthorized) {
    const redirectPath = localStorage.getItem('redirectPath') || '/';
    localStorage.removeItem('redirectPath');
    return <Navigate to={redirectPath} replace />;
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
