import {
  ConstructorPage,
  Feed,
  Profile,
  ProfileOrders,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { OrderInfo } from '@components';
import { AppHeader } from '@components';
import { IngredientDetails } from '@components';
import { Modal } from '@components';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getIngredients } from '../../services/reducers/RootReducer';
import { AppDispatch, RootState } from '../../services/store';
import { getFeeds } from '../../services/reducers/FeedSlice';
import { getUser } from '../../services/reducers/UserSlice';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../protectedRoute/ProtectedRoute';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getFeeds());
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:number'
          element={
            <Modal
              title='Лента заказов'
              onClose={() => {
                navigate('/feed');
              }}
            >
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal
              title='Детали ингредиента'
              onClose={() => {
                navigate('/');
              }}
            >
              <IngredientDetails />
            </Modal>
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title='Информация о заказе'
                onClose={() => navigate('/profile/orders')}
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Route>
        <Route
          path='/login'
          element={!isAuthorized ? <Login /> : <Navigate to='/' />}
        />
        <Route
          path='/register'
          element={!isAuthorized ? <Register /> : <Navigate to='/' />}
        />
        <Route
          path='/forgot-password'
          element={!isAuthorized ? <ForgotPassword /> : <Navigate to='/' />}
        />
        <Route
          path='/reset-password'
          element={!isAuthorized ? <ResetPassword /> : <Navigate to='/' />}
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
