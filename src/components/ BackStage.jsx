import React from "react";
import Bar from "components/Bar";
import Table from "components/Table";
import { IoIosArrowDown } from "react-icons/io";

function BackStage() {
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
          <div className="w-64 p-6 bg-gray-100 overflow-y-auto">
            <nav>
              <div className="mt-8">
                <h2 className="font-semibold text-gray-600 uppercase tracking-wide">
                  Customers
                </h2>
                <div className="mt-3">
                  <a
                    href=""
                    className="-mx-3  py-1 px-3 text-sm font-medium flex items-center justify-between hover:bg-gray-200 rounded-lg"
                  >
                    <span className=" text-gray-900">Invoices</span>
                  </a>
                </div>
              </div>
              <div className="mt-8">
                <h2 className="font-semibold text-gray-600 uppercase tracking-wide">
                  Revenue
                </h2>
                <div className="mt-3">
                  <a
                    href=""
                    className="-mx-3  py-1 px-3 text-sm font-medium flex items-center justify-between hover:bg-gray-200 rounded-lg"
                  >
                    <span className=" text-gray-900">2021 Monthly Revenue</span>
                  </a>
                </div>
                <div className="mt-3">
                  <a
                    href=""
                    className="-mx-3  py-1 px-3 text-sm font-medium flex items-center justify-between hover:bg-gray-200 rounded-lg"
                  >
                    <span className=" text-gray-900">2022 Monthly Revenue</span>
                  </a>
                </div>
                <div className="mt-3">
                  <a
                    href=""
                    className="-mx-3  py-1 px-3 text-sm font-medium flex items-center justify-between hover:bg-gray-200 rounded-lg"
                  >
                    <span className=" text-gray-900">2023 Monthly Revenue</span>
                  </a>
                </div>
              </div>
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

              <div className="pt-4 ml-2 mr-2 rounded-lg">
                <div className="px-4 py-2">
                  <Bar />
                </div>
              </div>

              <div className="pt-4 ml-2 mr-2 rounded-lg">
                <div className="px-4 py-2">
                  <Table />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default BackStage;
