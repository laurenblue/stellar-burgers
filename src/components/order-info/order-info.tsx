import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds } from '../../services/slices/FeedSlice';
import { getIngredients } from '../../services/slices/IngredientsSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const dispatch = useDispatch();

  // Получаем данные о заказе и ингредиентах из хранилища
  const orderData = useSelector((state) =>
    state.feed.orders.find((item) => item.number === Number(number))
  );
  const ingredients: TIngredient[] = useSelector(
    (state) => state.ingredients.ingredients
  );
  const loadingFeeds = useSelector((state) => state.feed.loading);
  const loadingIngredients = useSelector((state) => state.ingredients.loading);

  // Загружаем заказы и ингредиенты, если их нет
  useEffect(() => {
    if (!orderData) {
      dispatch(getFeeds());
    }
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
  }, [dispatch, orderData, ingredients]);

  // Мемоизация данных о заказе
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  // Отображаем лоадер, пока данные загружаются
  if (loadingFeeds || loadingIngredients || !orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
