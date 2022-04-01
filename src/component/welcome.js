import { Button, Image } from "antd";

const Welcome = () => {
  return (
    <div className="welcome">
      <div className="logo">
        <Image
          width={200}
          src="https://upload.wikimedia.org/wikipedia/en/6/68/Wuhan_University_Logo.png"
        />
      </div>
      <div className="text_area">
        <h1 className="wel_header">歡迎來到武漢大學計算機課程推薦系統</h1>
        <p>您還沒有登錄</p>
        <a href="/login" className="wel_login">
          <Button>登錄</Button>
        </a>
        <a href="/register" className="wel_reg">
          <Button>注冊</Button>
        </a>
      </div>
    </div>
  );
};

export default Welcome;
