import styled from 'styled-components';

const ItemTable = styled.table`
  td {
    border: 1px solid #999;
    padding: 0.5rem;
  }
`;

const TableDiv = styled.div`
  display: grid;
  grid-template-rows: auto auto;
`;

export { ItemTable, TableDiv };
