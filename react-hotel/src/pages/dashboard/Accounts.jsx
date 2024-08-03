import axios from "axios";
import { useEffect, useState } from "react";

export default function Accounts() {
    const [accounts, setAccounts] = useState([]);
    const fetchAccount = async () => [
        await axios
            .get("http://127.0.0.1:8000/api/getAccount")
            .then((response) => setAccounts(response.data))
            .catch((error) => console.error(error)),
    ];

    const handleDeleteAccount = async (id) => {
        await axios
            .delete(`http://127.0.0.1:8000/api/deleteAccount/${id}`)
            .then(() => {
                alert("Xóa tài khoản thành công!");
                fetchAccount();
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        fetchAccount();
    }, []);

    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-2xl uppercase font-bold text-center mt-4">
                Quản lý tài khoản
            </h1>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên tài khoản</th>
                            <th>Tên người dùng</th>
                            <th>Quyền hạn</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.id}</td>
                                <td>{item?.email}</td>
                                <td>{item?.fullname}</td>
                                <td>{item?.role}</td>
                                <td className="flex gap-2">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() =>
                                            handleDeleteAccount(item?.id)
                                        }
                                    >
                                        Xoá tài khoản
                                    </button>
                                    <button className="btn btn-accent">
                                        Cập nhật mật khẩu
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
