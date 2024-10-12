import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import { RootState } from 'src/services/store';
import { useDispatch } from '../../services/store';
import { closeModal, createOrder } from '../../services/reducers/OrderSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector((state) => state.constructorData);
  const { orderRequest, order } = useSelector((state) => state.order);
  const isAuthorized = useSelector((state) => state.user.isAuthorized);
  console.log(constructorItems);
  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsPrice = constructorItems.ingredients.reduce(
      (sum, ingredient) => sum + ingredient.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  const onOrderClick = () => {
    if (!isAuthorized) {
      navigate('/login');
    }
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
