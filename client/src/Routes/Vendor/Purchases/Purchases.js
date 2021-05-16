import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ItemTable, TableDiv } from './styles';
import { VendorNavbar } from '../Shared/VendorNavBar';
export const Purchases = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [totalMoney, setTotalMoney] = useState();
  useEffect(() => getPurchases(), []);
  useEffect(() => getTotalMoney(), []);

  const getPurchases = async () => {
    const response = await axios.get(
      'http://localhost:8080/api/vendor/purchases'
    );
    const { data } = response.data;
    setPurchaseHistory(data);
  };

  const getTotalMoney = async () => {
    const response = await axios.get('http://localhost:8080/api/vendor/money');
    const { total_money } = response.data.data.items;
    setTotalMoney(total_money);
  };

  return (
    <div>
      <h1>Purchase History</h1>
      <TableDiv>
        <div>
          <VendorNavbar />
          <h3>Total Money: ${totalMoney}</h3>
        </div>
        <ItemTable>
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
        </ItemTable>
      </TableDiv>
    </div>
  );
};
