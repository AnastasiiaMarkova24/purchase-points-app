import { firstNames, lastNames } from './purchase.mockData';
import { randomDate } from './purchaseUtils';

export function fetchPurchaseHistoryData(amount = 10) {
  return new Promise(resolve =>
    setTimeout(
      () =>
        resolve(
          Array.from({ length: amount }, () => ({
            customer: {
              firstName: firstNames[Math.floor(Math.random() * (firstNames.length - 1))],
              lastName: lastNames[Math.floor(Math.random() * (lastNames.length - 1))],
            },
            purchases: Array.from({ length: 10 }, () => ({
              amount: Math.floor(Math.random() * 300),
              date: randomDate(),
            })),
          })),
        ),
      500,
    ),
  );
}
