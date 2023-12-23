import { Link, Outlet } from "react-router-dom"
import { createElement } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Tooltip,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

const DashboardLayout = () => {

  
  const data = [
    {
      label: "Dashboard",
      value: "dashboard",
      link: "/dashboard",
      icon: Square3Stack3DIcon,
      
    },
    {
      label: "Profile",
      value: "profile",
      link:"/dashboard/profile",
      icon: UserCircleIcon,
    
    },
    {
      label: "Contact Us",
      value: "ContactUs",
      link: "/contact-us",
      icon: Cog6ToothIcon,
    },
  ];

  return (
    <>
    <Tabs value="dashboard" orientation="vertical" className="gap-10" > 
      <TabsHeader className="max-w-fit fixed z-50">
        {data.map(({ label, value, link, icon }) => (
          <Link key={label} to={`${link}`}>
            <Tab  value={value} className="place-items-start justify-start">
            <div className="flex items-center gap-2">
              <Tooltip content={label}>
              {createElement(icon, { className: "w-5 h-5" })}
              </Tooltip>
              <span className="lg-max:hidden flex">{label}</span>
            </div>
          </Tab>
          </Link>
        ))}
      </TabsHeader>
      <TabsBody className="px-6 lg:px-12">
      <Outlet></Outlet>
      </TabsBody>
    </Tabs>
    
    </>
  )
}

export default DashboardLayout