import React, { useEffect } from "react";
import Button from "components/Button";
import BackStage from "components/ BackStage";
import { useAuth } from "contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const { isAuthenticated, currentMember } = useAuth();
  const navigate = useNavigate();
  // 我只要去check每個頁面的isAuthenticated的true或是false，來做切換頁面的動作
  useEffect(() => {
    //  驗證沒有成功的話
    if (!isAuthenticated) {
      // 頁面跳轉到login頁面
      navigate("/admin_login");
    }
    //那如果isAuthenticated為true的話就不做任何頁面套轉的動作
  }, [navigate, isAuthenticated]); //因為有用到navigate這個function和isAuthenticated，所以就把它放到useEffect的dependency上

  return (
    <>
      {/* <div>AdminPage</div>
      <Button primary>Primary</Button>
      <Button warning>Warning</Button>
      <Bar /> */}
      <BackStage userName={currentMember} />
    </>
  );
};

export default AdminPage;
