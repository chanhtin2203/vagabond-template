/* eslint-disable jsx-a11y/anchor-is-valid */
import { LoginOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess, logoutUser } from "../../../../redux/slice/authSlice";
import { createAxios } from "../../../../Utils/createInstance";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.login);
  let axiosJWT = createAxios(authUser, dispatch, loginSuccess);
  const handleLogout = async () => {
    navigate("/");
    await dispatch(
      logoutUser({
        accessToken: authUser?.accessToken,
        axiosJWT,
      })
    );
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <div onClick={handleLogout}>Đăng xuất</div>,
          icon: <LoginOutlined />,
        },
      ]}
    />
  );

  return (
    <>
      <Dropdown overlay={menu} placement="bottomRight" arrow>
        <a onClick={(e) => e.preventDefault()}>
          <Avatar
            src={
              <img
                alt="img"
                src="https://joeschmoe.io/api/v1/joe"
                style={{
                  width: 32,
                }}
              />
            }
          />
          <span style={{ paddingLeft: "5px", color: "#000" }}>
            {authUser.fullname}
          </span>
        </a>
      </Dropdown>
    </>
  );
};

export default Profile;
