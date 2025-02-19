import React from 'react';
import { Table } from '../components';
import type { Column } from '../components/Table';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
}

const DummyTable = () => {
  const users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'Active',
      lastActive: '2 mins ago'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      status: 'Inactive',
      lastActive: '1 hour ago'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'Editor',
      status: 'Active',
      lastActive: '5 mins ago'
    }
  ];

  const columns: Column<User>[] = [
    {
      header: 'Name',
      accessor: 'name',
      align: 'left',
      render: (value) => (
        <span className="font-medium text-gray-200">{value}</span>
      )
    },
    {
      header: 'Email',
      accessor: 'email',
      align: 'left',
      render: (value) => (
        <span className="text-gray-400">{value}</span>
      )
    },
    {
      header: 'Role',
      accessor: 'role',
      align: 'center',
      render: (value) => (
        <span className="text-blue-400 font-medium">{value}</span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      align: 'center',
      render: (value) => (
        <span className={`font-medium ${value === 'Active' ? 'text-green-400' : 'text-red-400'}`}>
          {value}
        </span>
      )
    },
    {
      header: 'Last Active',
      accessor: 'lastActive',
      align: 'right',
      render: (value) => (
        <span className="text-gray-400">{value}</span>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1b1e] p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-200 mb-6">Users List</h1>
        <Table
          data={users}
          columns={columns}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default DummyTable;