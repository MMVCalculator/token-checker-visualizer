import React from 'react';
import ItemTable from '../components/ItemTable';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Item Inventory</h1>
        <ItemTable />
      </div>
    </div>
  );
};

export default Index;