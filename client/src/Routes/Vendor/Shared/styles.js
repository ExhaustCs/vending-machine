import styled from 'styled-components';

const VendorNav = styled.div`
  background-color: #333;
  overflow: hidden;
`;
const VendorLink = styled.a`
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  &:hover {
    background-color: #ddd;
    color: black;
  }
`;

const TableDiv = styled.div`
  display: grid;
`;

// const ActiveLink = styled(VendorLink)`
//   background-color: #04aa6d;
//   color: white;
// `;

export { VendorNav, VendorLink, TableDiv };
