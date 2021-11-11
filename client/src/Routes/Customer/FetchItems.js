import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import {
  ItemButton,
  MoneyInputDiv,
  MoneyInput,
  ItemTable,
  TableDiv,
} from './styles';

export const FetchItems = () => {
  useEffect(() => getListOfItems(), []);

  const [items, setItems] = useState([]);
  const [money, setMoney] = useState(0);

  const { addToast } = useToasts();

  const getListOfItems = async () => {
    try {
      const response = await axios.get('/api/customer/items');

      setItems(response.data.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const purchaseHandler = async (itemId) => {
    try {
      // If input is zero show error
      if (!money) {
        addToast('Value cannot be zero', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
      const response = await axios.post(
        `/api/customer/items/${itemId}/purchases`,
        { money }
      );

      // console.log(response.status);

      getListOfItems();
    } catch (error) {
      console.error(error);
      addToast(`${error}`, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };
  return (
    <div>
      <TableDiv>
        <ItemTable>
          <thead>
            <tr>
              <th scope='col'>Item</th>
              <th scope='col'>Cost</th>
              {/* <th>Quantity</th> */}
            </tr>
          </thead>
          <tbody>
            {items.map((obj, key) => {
              return (
                <tr key={key}>
                  <td>
                    <ItemButton
                      onClick={() => purchaseHandler(obj.id)}
                    >{`${obj.description} (${obj.quantity})`}</ItemButton>
                  </td>

                  <td>${obj.cost}</td>
                  {/* <td>{obj.quantity}</td> */}
                </tr>
              );
            })}
          </tbody>
        </ItemTable>
        <MoneyInputDiv>
          <label>
            Insert Money:
            <MoneyInput
              type='number'
              onChange={(e) => setMoney(e.target.value)}
              autoFocus
              min='1'
              required
            />
          </label>
          Money: {money}
        </MoneyInputDiv>
      </TableDiv>
    </div>
  );
};
