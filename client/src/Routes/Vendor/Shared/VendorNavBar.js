import React from 'react';
import { useHistory } from 'react-router';
import { VendorLink, VendorNav } from './styles';

export const VendorNavbar = () => {
  const history = useHistory();
  const handleCustomerButton = () => history.push('/');
  const handleUpdateButton = () => history.push('/vendor/update');
  const handleAddButton = () => history.push('/vendor/add');
  const handlePurchasesButton = () => history.push('/vendor');

  return (
    <VendorNav>
      <VendorLink onClick={() => handleAddButton()}>Add</VendorLink>
      <VendorLink onClick={() => handleUpdateButton()}>Update</VendorLink>
      <VendorLink onClick={() => handleCustomerButton()}>Customer</VendorLink>
      <VendorLink onClick={() => handlePurchasesButton()}>Purchases</VendorLink>
    </VendorNav>
  );
};
