import { SlUser, SlBag, SlMagnifier } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="h-20 flex justify-between items-center px-10 border-b-[1px] border-gray-300 flex-shrink-0">
      <div className="flex gap-7 uppercase">
        <h1>Nam giới</h1>
        <h1>Nữ giới</h1>
        <h1>Về chúng tôi</h1>
      </div>

      <div className="text-xl">DMC-Corp</div>

      <div className="flex gap-7 uppercase">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          <h1>Đăng nhập</h1>
          <SlUser />
        </div>

        <div className="flex gap-2 items-center cursor-pointer">
          <h1>Giỏ hàng</h1>
          <SlBag />
        </div>

        <div className="flex gap-2 items-center cursor-pointer">
          <h1>Tìm kiếm </h1>
          <SlMagnifier />
        </div>
      </div>
    </div>
  );
}
