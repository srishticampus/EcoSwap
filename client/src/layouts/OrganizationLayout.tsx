import React from 'react';
import { Outlet } from 'react-router-dom';
import OrganizationSidebar from '../components/organization/OrganizationSidebar';

export default function OrganizationLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <OrganizationSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}