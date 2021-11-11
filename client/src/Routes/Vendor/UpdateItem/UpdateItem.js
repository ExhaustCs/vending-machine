import axios from 'axios';
import React, { useState } from 'react';
import { useToasts } from 'react-toast-notifications';

export const UpdateItem = () => {
  const [description, setDescription] = useState();
  const [cost, setCost] = useState();
  const [quantity, setQuantity] = useState();
  const [itemId, setItemId] = useState();
  //   const [response, setResponse] = useState(false);
  const { addToast } = useToasts();

  const submitHandler = async (e) => {
    try {
      const newPut = {
        description,
        cost,
        quantity,
      };

      const response = await axios.put(`/api/vendor/items/${itemId}`, newPut);

      console.log(response.data.status);
      addToast('Item updated successfully', {
        appearance: 'success',
        autoDismiss: true,
      });
    } catch (error) {
      console.error(error);
      addToast(`${error}`, {
        appearance: 'fail',
        autoDismiss: true,
      });
    }
  };
  return (
    <div>
      <div className='wrapper'>
        <form onSubmit={(e) => submitHandler(e)}>
          <label>
            Item ID{' '}
            <input
              onChange={(e) => setItemId(e.target.value)}
              name='itemId'
              placeholder='0'
              type='number'
            />
          </label>
          <label>
            Description{' '}
            <input
              onChange={(e) => setDescription(e.target.value)}
              name='description'
              placeholder='...'
              type='text'
            />
          </label>
          <label>
            Cost{' '}
            <input
              onChange={(e) => setCost(e.target.value)}
              name='cost'
              placeholder='0.00'
              set='0.1'
              type='number'
            />
          </label>
          <label>
            Quantity{' '}
            <input
              onChange={(e) => setQuantity(e.target.value)}
              name='quantity'
              placeholder='0'
              type='number'
            />
          </label>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
};
