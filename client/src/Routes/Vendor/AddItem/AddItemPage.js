import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { VendorNavbar } from '../Shared/VendorNavBar';
import { AddItem } from './AddItem';

export const AddItemPage = () => {
  return (
    <div>
      <ToastProvider>
        <VendorNavbar />
        <AddItem />
      </ToastProvider>
    </div>
  );
};
