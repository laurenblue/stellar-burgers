import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { updateUser } from '../../services/reducers/UserSlice';
import { RootState, AppDispatch } from '../../services/store';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const Profile: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useTypedSelector((state) => state.user.user);

  const [formValue, setFormValue] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  const [updateUserError, setUpdateUserError] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isFormChanged) {
      dispatch(
        updateUser({
          name: formValue.name,
          email: formValue.email,
          password: formValue.password
        })
      )
        .unwrap()
        .then(() => {
          setFormValue({ ...formValue, password: '' });
          setUpdateUserError(undefined);
        })
        .catch((err) => setUpdateUserError(err.message));
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      updateUserError={updateUserError}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      handleInputChange={handleInputChange}
    />
  );
};
