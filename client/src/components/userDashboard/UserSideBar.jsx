import React from "react";
import { TbChartTreemap } from "react-icons/tb";
import { ImProfile } from "react-icons/im";
import { TiShoppingCart } from "react-icons/ti";
import { TbTransactionRupee } from "react-icons/tb";
import { RiCustomerService2Fill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";

const UserSideBar = ({ active, setActive, isCollapsed, setIsCollapsed }) => {
  const menuItems = [
    { key: "overview", title: "OverView", icon: <TbChartTreemap /> },
    { key: "profile", title: "Profile", icon: <ImProfile /> },
    { key: "orders", title: "Orders", icon: <TiShoppingCart /> },
    {
      key: "transactions",
      title: "Transactions",
      icon: <TbTransactionRupee />,
    },
    { key: "helpdesk", title: "Help Desk", icon: <RiCustomerService2Fill /> },
  ];

  return (
    <>
      <div className="p-2">
        <div className="h-10 text-xl font-bold flex gap-5 items-center mb-3">
          <button
            className="ms-2 hover:scale-105"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <GiHamburgerMenu />
          </button>{" "}
          {!isCollapsed && (
            <span className="overflow-hidden text-nowrap">User Dashboard</span>
          )}
        </div>
        <hr />

        <div className="py-6 space-y-5 w-full">
          {menuItems.map((item, idx) => (
            <button
              className={`flex gap-3 items-center text-lg ps-2 rounded-xl h-10 w-full text-nowrap overflow-hidden duration-300
                ${
                  active === item.key
                    ? "bg-(--color-secondary) text-white"
                    : "hover:bg-gray-100/70 "
                } 
              `}
              onClick={() => setActive(item.key)}
              key={idx}
            >
              {" "}
              {item.icon}
              {!isCollapsed && item.title}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserSideBar;