import { useEffect, useState } from 'react';

import { getEmployeesCount } from '../../api/EmployeeApi.axios';
import { getProjectsCount } from '../../api/ProjectApi.axios';
import { getOfficesCount } from '../../api/OfficeApi.axios';
import { DisplayCards } from '../../components/DisplayCards';

export function IndexPage() {
  const [stats, setStats] = useState<Record<'employees' | 'projects' | 'offices', number>>();

  useEffect(() => {
    async function fetchData() {
      const [employees, projects, offices] = await Promise.all([
        getEmployeesCount(),
        getProjectsCount(),
        getOfficesCount()
      ]);
      setStats({
        employees: employees,
        projects: projects,
        offices: offices
      });
    }
    fetchData();
  }, []);

  return (<>
    <div className="relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Welcome to ITCorpo React
          </h2>
          <p className="mt-4 text-xl text-indigo-100">
            Streamline your workplace management with our comprehensive solution
          </p>
        </div>
        {stats && (
          <div className="mt-8 flex justify-center space-x-4">
            <StatCard title="Employees" value={stats.employees} />
            <StatCard title="Projects" value={stats.projects} />
            <StatCard title="Offices" value={stats.offices} />
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
    </div>
    <DisplayCards />
  </>);
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg px-8 py-4">
      <p className="text-indigo-100 text-sm font-medium">{title}</p>
      <p className="text-white text-2xl font-bold">{value}</p>
    </div>
  );
}