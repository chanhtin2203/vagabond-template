/* eslint-disable jsx-a11y/anchor-is-valid */
import { LoginOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const handleLogout = () => {};

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <div onClick={handleLogout}>Đăng xuất</div>,
          icon: <LoginOutlined />,
        },
        {
          key: "2",
          label: <div onClick={() => navigate("/users")}>Đổi mật khẩu</div>,
          icon: <SettingOutlined />,
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
            Nguyễn chánh tín
          </span>
        </a>
      </Dropdown>
    </>
  );
};

export default Profile;
