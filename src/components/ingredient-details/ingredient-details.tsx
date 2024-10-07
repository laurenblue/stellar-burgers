// src/components/IngredientDetails.tsx
import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/services/store';

export const IngredientDetails: FC = () => {
  const { id } = useParams<string>();

  const ingredientData = useSelector((state: RootState) =>
    state.root.ingredients.find((item) => item._id === id)
  );

  console.log(ingredientData);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
