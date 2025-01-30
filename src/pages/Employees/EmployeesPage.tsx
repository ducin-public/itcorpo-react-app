import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Users, UserPlus, UserMinus, Eye, UserX, UserCog, UserSearch } from 'lucide-react';

import { RecentlyViewedEmployees } from './RecentlyViewedEmployees';
import { Sidebar } from '../../components/Generic/Sidebar';
import { TabMenu } from '../../components/Generic/TabMenu';
import { H2 } from '../../components/Typography/Headings';

export function EmployeesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  return (
    <div>
      <TabMenu
        items={[
          {
            label: 'Active',
            icon: Users,
            link: '/employees/active',
          },
          {
            label: 'Departing',
            icon: UserMinus,
            link: '/employees/departing',
          },
          {
            label: 'Involved',
            icon: UserCog,
            link: '/employees/involved',
          },
          {
            label: 'Jobless',
            icon: UserX,
            link: '/employees/jobless',
          },
          {
            label: 'New Hires',
            icon: UserPlus,
            link: '/employees/new-hires',
          },
          {
            label: 'Past',
            icon: UserSearch,
            link: '/employees/past',
          },
          {
            label: 'Recently Viewed',
            icon: Eye,
            onClick: () => {
              setSidebarIsOpen(open => !open);
            }
          },
        ]}
        selectedValue={location.pathname}
        onNavigate={navigate}
      />
      <Outlet />

      <Sidebar
        title={<H2 className='m-0'>Recently Viewed Employees</H2>}
        isOpen={sidebarIsOpen}
        setIsOpen={setSidebarIsOpen}
      >
        <RecentlyViewedEmployees />
      </Sidebar>
    </div>
  );
}
