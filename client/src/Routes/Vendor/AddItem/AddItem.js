import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useToasts } from 'react-toast-notifications';
import { AddItemDiv, FormDiv, H1AddItem } from './styles';

export const AddItem = () => {
  const history = useHistory();

  const [description, setDescription] = useState('');
  const [cost, setCost] = useState(0);
  const [quantity, setQuantity] = useState(0);
  //   const [response, setResponse] = useState();
  const [itemId, setItemId] = useState();

  const handleBackButton = () => history.push('/vendor');
  const { addToast } = useToasts();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      //Check for the Name TextInput
      if (!description.trim()) {
        addToast('Value cannot be zero', {
          appearance: 'error',
          autoDismiss: true,
        });
        return;
      }

      const newPost = {
        description,
        cost,
        quantity,
      };

      const response = await axios.post('/api/vendor/items', newPost);

      //   setResponse(JSON.stringify(response.data.data));
      setItemId(response.data.data.id);
      addToast(`${description} was added successfully `, {
        appearance: 'success',
        autoDismiss: true,
      });
    } catch (error) {
      console.error(error);
      addToast(`Item already exists`, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  return (
    <div>
      <AddItemDiv>
        <H1AddItem>Add an item to vending machine</H1AddItem>
        <FormDiv>
          <form onSubmit={(e) => submitHandler(e)}>
            <fieldset>
              <label>
                description
                <input
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='chips'
                  type='text'
                  required
                />
              </label>
              <label>
                cost
                <input
                  onChange={(e) => setCost(e.target.value)}
                  placeholder='0.00'
                  type='number'
                  required
                />
              </label>
              <label>
                quantity
                <input
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder='15'
                  type='number'
                  required
                />
              </label>
            </fieldset>

            <button type='submit'>Submit</button>
            {/* <button onClick={() => handleBackButton()}>Go back</button> */}
          </form>
        </FormDiv>
      </AddItemDiv>
    </div>
  );
};
