import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';
import { fetchUserOrders } from '../../services/reducers/OrderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const { ordersHistory, ordersHistoryRequest, ordersHistoryFailed } =
    useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (ordersHistoryRequest) {
    return <p>Загрузка истории заказов...</p>;
  }
  if (ordersHistoryFailed) {
    return <p>Ошибка загрузки заказов</p>;
  }
  return <ProfileOrdersUI orders={ordersHistory || []} />;
};
