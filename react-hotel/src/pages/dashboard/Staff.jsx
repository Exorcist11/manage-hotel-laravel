import { ClearForm } from "@/middleware/ClearForm";
import axios from "axios";
import { useState, useEffect } from "react";
import { MdDelete, MdCreate, MdOutlineDrafts } from "react-icons/md";
import { toast } from "sonner";

export default function Staff() {
    const [staffs, setStaffs] = useState([]);
    const [isApiSuccess, setIsApiSuccess] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [form, setForm] = useState({
        fullname: "",
        phone_number: "",
        address: "",
        birth: "",
        gender: "male",
        role: "0",
        id: "",
        email: "",
        password: "",
    });

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((preState) => ({
            ...preState,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        if (
            !form.fullname ||
            !form.phone_number ||
            !form.address ||
            !form.birth ||
            !form.email ||
            !form.password
        ) {
            toast.error("Vui lòng nhập đầy đủ thông tin nhân viên.");
            return;
        }

        try {
            await axios.post("http://127.0.0.1:8000/api/staff", form);
            toast.success("Thêm mới nhân viên thành công!");
            ClearForm();

            setForm({
                fullname: "",
                phone_number: "",
                address: "",
                birth: "",
                gender: "male",
                role: "0",
                id: "",
                email: "",
                password: "",
            });

            fetchRooms();
        } catch (e) {
            console.error(e);
            toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
        }
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete?");
        if (confirm) {
            await axios
                .delete(`http://127.0.0.1:8000/api/staff/${id}`)
                .then(() => toast.success("Xóa nhân viên thành công!"))
                .catch(() => toast.error("Lỗi khi xóa"));
            fetchRooms();
        }
    };

    const handleGetUser = async (id) => {
        document.getElementById("modal_get_user").showModal();
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/staff/${id}`
            );
            const userData = response.data.user;
            setForm({
                id: userData.id,
                email: userData.email,
                role: userData.role,
                fullname: userData.profiles.fullname,
                birth: userData.profiles.birth,
                gender: userData.profiles.gender,
                phone_number: userData.profiles.phone_number,
                address: userData.profiles.address,
            });
            setIsApiSuccess(true);
        } catch (e) {
            console.log(e);
        }
    };

    const handleUpdateUser = async (id) => {
        if (id) {
            await axios
                .put(`http://127.0.0.1:8000/api/staff/${id}`, form)
                .then(() => {
                    toast.success("Cập nhật nhân viên thành công!");
                    document.getElementById("modal_get_user").close();
                    fetchRooms();
                })
                .catch((e) => console.log(e));
        }
    };

    const handleOpenMail = (id, name) => {
        document.getElementById("modal_add_mail").showModal();
        setForm({ ...form, id: id, name: name });
    };

    const handleAddMail = async () => {
        if (form.id) {
            await axios
                .put(`http://127.0.0.1:8000/api/staff-email/${form.id}`, {
                    email: form.email,
                    password: form.password,
                })
                .then(() => {
                    toast.success("Thêm mới email thành công");
                    fetchRooms();
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const fetchRooms = async () => {
        await axios
            .get("http://127.0.0.1:8000/api/staff")
            .then((response) => setStaffs(response.data.users));
    };

    const filteredStaffs = staffs.filter((staff) =>
        staff?.profiles?.fullname
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        fetchRooms().catch((err) => console.error(err));
    }, []);

    return (
        <div className="flex flex-col gap-5">
            <h2 className="uppercase text-2xl text-center font-bold">
                Quản lý nhân viên
            </h2>
            <div className="flex justify-between">
                <button
                    className="btn btn-outline"
                    onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                    }
                >
                    Thêm nhân viên
                </button>
                <input
                    type="text"
                    placeholder="Tìm kiếm nhân viên"
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleSearch}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra" width="100%">
                    <thead>
                        <tr>
                            <th width="35%"></th>
                            <th>Tên nhân viên</th>
                            <th>Chức vụ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStaffs.map((staff, i) => (
                            <tr key={i}>
                                <th className="flex items-center gap-2 max-w-fit">
                                    <div
                                        className="bg-green-700 flex p-2 rounded-xl gap-1 text-white cursor-pointer hover:opacity-90"
                                        onClick={() => handleGetUser(staff?.id)}
                                    >
                                        <MdCreate size={20} />
                                        <p>Sửa</p>
                                    </div>
                                    <div
                                        className="bg-red-700 flex p-2 rounded-xl gap-1 text-white cursor-pointer hover:opacity-90"
                                        onClick={() => handleDelete(staff?.id)}
                                    >
                                        <MdDelete size={20} />
                                        <p>Xóa</p>
                                    </div>
                                    {!staff?.email && (
                                        <div
                                            className="bg-blue-700 flex p-2 rounded-xl gap-1 text-white cursor-pointer hover:opacity-90"
                                            onClick={() =>
                                                handleOpenMail(
                                                    staff?.id,
                                                    staff?.profiles?.fullname
                                                )
                                            }
                                        >
                                            <MdOutlineDrafts size={20} />
                                            <p>Thêm email</p>
                                        </div>
                                    )}
                                </th>
                                <td>{staff?.profiles?.fullname}</td>
                                <td>{staff?.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box flex flex-col gap-3">
                    <h3 className="font-bold text-lg">Thêm mới nhân viên</h3>
                    <div className="flex flex-col gap-5">
                        <input
                            type="text"
                            name="fullname"
                            placeholder="Họ tên nhân viên"
                            className="input input-bordered w-full max-w-lg focus:outline-none focus:ring-0"
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            name="phone_number"
                            placeholder="Số điện thoại"
                            className="input input-bordered w-full max-w-lg focus:outline-none focus:ring-0"
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="address"
                            placeholder="Địa chỉ"
                            className="input input-bordered w-full max-w-lg focus:outline-none focus:ring-0"
                            onChange={handleChange}
                        />

                        <input
                            type="date"
                            id="birthday"
                            name="birth"
                            className="input-bordered input cursor-pointer"
                            placeholder="Ngày sinh"
                            onChange={handleChange}
                        />
                        <div className="flex gap-5 rounded-xl">
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input
                                        type="radio"
                                        name="gender"
                                        className="radio checked:bg-red-500"
                                        value="male"
                                        checked={form.gender === "male"}
                                        defaultChecked
                                        onChange={handleChange}
                                    />
                                    <span className="label-text ml-2">Nam</span>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={form.gender === "female"}
                                        className="radio checked:bg-blue-500"
                                        defaultChecked
                                        onChange={handleChange}
                                    />
                                    <span className="label-text ml-2">Nữ</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            <div className="flex items-end gap-2">
                                <button className="btn">Cancel</button>
                                <button className="btn" onClick={handleSave}>
                                    Thêm mới
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>

            <dialog id="modal_add_mail" className="modal">
                <div className="modal-box flex flex-col gap-3">
                    <h3 className="font-bold text-lg">Thêm mới mail</h3>
                    <div className="flex flex-col gap-5">
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            className="input input-bordered w-full max-w-lg focus:outline-none focus:ring-0"
                            onChange={handleChange}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Mật khẩu"
                            className="input input-bordered w-full max-w-lg focus:outline-none focus:ring-0"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            <div className="flex items-end gap-2">
                                <button className="btn">Cancel</button>
                                <button className="btn" onClick={handleAddMail}>
                                    Thêm mới
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>

            <dialog id="modal_get_user" className="modal">
                <div className="modal-box flex flex-col gap-3">
                    <h3 className="font-bold text-lg">Nhân viên {form.id}</h3>
                    {isApiSuccess ? (
                        <div className="flex flex-col gap-5">
                            <input
                                type="text"
                                name="fullname"
                                placeholder="Họ tên nhân viên"
                                value={form.fullname}
                                className="input input-bordered w-full max-w-lg focus:outline-none focus:ring-0"
                                onChange={handleChange}
                            />

                            <input
                                type="number"
                                name="phone_number"
                                placeholder="Số điện thoại"
                                value={form.phone_number}
                                className="input input-bordered w-full max-w-lg focus:outline-none focus:ring-0"
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="address"
                                placeholder="Địa chỉ"
                                value={form.address}
                                className="input input-bordered w-full max-w-lg focus:outline-none focus:ring-0"
                                onChange={handleChange}
                            />
                            {form.email && (
                                <input
                                    disabled
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    value={form.email}
                                    className="input input-bordered w-full max-w-lg focus:outline-none focus:ring-0"
                                    onChange={handleChange}
                                />
                            )}

                            <input
                                type="date"
                                id="birthday"
                                name="birth"
                                className="input-bordered input cursor-pointer"
                                placeholder="Ngày sinh"
                                value={form.birth ? formatDate(form.birth) : ""}
                                onChange={handleChange}
                            />
                            <select
                                className="select select-bordered w-full"
                                onChange={handleChange}
                                name="role"
                                value={form.role}
                            >
                                <option disabled>Chức vụ</option>
                                <option value="Nhân viên">Nhân viên</option>
                                <option value="Quản lý">Quản lý</option>
                            </select>
                            <div className="flex gap-5  rounded-xl">
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <input
                                            type="radio"
                                            name="gender"
                                            className="radio checked:bg-red-500"
                                            value="male"
                                            checked={form.gender === "male"}
                                            onChange={handleChange}
                                        />
                                        <span className="label-text ml-2">
                                            Nam
                                        </span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            checked={form.gender === "female"}
                                            className="radio checked:bg-blue-500"
                                            onChange={handleChange}
                                        />
                                        <span className="label-text ml-2">
                                            Nữ
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    )}
                    <div className="modal-action">
                        <form method="dialog">
                            <div className="flex items-end gap-2">
                                <button className="btn">Cancel</button>
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => handleUpdateUser(form.id)}
                                >
                                    Chỉnh sửa
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
