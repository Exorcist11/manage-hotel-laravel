import { ClearForm } from "@/middleware/ClearForm";
import axios from "axios";
import { useState, useEffect } from "react";
import { MdDelete, MdCreate } from "react-icons/md";
import { toast } from "sonner";

export default function Room() {
    const [rooms, setRooms] = useState([]);
    const [cateogory, setCategory] = useState([]);
    const [isApiSuccess, setIsApiSuccess] = useState(false);
    const [form, setForm] = useState({
        room_no: "",
        floor: "",
        id: "",
        category_id: "",
    });

    const floors = [
        { flor: 1, name: "Tầng 1" },
        { flor: 2, name: "Tầng 2" },
        { flor: 3, name: "Tầng 3" },
        { flor: 4, name: "Tầng 4" },
        { flor: 5, name: "Tầng 5" },
        { flor: 6, name: "Tầng 6" },
    ];

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((preState) => ({
            ...preState,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        if (!form.room_no || !form.floor || !form.category_id) {
            toast.error("Vui lòng nhập đầy đủ thông tin phòng");
            return;
        }

        try {
            await axios.post("http://127.0.0.1:8000/api/rooms", form);
            ClearForm();
            toast.success("Thêm mới phòng thành công!");
            fetchRooms();
        } catch (e) {
            ClearForm();
            if (e.response && e.response.data && e.response.data.message) {
                toast.error(e.response.data.message);
            } else {
                toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
            }
        }
    };

    const handleGetRoom = async (id) => {
        document.getElementById("my_modal_2").showModal();
        await axios
            .get(`http://127.0.0.1:8000/api/rooms/${id}`)
            .then((response) => setForm(response.data))
            .catch((e) => console.log(e));
        setIsApiSuccess(true);
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm("Bạn có chắc xóa phòng này chứ?");
        if (confirm) {
            await axios
                .delete(`http://127.0.0.1:8000/api/rooms/${id}`)
                .then(() => toast.success("Xóa phòng thành công!"))
                .catch(() => toast.error("Lỗi khi xóa"));
            fetchRooms();
        }
    };

    const handleUpdate = async (id) => {
        if (id) {
            await axios
                .put(`http://127.0.0.1:8000/api/rooms/${id}`, form)
                .then(() => {
                    toast.success("Cập nhật phòng thành công!");
                })
                .catch((e) => console.log(e));
            setIsApiSuccess(false);
        }
        fetchRooms();
    };

    const fetchCateogry = async () => {
        await axios
            .get("http://127.0.0.1:8000/api/categories")
            .then((response) => setCategory(response.data));
    };

    const fetchRooms = async () => {
        await axios
            .get("http://127.0.0.1:8000/api/rooms")
            .then((response) => setRooms(response.data));
    };

    const sortedRooms = rooms.slice().sort((a, b) => {
        if (a.room_no < b.room_no) return -1;
        if (a.room_no > b.room_no) return 1;
        return 0;
    });

    useEffect(() => {
        fetchRooms().catch((err) => console.error(err));
        fetchCateogry().catch((err) => console.error(err));
    }, []);

    return (
        <div className="">
            <h2 className="uppercase text-2xl text-center font-bold">
                Quản lý phòng
            </h2>
            <button
                className="btn btn-outline"
                onClick={() =>
                    document.getElementById("add_new_room").showModal()
                }
            >
                Thêm phòng mới
            </button>

            <div className="overflow-x-auto">
                <table className="table table-zebra" width="100%">
                    <thead>
                        <tr>
                            <th width="20%"></th>
                            <th>Mã Phòng</th>
                            <th>Loại Phòng</th>
                            <th>Tầng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedRooms.map((room, i) => (
                            <tr key={i}>
                                <th className="flex items-center gap-2">
                                    <div
                                        onClick={() => handleGetRoom(room?.id)}
                                        className="bg-green-700 flex p-2 rounded-xl gap-1 text-white cursor-pointer hover:opacity-90"
                                    >
                                        <MdCreate size={20} />
                                        <p>Sửa</p>
                                    </div>
                                    <div
                                        onClick={() => handleDelete(room?.id)}
                                        className="bg-red-700 flex p-2 rounded-xl gap-1 text-white cursor-pointer hover:opacity-90"
                                    >
                                        <MdDelete size={20} />
                                        <p>Xóa</p>
                                    </div>
                                </th>
                                <td>{room?.room_no}</td>
                                <td>{room?.category.name}</td>
                                <td>{room?.floor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <dialog id="add_new_room" className="modal">
                <div className="modal-box flex flex-col gap-3">
                    <h3 className="font-bold text-lg">Thêm phòng mới!</h3>
                    <div className="flex flex-col gap-5">
                        <input
                            type="text"
                            name="room_no"
                            placeholder="Mã phòng"
                            className="input input-bordered w-full max-w-lg focus:outline-none focus:ring-0"
                            onChange={handleChange}
                        />
                        <select
                            className="select select-primary w-full max-w-lg focus:outline-none focus:ring-0"
                            name="category_id"
                            onChange={handleChange}
                        >
                            <option disabled selected>
                                Chọn loại phòng
                            </option>
                            {cateogory.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <select
                            className="select select-primary w-full max-w-lg focus:outline-none focus:ring-0"
                            name="floor"
                            onChange={handleChange}
                        >
                            <option disabled selected>
                                Chọn tầng
                            </option>
                            {floors.map((floor, index) => (
                                <option key={index} value={floor.flor}>
                                    {floor.name}
                                </option>
                            ))}
                        </select>
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

            <dialog id="my_modal_2" className="modal">
                <div className="modal-box flex flex-col gap-3">
                    <h3 className="font-bold text-lg">
                        Thông tin chi tiết phòng {form.room_no}
                    </h3>
                    {isApiSuccess ? (
                        <div className="flex flex-col gap-5">
                            <input
                                type="text"
                                name="room_no"
                                placeholder="Mã phòng"
                                value={form.room_no}
                                className="input input-bordered w-full max-w-lg focus:outline-none focus:ring-0"
                                onChange={handleChange}
                            />
                            <select
                                className="select select-primary w-full max-w-lg focus:outline-none focus:ring-0"
                                name="category_id"
                                onChange={handleChange}
                                value={form.category_id}
                            >
                                <option disabled selected>
                                    Chọn loại phòng
                                </option>
                                {cateogory.map((item, index) => (
                                    <option key={index} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            <select
                                className="select select-primary w-full max-w-lg focus:outline-none focus:ring-0"
                                name="floor"
                                onChange={handleChange}
                                defaultValue={form.floor}
                            >
                                <option disabled selected>
                                    Chọn tầng
                                </option>
                                {floors.map((floor, index) => (
                                    <option key={index} value={floor.flor}>
                                        {floor.name}
                                    </option>
                                ))}
                            </select>
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
                                    className="btn"
                                    onClick={() => handleUpdate(form.id)}
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
