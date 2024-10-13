import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] => {
  const statusToLower = status.toLowerCase();
  console.log('Filtering orders with status (lowercase):', statusToLower);
  const filteredOrders = orders.filter(
    (item) => item.status.toLowerCase() === statusToLower
  );
  console.log('Filtered orders:', filteredOrders);
  return filteredOrders.map((item) => item.number).slice(0, 20);
};

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector((state) => state.feed.orders);
  const feed = useSelector((state) => ({
    total: state.feed.total,
    totalToday: state.feed.totalToday
  }));

  console.log('Orders from state:', orders);
  console.log('Feed data from state:', feed);

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  console.log('Ready orders:', readyOrders);
  console.log('Pending orders:', pendingOrders);
  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
