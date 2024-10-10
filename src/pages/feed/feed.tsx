import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFeeds } from '../../services/reducers/FeedSlice';
import { RootState, AppDispatch } from 'src/services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const orders: TOrder[] = useSelector((state: RootState) => state.feed.orders);
  const loading: boolean = useSelector(
    (state: RootState) => state.feed.loading
  );

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  if (loading || !orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeeds());
      }}
    />
  );
};
