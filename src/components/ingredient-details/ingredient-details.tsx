import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const { id } = useParams<string>();

  const ingredientData = useSelector((state) =>
    state.ingredients.ingredients.find((item) => item._id === id)
  );

  console.log(ingredientData);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
