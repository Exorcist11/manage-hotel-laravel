import useSWR from "swr";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { ClearForm } from "@/middleware/ClearForm";
import { MdCreate, MdDelete } from "react-icons/md";
import { fetcher } from "@/lib/fetcher";

export default function Room() {
    const {
        data: rooms,
        mutate: mutateRooms,
        isLoading,
    } = useSWR("http://127.0.0.1:8000/api/rooms", fetcher);

    const { data: category } = useSWR(
        "http://127.0.0.1:8000/api/categories",
        fetcher
    );

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const lastIndex = itemsPerPage * currentPage;
    const firstIndex = lastIndex - itemsPerPage;
    const records = rooms ? rooms.slice(firstIndex, lastIndex) : [];
    const npage = rooms ? Math.ceil(rooms.length / itemsPerPage) : 0;
    const numbers = npage > 0 ? [...Array(npage + 1).keys()].slice(1) : [];

    const [form, setForm] = useState({
        room_no: "",
        floor: "",
        id: "",
        category_id: "",
    });
    const [errors, setErrors] = useState({});

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
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!form.room_no) newErrors.room_no = "Mã phòng là bắt buộc";
        if (!form.category_id) newErrors.category_id = "Loại phòng là bắt buộc";
        if (!form.floor) newErrors.floor = "Tầng là bắt buộc";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async (event) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            await axios.post("http://127.0.0.1:8000/api/rooms", form);
            toast.success("Thêm mới phòng thành công!");
            mutateRooms();
            setForm({
                room_no: "",
                floor: "",
                id: "",
                category_id: "",
            });
            document.getElementById("add_new_room").close();
        } catch (e) {
            toast.error(e.response.data.message);
        }
    };

    const handleGetRoom = async (id) => {
        document.getElementById("my_modal_2").showModal();
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/rooms/${id}`
            );
            setForm(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm("Bạn có chắc xóa phòng này chứ?");
        if (confirm) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/rooms/${id}`);
                toast.success("Xóa phòng thành công!");
                mutateRooms();
                ClearForm();
            } catch (e) {
                toast.error("Lỗi khi xóa");
            }
        }
    };

    const handleUpdate = async (id) => {
        if (id) {
            try {
                await axios.put(`http://127.0.0.1:8000/api/rooms/${id}`, form);
                toast.success("Cập nhật phòng thành công!");
                mutateRooms();
            } catch (e) {
                console.log(e);
            }
        }
        ClearForm();
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-infinity loading-lg"></span>
            </div>
        );
    }

    return (
        <div>
            <h2 className="uppercase text-2xl text-center font-bold">
                Quản lý phòng
            </h2>
            <div className="flex items-center justify-between">
                <button
                    className="btn btn-outline mb-5"
                    onClick={() =>
                        document.getElementById("add_new_room").showModal()
                    }
                >
                    Thêm phòng mới
                </button>

                <label className="input input-bordered flex items-center gap-2">
                    <input
                        type="text"
                        className="grow"
                        placeholder="Tìm kiếm tên phòng"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </label>
            </div>

            <div className="overflow-x-auto">
                <table className="table" width="100%">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã Phòng</th>
                            <th>Loại Phòng</th>
                            <th>Tầng</th>
                            <th width="20%"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {records
                            ?.filter((cs) =>
                                cs.room_no
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase())
                            )
                            ?.map((room, i) => (
                                <tr key={i}>
                                    <td>
                                        {i +
                                            1 +
                                            itemsPerPage * (currentPage - 1)}
                                    </td>
                                    <td>{room?.room_no}</td>
                                    <td>{room?.category.name}</td>
                                    <td>{room?.floor}</td>
                                    <th className="flex items-center gap-2">
                                        <div
                                            onClick={() =>
                                                handleGetRoom(room?.id)
                                            }
                                            className="bg-green-700 flex p-2 rounded-xl gap-1 text-white cursor-pointer hover:opacity-90"
                                        >
                                            <MdCreate size={20} />
                                            <p>Sửa</p>
                                        </div>
                                        <div
                                            onClick={() =>
                                                handleDelete(room?.id)
                                            }
                                            className="bg-red-700 flex p-2 rounded-xl gap-1 text-white cursor-pointer hover:opacity-90"
                                        >
                                            <MdDelete size={20} />
                                            <p>Xóa</p>
                                        </div>
                                    </th>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-end mt-5 gap-5">
                <p className="font-semibold text-xs">
                    Showing {firstIndex + 1}-{lastIndex} of {rooms.length}
                </p>

                <div className="join">
                    {numbers?.map((n, i) => (
                        <button
                            className={`join-item btn  btn-sm ${
                                currentPage === n ? "btn-active" : ""
                            }`}
                            onClick={() => setCurrentPage(n)}
                            key={i}
                        >
                            {n}
                        </button>
                    ))}
                </div>
            </div>

            <dialog id="add_new_room" className="modal">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Thêm phòng mới</h3>
                    <div className="form-control">
                        <label className="label font-bold">Mã phòng</label>
                        <input
                            type="number"
                            name="room_no"
                            placeholder="Nhập mã phòng..."
                            className="input input-bordered"
                            value={form.room_no}
                            onChange={handleChange}
                        />
                        {errors.room_no && (
                            <p className="text-red-500">{errors.room_no}</p>
                        )}
                    </div>

                    <div className="form-control">
                        <label className="label font-bold">Tầng</label>
                        <select
                            className="input input-bordered"
                            name="floor"
                            onChange={handleChange}
                            value={form.floor}
                        >
                            <option value="">Chọn tầng</option>
                            {floors?.map((item) => (
                                <option key={item.flor} value={item.flor}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        {errors.floor && (
                            <p className="text-red-500">{errors.floor}</p>
                        )}
                    </div>

                    <div className="form-control">
                        <label className="label font-bold">Loại phòng</label>
                        <select
                            className="input input-bordered"
                            name="category_id"
                            onChange={handleChange}
                            value={form.category_id}
                        >
                            <option value="">Chọn loại phòng</option>
                            {category?.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && (
                            <p className="text-red-500">{errors.category_id}</p>
                        )}
                    </div>
                    <div className="modal-action">
                        <button
                            className="btn btn-outline"
                            onClick={handleSave}
                        >
                            Thêm mới
                        </button>
                        <button className="btn btn-outline">Hủy</button>
                    </div>
                </form>
            </dialog>

            <dialog id="my_modal_2" className="modal">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Cập nhật phòng</h3>
                    <div className="form-control">
                        <label className="label font-bold">Mã phòng</label>
                        <input
                            type="text"
                            name="room_no"
                            placeholder="Nhập mã phòng..."
                            className="input input-bordered"
                            value={form.room_no}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label font-bold">Tầng</label>
                        <select
                            className="input input-bordered"
                            name="floor"
                            onChange={handleChange}
                            value={form.floor}
                        >
                            <option value="">Chọn tầng</option>
                            {floors?.map((item) => (
                                <option key={item.flor} value={item.flor}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label font-bold">Loại phòng</label>
                        <select
                            className="input input-bordered"
                            name="category_id"
                            onChange={handleChange}
                            value={form.category_id}
                        >
                            <option value="">Chọn loại phòng</option>
                            {category?.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="modal-action">
                        <button
                            className="btn btn-outline"
                            onClick={() => handleUpdate(form.id)}
                        >
                            Cập nhật
                        </button>
                        <button className="btn btn-outline">Hủy</button>
                    </div>
                </form>
            </dialog>
        </div>
    );
}
