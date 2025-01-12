import React from 'react';
import { UserPlus, FolderPlus, Building, ArrowRight } from 'lucide-react';

import { Button } from './Generic/Button';

export function QuickActions() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h3 className="text-2xl font-semibold text-gray-900 mb-8">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ActionCard
          icon={<UserPlus className="h-6 w-6" />}
          title="Add Employee"
          description="Register a new team member"
          color="bg-green-500"
        />
        <ActionCard
          icon={<FolderPlus className="h-6 w-6" />}
          title="New Project"
          description="Create a new project workspace"
          color="bg-blue-500"
        />
        <ActionCard
          icon={<Building className="h-6 w-6" />}
          title="Manage Office"
          description="Update office information"
          color="bg-purple-500"
        />
      </div>
    </div>
  );
}

function ActionCard({ 
  icon, 
  title, 
  description, 
  color 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
      <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}>
        {icon}
      </div>
      <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600 mb-4">{description}</p>
      <Button icon={ArrowRight}>
        Get Started
      </Button>
    </div>
  );
}