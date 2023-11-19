import React, { useState, useEffect } from "react";
import { useAuth } from "contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const handleEmailInputChange = (eventValue) => {
    setEmail(eventValue);
  };

  const handlePasswordInputChange = (eventValue) => {
    setPassword(eventValue);
  };

  //handle點擊登入按鈕時的event，在點擊登入的button時會去呼叫handleClick這個function，handleClick這個function會再去呼叫auth.js裡面的login非同步function
  const handleClick = async (event) => {
    event.preventDefault();
    //防止使用者沒有輸入email和password
    if (email.length === 0) {
      //登入失敗
      Swal.fire({
        position: "top",
        title: "請輸入email！",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
      return;
    }

    if (password.length === 0) {
      //登入失敗
      Swal.fire({
        position: "top",
        title: "請輸入密碼！",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
      return;
    }

    // 1-1.輸入檢查: 包括前端需要進行字串檢查，確保只包含 0-9、A-Z 及 a-z 的合法字元。(使用正規表示法)
    const isValidPassword = /^[0-9a-zA-Z]+$/.test(password);
    //  ^ 表示符合字串的開頭。
    // [0-9a-zA-Z] 代表符合任何數字（0-9）、小寫字母（a-z）或大寫字母（A-Z）的字元。這個表示式是一個字元集合，可以符合這個集合中的任何字元。
    // + 表示前面的字元集合至少出現一次，可以符合多個字元。
    // $ 表示符合字串的結尾。

    if (!isValidPassword) {
      //登入失敗
      Swal.fire({
        position: "top",
        title: "確保password只包含 0-9、A-Z 及 a-z 的合法字元",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
      return;
    }

    // 1-2.電子郵件格式檢查: 需要進行對 "XXXX@XXXX" 格式的驗證。

    //email驗證第一階段：是否有@和.
    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
      //登入失敗
      Swal.fire({
        position: "top",
        title: "請輸入有效email",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      }); //要包含@和.
    } else if (
      email.split("@")[0].length === 0 ||
      email.split("@")[1].split(".")[0].length === 0 ||
      email.split("@")[1].split(".")[1].length === 0
    ) {
      //登入失敗
      Swal.fire({
        position: "top",
        title: "請輸入有效email！",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
      //要包含email username, top level domain, second level domain
      return;
    } else if (!/^[0-9a-zA-Z]+$/.test(email.split("@")[0])) {
      //第三階段
      //驗證email username:確保只包含 0-9、A-Z 及 a-z 的合法字元。
      //登入失敗
      Swal.fire({
        position: "top",
        title: "確保email username只包含 0-9、A-Z 及 a-z 的合法字元",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
      return;
    } else if (!/^[0-9a-zA-Z]+$/.test(email.split("@")[1].split(".")[0])) {
      //第三階段
      //驗證email top level domain:確保只包含 0-9、A-Z 及 a-z 的合法字元。
      //登入失敗
      Swal.fire({
        position: "top",
        title: "確保email top level domain只包含 0-9、A-Z 及 a-z 的合法字元",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
      return;
    } else if (!/^[0-9a-zA-Z]+$/.test(email.split("@")[1].split(".")[1])) {
      //第三階段
      //驗證email second level domain:確保只包含 0-9、A-Z 及 a-z 的合法字元。
      //登入失敗
      Swal.fire({
        position: "top",
        title: "確保email second level domain只包含 0-9、A-Z 及 a-z 的合法字元",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
      return;
    }

    try {
      //用AuthContext裡面的非同步login函式，可以拿到success的布林值
      const success = await login({
        email,
        password,
      });

      //登入成功：從後端回傳回來的 success 是 true，用success的值去顯示我們的提示訊息
      if (success) {
        // 登入成功訊息
        Swal.fire({
          position: "top",
          title: "登入成功！",
          timer: 1000,
          icon: "success",
          showConfirmButton: false,
        });
        return;
      }

      console.log("fail");
      //登入失敗
      Swal.fire({
        position: "top",
        title: "登入失敗！",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
    } catch (err) {
      console.log("fail");
      console.error(err);

      //登入失敗
      Swal.fire({
        position: "top",
        title: "登入失敗！",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
    }
  };

  // 我只要去check每個頁面的isAuthenticated的true或是false，來做切換頁面的動作
  useEffect(() => {
    //  驗證有成功的話
    if (isAuthenticated) {
      // 頁面跳轉到todo頁面
      navigate("/admin");
    }
    //那如果isAuthenticated不為true的話就不做任何頁面套轉的動作
  }, [navigate, isAuthenticated]); //因為有用到navigate這個function和isAuthenticated，所以就把它放到useEffect的dependency上

  return (
    <div className="h-screen flex bg-gradient-to-r from-sky-950 to-blue-500">
      {/* left part */}
      <div
        className="hidden lg:flex w-full lg:w-1/2 login_img_section
          justify-around items-center"
      >
        <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
          <h1 className="text-white font-bold text-4xl font-sans">
            Simple App
          </h1>
          <p className="text-white mt-1">Practice Admin Page with Tailwind</p>
          <div className="flex justify-center lg:justify-start mt-6">
            <a
              href="#"
              className="hover:bg-sky-400 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-cyan-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>

      {/* right part */}
      <div className="flex w-full lg:w-1/2 justify-center items-center space-y-8 bg-gradient-to-r from-cyan-500 to-sky-500">
        <div className="w-full px-8 md:px-32 lg:px-24">
          <form className="bg-white rounded-md shadow-2xl p-5">
            <h1 className="text-gray-800 font-bold text-2xl text-center mb-6">
              Admin Login
            </h1>
            {/* Email address input */}
            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                id="email"
                className=" pl-2 w-full outline-none border-none"
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => handleEmailInputChange(e.target.value)}
              />
            </div>

            {/* Password input */}
            <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 w-full outline-none border-none"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => handlePasswordInputChange(e.target.value)}
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="block w-full bg-cyan-500 mt-5 py-2 rounded-2xl hover:bg-sky-400 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
              onClick={(e) => handleClick(e)}
            >
              Login
            </button>

            {/* Forget and sign up */}
            <div className="flex justify-between mt-4">
              <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
                Forgot Password ?
              </span>

              <a
                href="#"
                className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
              >
                Don't have an account yet?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
