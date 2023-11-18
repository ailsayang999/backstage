import React, { useState } from "react";
import Bar from "components/Bar";
import Table from "components/Table";
import { IoIosArrowDown } from "react-icons/io";
import { RevenueArray } from "data/content";
import { InvoiceArray } from "data/content";
import { useAuth } from "contexts/AuthContext";

const NavFilterList = ({
  CategoryFilterArray,
  handleChangeCategoryContent,
}) => {
  return (
    <div>
      {CategoryFilterArray.map(({ mainCategory, subCategory }, index) => {
        return (
          <div className="mt-8" key={index}>
            <h2 className="font-semibold text-sky-400 uppercase tracking-wide">
              {mainCategory}
            </h2>
            {subCategory.map((item, index) => {
              return (
                <div className="mt-3" key={index}>
                  <button
                    value={item}
                    className="-mx-3  py-1 px-3 text-sm font-medium flex items-center justify-between hover:bg-sky-50 rounded-lg"
                    onClick={(e) => {
                      handleChangeCategoryContent(e);
                    }}
                  >
                    <span className="text-sky-100 hover:text-cyan-950">
                      {item}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

function BackStage() {
  const [showSubCategory, setShowSubCategory] = useState("Invoices");
  const { logout } = useAuth();

  // 左側刪選器元件 商品種類分類
  const CategoryFilterArray = [
    {
      id: 1,
      mainCategory: "customers",
      subCategory: ["Invoices"],
    },
    {
      id: 2,
      mainCategory: "revenue",
      subCategory: ["2021 Monthly Revenue"],
    },
  ];

  console.log("showSubCategory", showSubCategory);

  //左側點擊事件
  const handleChangeCategoryContent = (event) => {
    const value = event.currentTarget.value; //要把event.target.value變成event.currentTarget.value
    setShowSubCategory(value);
  };

  //登出
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="h-screen flex flex-col">
        {/* header */}
        <header className="flex flex-shrink-0">
          {/* Admin setting and logout */}
          <div className="flex-shrink-0 px-4 py-3 bg-gray-800 w-64">
            <button className="flex items-center block w-full">
              <img
                className="h-8 w-8 rounded-full object-cover"
                src="https://picsum.photos/200"
                alt=""
              />
              <span className="ml-4 text-sm font-medium text-white">Admin</span>
              <IoIosArrowDown className="ml-auto h-5 w-5 ml-10 text-gray-400" />
            </button>
          </div>
          {/* header navigation link */}
          <div className="flex-1 flex bg-gray-700 px-6 items-center justify-between">
            <nav>
              <a
                href="#"
                className="hover:bg-gray-600 rounded-lg  bg-gray-800 inline-block text-sm font-medium text-white px-3 py-2 leading-none"
              >
                Customers
              </a>
              <a
                href="#"
                className="hover:bg-gray-600 rounded-lg inline-block text-sm font-medium text-white px-3 py-2 leading-none"
              >
                Reporting
              </a>
              <a
                href="#"
                className="hover:bg-gray-600 rounded-lg inline-block text-sm font-medium text-white px-3 py-2 leading-none"
              >
                Manage
              </a>
            </nav>
            <div className="flex items-center">
              <span className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center">
                  <i
                    className="fa fa-search h-5 w-5 px-2"
                    aria-hidden="true"
                  ></i>
                </span>
                <input
                  className="focus:bg-white focus:text-gray-900 focus:placeholder-gray-700 pl-10 pr-4 py-2 leading-none block w-full bg-gray-900 rounded-lg text-sm placeholder-gray-400 text-white"
                  placeholder="Search"
                />
              </span>
              <button className="ml-6 text-gray-400 hover:text-gray-200">
                <i
                  className="fa fa-bell-o h-5 w-5 fill-current"
                  aria-hidden="true"
                ></i>
              </button>
              <button className="ml-6 text-gray-400 hover:text-gray-200">
                <i
                  className="fa fa-question-circle-o h-5 w-5 fill-current"
                  aria-hidden="true"
                ></i>
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-x-hidden">
          {/* left nav bar */}
          <div className="w-80 p-6 bg-sky-950 overflow-y-auto">
            <nav className="flex flex-col h-full justify-between ">
              <NavFilterList
                CategoryFilterArray={CategoryFilterArray}
                handleChangeCategoryContent={handleChangeCategoryContent}
              />

              <button
                className="py-1 px-3 text-sm font-medium flex-col flex items-center justify-between hover:bg-sky-50 rounded-lg"
                onClick={handleLogout}
              >
                <span className="text-sky-400 hover:text-cyan-950">Logout</span>
              </button>
            </nav>
          </div>

          {/* main */}
          <main className="flex bg-gray-200 w-full">
            <div className="flex flex-col py-3 w-full inline-block overflow-y-auto overflow-hidden bg-gray-100">
              {/* <div className="shadow-lg pt-4 ml-2 mr-2 rounded-lg">
                <div className="px-4 py-2 w-full text-sm font-semibold text-gray-700">
                  <Bar/>
                </div>
              </div> */}
              {RevenueArray?.filter((i) => i.subCategory === showSubCategory)
                .length > 0 && (
                <div className="pt-4 ml-2 mr-2 rounded-lg">
                  <div className="px-4 py-2">
                    <Bar
                      RevenueSubCategoryObject={
                        RevenueArray?.filter(
                          (i) => i.subCategory === showSubCategory
                        )[0]
                      }
                    />
                  </div>
                </div>
              )}

              {InvoiceArray?.filter((i) => i.subCategory === showSubCategory)
                .length > 0 && (
                <div className="pt-4 ml-2 mr-2 rounded-lg">
                  <div className="px-4 py-2">
                    <Table
                      InvoiceSubCategoryObject={
                        InvoiceArray?.filter(
                          (i) => i.subCategory === showSubCategory
                        )[0]
                      }
                    />
                  </div>
                </div>
              )}

              {/* <div className="pt-4 ml-2 mr-2 rounded-lg">
                <div className="px-4 py-2">
                  <Table />
                </div>
              </div> */}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default BackStage;
