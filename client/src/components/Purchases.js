import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
export const Purchases = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [totalMoney, setTotalMoney] = useState();
  useEffect(() => getPurchases(), []);
  useEffect(() => getTotalMoney(), []);
  const history = useHistory();
  const getPurchases = async () => {
    const response = await axios.get(
      'http://localhost:8080/api/vendor/purchases'
    );

    const { data } = response.data;
    setPurchaseHistory(data);
  };

  const handleCustomerButton = () => history.push('/');

  const getTotalMoney = async () => {
    const response = await axios.get('http://localhost:8080/api/vendor/money');
    const { total_money } = response.data.data.items;
    setTotalMoney(total_money);
  };

  return (
    <div>
      <h1>Purchase History</h1>
      <div className='history'>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {purchaseHistory.map((obj, key) => {
              return (
                <tr key={key}>
                  <td>{obj.description}</td>
                  <td>{obj.posting_date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <br></br>
      </div>
      <button onClick={() => handleCustomerButton()}>Customer</button>
      <h3>Total Money {totalMoney}</h3>
    </div>
  );
};
