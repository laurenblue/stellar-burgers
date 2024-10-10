import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import { RootState } from 'src/services/store';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/services/store';
import { closeModal } from '../../services/reducers/orderSlice';
import { createOrder } from '../../services/reducers/orderSlice';
export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const constructorItems = useSelector(
    (state: RootState) => state.constructorData
  );
  const { orderRequest, order } = useSelector(
    (state: RootState) => state.order
  );
  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsPrice = constructorItems.ingredients.reduce(
      (sum, ingredient) => sum + ingredient.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  const onOrderClick = () => {
    if (
      constructorItems.bun &&
      constructorItems.ingredients.length > 0 &&
      !orderRequest
    ) {
      const ingredientIds = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((item) => item._id),
        constructorItems.bun._id
      ];
      dispatch(createOrder(ingredientIds))
        .unwrap()
        .catch((error) => {
          console.error('Order creation failed: ', error);
        });
    } else {
      alert('Выберите булки и начинки для оформления заказа');
    }
  };
  const closeOrderModal = () => {
    dispatch(closeModal());
  };
  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={order}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
