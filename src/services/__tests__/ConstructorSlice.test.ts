import ConstructorSlice, {
  addBun,
  addIngredient,
  removeIngredient,
  clearConstructor,
  moveIngredientUp,
  moveIngredientDown
} from '../slices/ConstructorSlice';
import { TConstructorIngredient } from '@utils-types';

describe('constructorSlice reducer', () => {
  it('должен обработать экшен добавления булки', () => {
    const initialState = { bun: null, ingredients: [] };
    const action = addBun({
      _id: 'bun-id',
      name: 'test-bun',
      type: 'bun',
      price: 50,
      proteins: 10,
      fat: 20,
      carbohydrates: 5,
      calories: 200,
      image: '',
      image_large: '',
      image_mobile: ''
    } as TConstructorIngredient);
    const newState = ConstructorSlice(initialState, action);
    expect(newState.bun).toBeDefined();
    expect(newState.bun?._id).toBe('bun-id');
  });

  it('должен обработать экшен добавления ингредиента', () => {
    const initialState = { bun: null, ingredients: [] };
    const action = addIngredient({
      _id: 'test-id',
      name: 'test-ingredient',
      type: 'main',
      price: 100,
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      image: '',
      image_large: '',
      image_mobile: ''
    } as TConstructorIngredient);
    const newState = ConstructorSlice(initialState, action);
    expect(newState.ingredients.length).toBe(1);
    expect(newState.ingredients[0].id).toBeDefined();
  });

  it('должен обработать экшен удаления ингредиента по id', () => {
    const initialState = {
      bun: null,
      ingredients: [
        {
          id: 'test-id',
          _id: 'test-id',
          name: 'test-ingredient',
          type: 'main',
          price: 100,
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          image: '',
          image_large: '',
          image_mobile: ''
        } as TConstructorIngredient
      ]
    };
    const action = removeIngredient({ id: 'test-id' });
    const newState = ConstructorSlice(initialState, action);
    expect(newState.ingredients.length).toBe(0);
  });

  it('должен обработать экшен очистки конструктора', () => {
    const initialState = {
      bun: {
        _id: 'bun-id',
        name: 'test-bun',
        type: 'bun',
        price: 50,
        proteins: 10,
        fat: 20,
        carbohydrates: 5,
        calories: 200,
        image: '',
        image_large: '',
        image_mobile: ''
      } as TConstructorIngredient,
      ingredients: [
        {
          id: 'test-id',
          _id: 'test-id',
          name: 'test-ingredient',
          type: 'main',
          price: 100,
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          image: '',
          image_large: '',
          image_mobile: ''
        } as TConstructorIngredient
      ]
    };
    const action = clearConstructor();
    const newState = ConstructorSlice(initialState, action);
    expect(newState.bun).toBe(null);
    expect(newState.ingredients.length).toBe(0);
  });

  it('должен обработать экшен перемещения ингредиента вверх', () => {
    const initialState = {
      bun: null,
      ingredients: [
        {
          id: '1',
          _id: '1',
          name: 'ing1',
          type: 'main',
          price: 100,
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          image: '',
          image_large: '',
          image_mobile: ''
        },
        {
          id: '2',
          _id: '2',
          name: 'ing2',
          type: 'main',
          price: 100,
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          image: '',
          image_large: '',
          image_mobile: ''
        }
      ]
    };
    const action = moveIngredientUp(1);
    const newState = ConstructorSlice(initialState, action);
    expect(newState.ingredients[0].id).toBe('2');
  });

  it('должен обработать экшен перемещения ингредиента вниз', () => {
    const initialState = {
      bun: null,
      ingredients: [
        {
          id: '1',
          _id: '1',
          name: 'ing1',
          type: 'main',
          price: 100,
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          image: '',
          image_large: '',
          image_mobile: ''
        },
        {
          id: '2',
          _id: '2',
          name: 'ing2',
          type: 'main',
          price: 100,
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          image: '',
          image_large: '',
          image_mobile: ''
        }
      ]
    };
    const action = moveIngredientDown(0);
    const newState = ConstructorSlice(initialState, action);
    expect(newState.ingredients[0].id).toBe('2');
    expect(newState.ingredients[1].id).toBe('1');
  });
});
