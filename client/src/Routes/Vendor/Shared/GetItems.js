import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TableDiv } from './styles';
import { ItemTable } from '../../Customer/styles';

export const GetItems = () => {
  const [item, setItem] = useState([]);

  useEffect(() => fetchItems(), []);
  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/customer/items');
      setItem(response.data.data.items);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <TableDiv>
      <ItemTable>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Item</th>
            <th>Cost</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {item.map((obj, key) => {
            return (
              <tr key={key}>
                <td>{obj.id}</td>
                <td>{obj.description}</td>
                <td>${obj.cost}</td>
                <td>{obj.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </ItemTable>
    </TableDiv>
  );
};
