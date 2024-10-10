import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './burger-ingredient.module.css';

import {
  Counter,
  CurrencyIcon,
  AddButton
} from '@zlden/react-developer-burger-ui-components';

import { TBurgerIngredientUIProps } from './type';
import { useDispatch } from 'react-redux';
import {
  addIngredient,
  addBun
} from '../../../services/reducers/ConstructorReducer';
import { TConstructorIngredient } from '@utils-types';

export const BurgerIngredientUI: FC<TBurgerIngredientUIProps> = memo(
  ({ ingredient, count, locationState }) => {
    const { image, price, name, _id, type } = ingredient;
    const dispatch = useDispatch();
    const handleAdd = () => {
      if (type === 'bun') {
        const constructorBun: TConstructorIngredient = {
          ...ingredient,
          id: _id
        };
        dispatch(addBun(constructorBun));
      } else {
        const constructorIngredient: TConstructorIngredient = {
          ...ingredient,
          id: _id
        };
        dispatch(addIngredient(constructorIngredient));
      }
    };

    return (
      <li className={styles.container}>
        <Link
          className={styles.article}
          to={`/ingredients/${_id}`}
          state={locationState}
        >
          {count && <Counter count={count} />}
          <img className={styles.img} src={image} alt='картинка ингредиента.' />
          <div className={`${styles.cost} mt-2 mb-2`}>
            <p className='text text_type_digits-default mr-2'>{price}</p>
            <CurrencyIcon type='primary' />
          </div>
          <p className={`text text_type_main-default ${styles.text}`}>{name}</p>
        </Link>
        <AddButton
          text='Добавить'
          onClick={handleAdd}
          extraClass={`${styles.addButton} mt-8`}
        />
      </li>
    );
  }
);
