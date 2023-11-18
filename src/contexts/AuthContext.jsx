import { createContext, useContext, useState, useEffect } from "react";
import { login, checkPermission } from "api/auth";
import jwt_decode from "jwt-decode";
import { useLocation } from "react-router-dom";

const defaultAuthContext = {
  isAuthenticated: false, // 使用者是否登入的判斷依據，預設為 false，若取得後端的有效憑證，則切換為 true
  currentMember: null, // 當前使用者相關資料，預設為 null，成功登入後就會有使用者資料
  register: null, // 註冊方法
  login: null, // 登入方法
  logout: null, // 登入方法
};

// 帳號：admin2@gmail.com
// email:admin2@gmail.com
// password:admin2

// 就不用每一頁都寫useContext
export const useAuth = () => useContext(AuthContext);

const AuthContext = createContext(defaultAuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);

  // 用react-router-dom裡面useLocation的Hook取得當前頁面是否有切換的資訊，用useLocation去取得pathname的props，我們可以透過pathname的值來去了解當前頁面的變化
  const { pathname } = useLocation();

  // 要把驗證每一頁的token是否為有效的function，放進AuthContext
  useEffect(() => {
    const checkTokenIsValid = async () => {
      // 去localStorage取 authToken
      const authToken = localStorage.getItem("authToken");
      // 如果authToken不存在的話（比如說登出的時後）代表它就是一個為驗證未登入的狀態
      if (!authToken) {
        // 如果authToken不存在，要把isAuthenticated改成false
        setIsAuthenticated(false);
        //同時也不會有payload
        setPayload(null);
        return; //如果authToken不存在，我有不用再去做checkPermission的動作了
      }
      // 當我們的authToken是存在的話(使用者有登入或是註冊的時候)，就把authToken給checkPermission檢查，他會回傳是否是有效的登入或註冊(會回傳response.data.success，那這邊success裡面可能是true或false，這個boolean會被放到result裡面)
      const result = await checkPermission(authToken);

      if (result) {
        //如果這個authToken是有效的話(result為true)，代表我們的身份是有經過驗證的
        setIsAuthenticated(true);
        // 那我們也把這個有效的authToken去做解析拿出payload存到tempPayload變數裡
        const tempPayload = jwt_decode(authToken);
        //把現在的payload內容更新為tempPayload
        setPayload(tempPayload);
      } else {
        //如果驗證出來的結果為無效
        setIsAuthenticated(false);
        setPayload(null);
      }
    };
    //當就執行checkTokenIsValid
    checkTokenIsValid();
  }, [pathname]); //當pathname有改變的話，我就去執行useEffect，去checkPermission

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload && {
          id: payload.sub,
          name: payload.name,
        }, //因為payload也可能會是null的狀態，所以我們要用&&去處理不是null的狀態，如果payload有存在，我們要去取得payload裡面的sub和name，可以看https://jwt.io/#debugger，可以看到我們解析authtoken裡面的payload有sub,name,iat，這樣如果有登入成功或是註冊成功的話，我們前端就會存到currentMember的相關資訊
        login: async (data) => {
          //用解構去把success和authToken的值從return回來的data中取出來
          const { success, authToken } = await login({
            username: data.username,
            password: data.password,
          });
          //下面這裡跟register解析payload的方式是一樣的，只有上面呼叫的是login()
          const tempPayload = jwt_decode(authToken);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem("authToken", authToken);
          } else {
            setPayload(null);
            setIsAuthenticated(false); //登入有成功的話都會回傳authToken，所以可以在這裡判斷，tempPayload沒有存在的話，就代表驗證沒成功
          }
          //最後要記得回傳success是true還false的結果，Context provider裡的value.login就有true false
          return success;
        },
        logout: () => {
          //要把localStorage裡的authToken去移除
          localStorage.removeItem("authToken");
          //然後把前端內部的資料做更新
          setPayload(null);
          setIsAuthenticated(false);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
