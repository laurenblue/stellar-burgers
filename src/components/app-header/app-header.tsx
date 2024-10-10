import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { RootState } from 'src/services/store';
import { TypedUseSelectorHook } from 'react-redux';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const AppHeader: FC = () => {
  const name = useTypedSelector((state) => state.user.user?.name);
  return <AppHeaderUI userName={name} />;
};
