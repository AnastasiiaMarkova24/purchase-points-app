import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPurchaseHistory, selectIsLoading, filterData, selectFilteredData } from './purchaseSlice';
import { sortByName, formatDates } from './purchaseUtils';
import {
  PurchaseWrapper,
  PurchaseList,
  PurchaseTitle,
  PurchaseLoading,
  PurchaseLoadingWrapper,
  PurchaseTabs,
  PurchaseTab,
} from './purchaseStyled';
import { TOTAL } from './purchaseConstants';

const tabs = [TOTAL, moment(), moment().add(-1, 'month'), moment().add(-2, 'month'), moment().add(-3, 'month')];

const Purchase = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const isLoading = useSelector(selectIsLoading);
  const filteredData = useSelector(selectFilteredData);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchPurchaseHistory(10));
    }
    fetchData();
  }, []);
  useEffect(() => {
    dispatch(filterData(selectedTab));
  }, [selectedTab]);

  return (
    <PurchaseWrapper>
      {isLoading && (
        <PurchaseLoadingWrapper>
          <PurchaseLoading />
        </PurchaseLoadingWrapper>
      )}
      <PurchaseTitle>Top Our Customers</PurchaseTitle>
      <PurchaseTabs>
        {tabs.map(tab => (
          <PurchaseTab
            key={`tab_${tab}`}
            $selected={
              tab === TOTAL ? tab === selectedTab : moment(tab).format('MM') === moment(selectedTab).format('MM')
            }
            onClick={() => setSelectedTab(tab === TOTAL ? tab : moment(tab).toISOString())}
          >
            {tab === TOTAL ? tab : moment(tab).format('MMMM')}
          </PurchaseTab>
        ))}
      </PurchaseTabs>
      <PurchaseList>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Dates</th>
            <th>Amount</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {[...filteredData]
            .filter(x => x.totalAmount > 0)
            .sort(
              (
                { customer: { firstName: aFName, lastName: aLName } },
                { customer: { firstName: bFName, lastName: bLName } },
              ) => sortByName(aLName, bLName) || sortByName(aFName, bFName),
            )
            .sort((a, b) => b.totalPoints - a.totalPoints)
            .map(({ customer: { firstName, lastName }, totalAmount, totalPoints, dates }, pIdx) => (
              <tr key={`purchase_item_${pIdx}_${firstName}_${lastName}_${totalPoints}`}>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{formatDates(dates)}</td>
                <td>{totalAmount} $</td>
                <td>{totalPoints}</td>
              </tr>
            ))}
        </tbody>
      </PurchaseList>
    </PurchaseWrapper>
  );
};

export default Purchase;
