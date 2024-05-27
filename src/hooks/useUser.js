// useBook.js (Hook personalizado)
import { useState } from 'react';
import { updateUser} from '../services/user';

const useUser = () => {
  const [error, setError] = useState(null);

  const UpdateUserHandler = async (id,bodyUser) => {
    try {
      setError(null);
      const response = await updateUser(id,bodyUser);
      return response;
    } catch (error) {
      setError(error.message);
    }
  };


  return { error, UpdateUserHandler: UpdateUserHandler };

};

export default useUser;
