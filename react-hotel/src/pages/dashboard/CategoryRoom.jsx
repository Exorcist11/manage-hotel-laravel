import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete, MdCreate } from "react-icons/md";

export default function CategoryRoom() {
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [form, setForm] = useState({
        name: "",
        description: "",
        image: "",
        size: "",
        max_occupancy: "",
        id: "",
        price: "",
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

    const currentItems = filteredCategories.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleView = async (id) => {
        document.getElementById("detail_category").showModal();
        await axios
            .get(`http://127.0.0.1:8000/api/categories/${id}`)
            .then((response) =>
                setForm({
                    name: response.data.name,
                    description: response.data.description,
                    image: response.data.image,
                    size: response.data.size,
                    max_occupancy: response.data.max_occupancy,
                    id: response.data.id,
                    price: response.data.price,
                })
            )
            .catch((e) => console.error(e));
    };

    const handleUpdate = async () => {
        const data = {
            name: form.name,
            description: form.description,
            image: form.image,
            size: form.size,
            max_occupancy: form.max_occupancy,
        };

        if (selectedFile) {
            data.image = selectedFile;
        }

        try {
            await axios
                .patch(
                    `http://127.0.0.1:8000/api/categories/${form.id}`,
                    data,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then(() => {
                    getCategories();
                    document.getElementById("detail_category").close();
                });
        } catch (error) {
            console.error("There was an error updating the product!", error);
        }
    };

    const handleDelete = async (id) => {
        await axios
            .delete(`http://127.0.0.1:8000/api/categories/${id}`)
            .then(() => {
                alert("Xóa thể loại thành công!");
                getCategories();
            })
            .catch((error) => console.error(error));
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("name", form.name);
        formData.append("size", form.size);
        formData.append("max_occupancy", form.max_occupancy);
        formData.append("description", form.description);
        formData.append("price", form.price);
        await axios
            .post("http://127.0.0.1:8000/api/categories", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                alert("Thêm mới thành công");
                getCategories();
            })
            .catch((err) => alert(err));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((preState) => ({
            ...preState,
            [name]: value,
        }));
    };

    const handleSearchChange = (event) => {
        const keyword = event.target.value;
        setSearchKeyword(keyword);
        if (keyword) {
            const filtered = categories.filter((category) =>
                category.name.toLowerCase().includes(keyword.toLowerCase())
            );
            setFilteredCategories(filtered);
        } else {
            setFilteredCategories(categories);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log("File selected:", event.target.files[0]);
    };

    const getCategories = async () => {
        await axios
            .get("http://127.0.0.1:8000/api/categories")
            .then((response) => {
                setCategories(response.data);
                setFilteredCategories(response.data);
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="flex flex-col gap-5 max-h-full">
            <h1 className="font-bold text-2xl text-center uppercase">
                Thể loại phòng
            </h1>
            <div className="flex justify-between">
                <button
                    className="btn btn-outline max-w-xs"
                    onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                    }
                >
                    Thêm thể loại phòng
                </button>
                <label className="input input-bordered flex items-center gap-2">
                    <input
                        type="text"
                        className="grow w-[250px]"
                        placeholder="Tìm kiếm thể loại phòng"
                        value={searchKeyword}
                        onChange={handleSearchChange}
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

            <div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Loại phòng</th>
                            <th>Hình ảnh</th>
                            <th>Mô tả</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index}>
                                <td width="10%">{item?.id}</td>
                                <td width="20%">
                                    <a
                                        href={`/category-room/${item.id}/rooms`}
                                        className="hover:underline cursor-pointer hover:text-blue-600"
                                    >
                                        {item?.name}
                                    </a>
                                </td>
                                <td width="30%">
                                    <div className="flex items-center gap-3">
                                        <div className="avatar w-full">
                                            <div className="w-full h-48">
                                                <img
                                                    src={
                                                        "http://127.0.0.1:8000" +
                                                        item?.image
                                                    }
                                                    alt={item?.name}
                                                    className="w-full object-contain"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td width="30%">{item?.description}</td>
                                <td width="10%">
                                    <div className="flex items-center justify-center gap-2">
                                        <MdCreate
                                            size={20}
                                            className="cursor-pointer hover:text-blue-600"
                                            onClick={() => handleView(item?.id)}
                                        />
                                        <MdDelete
                                            size={20}
                                            className="cursor-pointer hover:text-red-600"
                                            onClick={() =>
                                                handleDelete(item?.id)
                                            }
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={`btn ${
                                currentPage === index + 1
                                    ? "btn-primary"
                                    : "btn-outline"
                            } mx-1`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box flex flex-col gap-3">
                    <h3 className="font-bold text-lg">Thêm mới!</h3>
                    <div className="flex flex-col gap-5">
                        <input
                            type="text"
                            name="name"
                            placeholder="Loại phòng"
                            className="input input-bordered w-full max-w-lg focus:outline-none focus:ring-0"
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Giá phòng"
                            className="input input-bordered w-full max-w-lg focus:outline-none focus:ring-0"
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="max_occupancy"
                            placeholder="Số lượng người"
                            className="input input-bordered w-full max-w-lg focus:outline-none focus:ring-0"
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            name="size"
                            placeholder="Kích thước phòng"
                            className="input input-bordered w-full max-w-lg focus:outline-none focus:ring-0"
                            onChange={handleChange}
                        />

                        <textarea
                            type="text"
                            name="description"
                            placeholder="Mô tả"
                            className="textarea textarea-bordered w-full max-w-lg focus:outline-none focus:ring-0"
                            onChange={handleChange}
                        />

                        <input
                            type="file"
                            className="file-input file-input-bordered w-full "
                            onChange={handleFileChange}
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

            <dialog id="detail_category" className="modal">
                <div className="modal-box flex flex-col gap-3">
                    <h3 className="font-bold text-lg">Thêm mới!</h3>
                    <div className="flex flex-col gap-5">
                        <input
                            type="text"
                            name="name"
                            placeholder="Loại phòng"
                            value={form?.name}
                            className="input input-bordered w-full max-w-lg focus:outline-none focus:ring-0"
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="max_occupancy"
                            placeholder="Số lượng người"
                            value={form?.max_occupancy}
                            className="input input-bordered w-full max-w-lg focus:outline-none focus:ring-0"
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            name="price"
                            placeholder="Giá phòng"
                            value={form?.price}
                            className="input input-bordered w-full max-w-lg focus:outline-none focus:ring-0"
                            onChange={handleChange}
                        />

                        <input
                            type="number"
                            name="size"
                            placeholder="Kích thước phòng"
                            value={form?.size}
                            className="input input-bordered w-full max-w-lg focus:outline-none focus:ring-0"
                            onChange={handleChange}
                        />

                        <textarea
                            type="text"
                            name="description"
                            placeholder="Mô tả"
                            value={form?.description}
                            className="textarea textarea-bordered w-full max-w-lg focus:outline-none focus:ring-0"
                            onChange={handleChange}
                        />

                        <input
                            type="file"
                            className="file-input file-input-bordered w-full "
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <div className="flex items-end gap-2">
                                <button className="btn">Cancel</button>
                                <button className="btn" onClick={handleUpdate}>
                                    Cập nhật
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
