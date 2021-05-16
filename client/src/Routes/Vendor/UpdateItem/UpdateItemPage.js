import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { GetItems } from '../Shared/GetItems';
import { VendorNavbar } from '../Shared/VendorNavBar';
import { UpdateItem } from './UpdateItem';

export const UpdateItemPage = () => {
  return (
    <div>
      <ToastProvider>
        <VendorNavbar />
        <UpdateItem />
        <GetItems />
      </ToastProvider>
    </div>
  );
};
