import styled from 'styled-components';

export const PurchaseWrapper = styled.div`
  background-color: #252c29;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const PurchaseList = styled.table`
  max-width: 1000px;
  margin: 10px auto;
  border: solid 1px #39c9a2;
  border-collapse: collapse;
  width: 100%;

  th {
    color: white;
  }

  td {
    color: #69dbb6;
  }

  th,
  td {
    border: solid 1px #39c9a2;
    border-collapse: collapse;
    padding: 8px 18px;
  }
`;

export const PurchaseTitle = styled.h1`
  text-align: center;
  text-transform: uppercase;
  color: #39c9a2;
`;

export const PurchaseLoadingWrapper = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  top: 40%;
  left: 0;
  justify-content: center;
`;

export const PurchaseLoading = styled.div`
  border: 12px solid #ebf5f2;
  border-radius: 50%;
  border-top: 12px solid #55c9a3;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
`;

export const PurchaseTabs = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
`;

export const PurchaseTab = styled.button`
  background: ${props => (props.$selected ? '#55c9a3' : '#8fbbad')};
  cursor: pointer;
  border-bottom: none;
  padding: 14px 24px;
  margin: 4px 8px 4px 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: none;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 16px;
`;
