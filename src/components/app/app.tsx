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
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getIngredients } from '../../services/reducers/RootReducer';
import { RootState } from '../../services/store';
import { getFeeds } from '../../services/reducers/FeedSlice';
import { getUser } from '../../services/reducers/UserSlice';
import { useSelector } from '../../services/store';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../protectedRoute/ProtectedRoute';
import { useLocation } from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;
  const isAuthorized = useSelector((state) => state.user.isAuthorized);

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
        </Route>
        <Route
          path='/login'
          element={!isAuthorized ? <Login /> : <Navigate to='/' replace />}
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

      {/* Modals are displayed outside the main Routes */}
      <Routes>
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
      </Routes>
    </div>
  );
};

export default App;
