import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { FetchItems } from './FetchItems';
import {
  Header1,
  Header2,
  HeaderWrapper,
  VendingMachineWrapper,
} from './styles';

export const VendingMachinePage = () => {
  return (
    <VendingMachineWrapper>
      <ToastProvider>
        <HeaderWrapper>
          <Header1>Vending Machine</Header1>
          <Header2>Please select a item</Header2>
        </HeaderWrapper>
        <FetchItems />
      </ToastProvider>
    </VendingMachineWrapper>
  );
};
