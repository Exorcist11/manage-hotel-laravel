import axios from "axios";
import { useState, useEffect } from "react";
import { MdDelete, MdCreate } from "react-icons/md";

export default function Room() {
    const [rooms, setRooms] = useState([]);
    const [form, setForm] = useState({
        room_no: "",
        max_number: "",
        price: "",
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
        await axios
            .post("http://127.0.0.1:8000/api/rooms/create", form)
            .then(() => {
                alert("Thêm mới phòng thành công!");
                setForm({
                    room_no: "",
                    max_number: "",
                    price: "",
                });
            })
            .catch((e) => console.log(e));
        fetchRooms();
    };

    const handleGetRoom = async (id) => {
        document.getElementById("my_modal_2").showModal();
        await axios
            .get(`http://127.0.0.1:8000/api/rooms/${id}`)
            .then((response) => setForm(response.data))
            .catch((e) => console.log(e));
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete");
        if (confirm) {
            await axios
                .delete(`http://127.0.0.1:8000/api/rooms/${id}`)
                .then(() => alert("Xóa phòng thành công!"))
                .catch(() => alert("Lỗi khi xóa"));
            fetchRooms();
        }
    };

    const fetchRooms = async () => {
        await axios
            .get("http://127.0.0.1:8000/api/rooms")
            .then((response) => setRooms(response.data));
    };

    useEffect(() => {
        fetchRooms().catch((err) => console.error(err));
    }, []);

    return (
        <div className="">
            <h2 className="uppercase text-3xl text-center font-semibold">
                Quản lý phòng
            </h2>
            <button
                className="btn btn-outline"
                onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                }
            >
                Thêm phòng mới
            </button>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Mã Phòng</th>
                            <th>Loại phòng</th>
                            <th>Giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map((room, i) => (
                            <tr key={i}>
                                <th className="flex items-center gap-2">
                                    <MdCreate
                                        size={20}
                                        className="cursor-pointer hover:text-blue-600"
                                        onClick={() => handleGetRoom(room?.id)}
                                    />{" "}
                                    <MdDelete
                                        size={20}
                                        className="cursor-pointer hover:text-red-600"
                                        onClick={() => handleDelete(room?.id)}
                                    />
                                </th>
                                <td>{room?.room_no}</td>
                                <td>{room?.max_number}</td>
                                <td>{room?.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box flex flex-col gap-3">
                    <h3 className="font-bold text-lg">Thêm mới!</h3>
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
                            name="max_number"
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
                        <input
                            type="number"
                            name="price"
                            placeholder="Nhập giá"
                            className="input input-bordered w-full max-w-lg focus:outline-none focus:ring-0"
                            onChange={handleChange}
                        />
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
                            name="max_number"
                            onChange={handleChange}
                        >
                            <option disabled selected>
                                Chọn tầng
                            </option>
                            {floors.map((floor, index) => (
                                <option
                                    key={index}
                                    value={floor.flor}
                                    selected={form.max_number}
                                >
                                    {floor.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            name="price"
                            placeholder="Nhập giá"
                            value={form.price}
                            className="input input-bordered w-full max-w-lg focus:outline-none focus:ring-0"
                            onChange={handleChange}
                        />
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
        </div>
    );
}
