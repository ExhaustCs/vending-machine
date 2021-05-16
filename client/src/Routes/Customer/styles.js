import styled from 'styled-components';

const Header1 = styled.h1`
  color: #ffab9c;
  background-color: #ffeae6;
  /* position: relative; */
  height: 41px;
  width: 291px;
  /* left: 50px; */
  margin-bottom: 69px;
`;

const Header2 = styled.h3`
  color: #ff9585;
  font-weight: bold;
  justify-self: center;
`;

const HeaderWrapper = styled.div`
  display: grid;
  justify-self: center;
`;

const VendingMachineWrapper = styled.div`
  display: grid;
`;

const ItemButton = styled.button`
  font-weight: 900;
  color: #ffb4a7;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid #ff9585;
  border-radius: 3px;

  &:hover {
    background: rgba(100, 0, 0, 0.03);
    background-color: #fff0ed;
    cursor: pointer;
  }
`;

const ItemTable = styled.table`
  td {
    border: 1px solid #999;
    padding: 0.5rem;
    width: 100px;
    color: #ffc0b4;
  }
  th {
    color: #ffc3b8;
    background-color: #232323;
  }

  margin: 2.5rem;
`;

const TableDiv = styled.div`
  display: grid;
  grid-template-rows: 1fr 300px;
`;

const MoneyInputDiv = styled.div`
  justify-self: center;
`;

const MoneyInput = styled.input`
  margin: 0 10px;
`;

export {
  HeaderWrapper,
  Header1,
  Header2,
  VendingMachineWrapper,
  ItemButton,
  MoneyInputDiv,
  MoneyInput,
  ItemTable,
  TableDiv,
};
