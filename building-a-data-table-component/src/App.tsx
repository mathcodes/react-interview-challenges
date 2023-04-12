import React from 'react';
import DataTable from './components/DataTable'; // Import the DataTable component

const data = [ // Create some dummy data as 3 objects in an array.
  {
    key: 1,
    id: 1,
    name: 'John Doe',
    email: 'johndoe@com.com',
  },
  {
    key: 2,
    id: 2,
    name: 'Jane Doe',
    email: 'janedoe@com.com',
  },
  {
    key: 3,
    id: 3,
    name: 'John Smith',
    email: 'johnsmith@com.com',
  },
];

export const App = () => (
  <div>
    <DataTable data={data} />
  </div>
);
