import React, { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export const Item = ({ title }) => {
  const [item, setItem] = useState([]);
  const [money, setMoney] = useState(0);

  useEffect(() => fetchItems(), []);

  const history = useHistory();

  const handleHomeButtonClick = () => history.push('/vendor');

  const fetchItems = () => {
    axios
      .get('http://localhost:8080/api/customer/items')
      .then((res) => {
        console.table(res.data.data.items);
        setItem(res.data.data.items);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const inputHandler = (e) => {
    // console.log(e.target.value);
    setMoney(e.target.value);
  };

  const itemHandler = (itemId) => {
    console.log('clicked!', itemId);
    axios
      .post(`http://localhost:8080/api/customer/items/${itemId}/purchases`, {
        money,
      })
      .then((res) => {
        console.log(res.data.status);

        fetchItems();
      })
      .catch((error) => console.log(error));
  };

  {
    /* {item.map((obj, key) => (
        <div key={key}> */
  }
  {
    /* <pre>{JSON.stringify(obj, null, 2)}</pre>  */
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Cost</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {item.map((obj, key) => {
            return (
              <tr key={key}>
                <td>
                  <button
                    onClick={() => itemHandler(obj.id)}
                  >{`${obj.description}`}</button>
                </td>
                <td>{obj.cost}</td>
                <td>{obj.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <input
        onChange={(e) => inputHandler(e)}
        placeholder='0.00'
        type='number'
        min='0'
        autoFocus
      ></input>
      <br></br>
      <h1>{title}</h1>
      <button onClick={() => handleHomeButtonClick()}>Vendor</button>
    </div>
  );
};

{
  /* // <button
          //   onClick={() => itemHandler(obj.id)}
          // >{`${obj.description}: $${obj.cost} : ${obj.quantity}`}</button> */
}
