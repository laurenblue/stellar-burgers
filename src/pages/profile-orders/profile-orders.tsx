import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useDispatch } from '../../services/store'; // Import your typed useDispatch
import { fetchUserOrders } from '../../services/reducers/orderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  // Получаем заказы из хранилища
  const { ordersHistory, ordersHistoryRequest, ordersHistoryFailed } =
    useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(fetchUserOrders()); // Загружаем заказы при монтировании компонента
  }, [dispatch]);

  if (ordersHistoryRequest) {
    return <p>Загрузка истории заказов...</p>;
  }
  if (ordersHistoryFailed) {
    return <p>Ошибка загрузки заказов</p>;
  }
  return <ProfileOrdersUI orders={ordersHistory || []} />;
};
