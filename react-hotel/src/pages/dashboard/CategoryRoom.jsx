
import { ClearForm } from "@/middleware/ClearForm";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete, MdCreate } from "react-icons/md";
import { toast } from "sonner";

export default function CategoryRoom() {
    const [categories, setCategories] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;
    const lastIndex = itemsPerPage * currentPage;
    const firstIndex = lastIndex - itemsPerPage;
    const records = categories.slice(firstIndex, lastIndex);
    const npage = Math.ceil(categories.length / itemsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    const [checkedItem, setCheckedItem] = useState([]);
    const [form, setForm] = useState({
        name: "",
        description: "",
        image: "",
        size: "",
        max_occupancy: "",
        id: "",
        price: "",
    });

    const services = [
        "Tủ quần áo",
        "Ga trải giường, gối",
        "Phòng tắm - Vòi sen",
        "Quầy bar mini",
        "Điều hòa",
        "Dịch vụ giặt ủi",
        "Tủ lạnh",
        "Wifi",
        "Bàn làm việc",
        "Truyền hình cáp/Vệ tinh",
    ];

    const [selectedFile, setSelectedFile] = useState(null);

    const handleChangeCheckbox = (item) => {
        setCheckedItem((prev) => {
            if (prev.includes(item)) {
                return prev.filter((i) => i !== item);
            } else {
                return [...prev, item];
            }
        });
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((preState) => ({
            ...preState,
            [name]: value,
        }));
    };

    const handleView = async (id) => {
        document.getElementById("detail_category").showModal();
        await axios
            .get(`http://127.0.0.1:8000/api/categories/${id}`)
            .then((response) => {
                setForm({
                    name: response.data.category.name,
                    description: response.data.category.description,
                    image: response.data.category.image,
                    size: response.data.category.size,
                    max_occupancy: response.data.category.max_occupancy,
                    id: response.data.category.id,
                    price: response.data.category.price,
                });
                setCheckedItem(response.data.utilities);
            })
            .catch((e) => console.error(e));
    };

    const handleUpdate = async () => {
        const formData = new FormData();

        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("size", form.size);
        formData.append("max_occupancy", form.max_occupancy);
        formData.append("price", form.price);
        formData.append("utilities", checkedItem.join("#"));
        if (selectedFile) {
            formData.append("image", selectedFile);
        }

        try {
            await axios({
                method: "post",
                url: `http://127.0.0.1:8000/api/categories/${form.id}?_method=PATCH`,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(() => {
                getCategories();
                toast.success("Cập nhật thành công!");
                document.getElementById("detail_category").close();
            });
        } catch (error) {
            console.error("There was an error updating the category!", error);
        }
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm("Bạn muốn xóa thể loại phòng này chứ?");
        if (confirm) {
            await axios
                .delete(`http://127.0.0.1:8000/api/categories/${id}`)
                .then(() => {
                    toast.success("Xóa thể loại thành công!");
                    getCategories();
                })
                .catch((error) => console.error(error));
        }
    };

    const [errors, setErrors] = useState({});
    const validate = () => {
        const newErrors = {};
        if (!form.name) newErrors.name = "Tên thể loại phòng là bắt buộc";
        if (!form.size) newErrors.size = "Kích cỡ phòng là bắt buộc";
        if (!form.max_occupancy)
            newErrors.max_occupancy = "Cần nhập số lượng người";
        if (!form.price) newErrors.price = "Giá loại phòng không được để trống";
        if (!selectedFile) newErrors.image = "Nhập ảnh phòng";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async (event) => {
        event.preventDefault();
        if (!validate()) {
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("name", form.name);
        formData.append("size", form.size);
        formData.append("max_occupancy", form.max_occupancy);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("utilities", checkedItem.join("#"));

        try {
            await axios
                .post("http://127.0.0.1:8000/api/categories", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then(() => {
                    toast.success("Thêm mới thành công");
                    ClearForm();
                    setSelectedFile(null);
                });

            ClearForm();

            getCategories();

            document.getElementById("add_new_category").close();
        } catch (err) {
            toast.error(
                err.response?.data?.message ||
                    "Có lỗi xảy ra. Vui lòng thử lại sau."
            );
        }
    };

    const getCategories = async () => {
        await axios
            .get("http://127.0.0.1:8000/api/categories")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="flex flex-col gap-5">
            <h1 className="font-bold text-2xl text-center uppercase">
                Quản lý Thể loại phòng
            </h1>
            <div className="flex justify-between">
                <button
                    className="btn btn-outline max-w-xs"
                    onClick={() =>
                        document.getElementById("add_new_category").showModal()
                    }
                >
                    Thêm thể loại phòng
                </button>
                <label className="input input-bordered flex items-center gap-2">
                    <input
                        type="text"
                        className="grow w-[250px]"
                        placeholder="Tìm kiếm thể loại phòng"
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

            <div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Loại phòng</th>
                            <th>Hình ảnh</th>
                            <th>Mô tả</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {records
                            ?.filter((cs) =>
                                cs.name
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase())
                            )
                            ?.map((item, index) => (
                                <tr key={index}>
                                    <td width="10%">
                                        {index +
                                            1 +
                                            itemsPerPage * (currentPage - 1)}
                                    </td>
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
                                                        loading="lazy"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td width="30%" className="">
                                        {item?.description}
                                    </td>
                                    <td width="10%">
                                        <div className="flex items-center justify-center gap-2">
                                            <div
                                                onClick={() =>
                                                    handleView(item?.id)
                                                }
                                                className="bg-green-700 flex p-2 rounded-xl gap-1 text-white cursor-pointer hover:opacity-90"
                                            >
                                                <MdCreate size={20} />
                                                <p>Sửa</p>
                                            </div>
                                            <div
                                                onClick={() =>
                                                    handleDelete(item?.id)
                                                }
                                                className="bg-red-700 flex p-2 rounded-xl gap-1 text-white cursor-pointer hover:opacity-90"
                                            >
                                                <MdDelete size={20} />
                                                <p>Xóa</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-end mt-5 gap-5">
                <p className="font-semibold text-xs">
                    Showing {firstIndex + 1}-{lastIndex} of {categories.length}
                </p>

                <div className="join">
                    {numbers.map((n, i) => (
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

            <dialog id="add_new_category" className="modal">
                <div className="modal-box flex flex-col gap-3 max-w-5xl">
                    <h3 className="font-bold text-xl">Thêm thể loại phòng!</h3>
                    <div className="flex flex-col gap-2">
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">
                                    Tên thể loại phòng{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                            </div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Loại phòng"
                                className="input input-bordered w-full  focus:outline-none focus:ring-0"
                                onChange={handleChange}
                            />
                            <div className="label">
                                <span className="label-text-alt">
                                    {errors.name && (
                                        <p className="text-red-500 text-sm">
                                            {errors.name}
                                        </p>
                                    )}
                                </span>
                            </div>
                        </label>

                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">
                                    Giá phòng{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                            </div>
                            <input
                                type="number"
                                name="price"
                                placeholder="Giá phòng"
                                className="input input-bordered w-full focus:outline-none focus:ring-0"
                                onChange={handleChange}
                            />
                            <div className="label">
                                <span className="label-text-alt">
                                    {errors.price && (
                                        <p className="text-red-500 text-sm">
                                            {errors.price}
                                        </p>
                                    )}
                                </span>
                            </div>
                        </label>

                        <div className="flex gap-5">
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">
                                        Số lượng người{" "}
                                        <span className="text-red-500">*</span>
                                    </span>
                                </div>
                                <input
                                    type="number"
                                    name="max_occupancy"
                                    placeholder="Số lượng người"
                                    className="input input-bordered w-full focus:outline-none focus:ring-0"
                                    onChange={handleChange}
                                />
                                <div className="label">
                                    <span className="label-text-alt">
                                        {errors.max_occupancy && (
                                            <p className="text-red-500 text-sm">
                                                {errors.max_occupancy}
                                            </p>
                                        )}
                                    </span>
                                </div>
                            </label>

                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">
                                        Kích thước phòng{" "}
                                        <span className="text-red-500">*</span>
                                    </span>
                                </div>
                                <input
                                    type="number"
                                    name="size"
                                    placeholder="Kích thước phòng"
                                    className="input input-bordered w-full  focus:outline-none focus:ring-0"
                                    onChange={handleChange}
                                />
                                <div className="label">
                                    <span className="label-text-alt">
                                        {errors.size && (
                                            <p className="text-red-500 text-sm">
                                                {errors.size}
                                            </p>
                                        )}
                                    </span>
                                </div>
                            </label>
                        </div>

                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">
                                    Tiện ích kèm theo{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                                {services.map((item, index) => (
                                    <div
                                        className="form-control col-span-1"
                                        key={index}
                                    >
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                value={item}
                                                type="checkbox"
                                                className="checkbox"
                                                checked={checkedItem.includes(
                                                    item
                                                )}
                                                onChange={() =>
                                                    handleChangeCheckbox(item)
                                                }
                                            />
                                            <span className="label-text">
                                                {item}
                                            </span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </label>

                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">
                                    Mô tả{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                            </div>
                            <textarea
                                type="text"
                                name="description"
                                placeholder="Mô tả"
                                className="textarea textarea-bordered w-full min-h-[150px] focus:outline-none focus:ring-0"
                                onChange={handleChange}
                            />
                        </label>

                        <input
                            type="file"
                            className="file-input file-input-bordered w-full "
                            onChange={handleFileChange}
                        />
                       
                        <div className="label">
                            <span className="label-text-alt">
                                {errors.image && (
                                    <p className="text-red-500 text-sm">
                                        {errors.image}
                                    </p>
                                )}
                            </span>
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

            <dialog id="detail_category" className="modal">
                <div className="modal-box flex flex-col gap-3 max-w-5xl">
                    <h3 className="font-bold text-lg">
                        Chỉnh sửa thông tin thể loại phòng!
                    </h3>
                    <div className="flex flex-col gap-2">
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">
                                    Tên thể loại phòng{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                            </div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Loại phòng"
                                value={form?.name}
                                className="input input-bordered w-full focus:outline-none focus:ring-0"
                                onChange={handleChange}
                            />
                        </label>

                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">
                                    Số lượng người{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                            </div>
                            <input
                                type="number"
                                name="max_occupancy"
                                placeholder="Số lượng người"
                                value={form?.max_occupancy}
                                className="input input-bordered w-full  focus:outline-none focus:ring-0"
                                onChange={handleChange}
                            />
                        </label>

                        <div className="flex gap-5">
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">
                                        Giá phòng (VND){" "}
                                        <span className="text-red-500">*</span>
                                    </span>
                                </div>
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Giá phòng"
                                    value={form?.price}
                                    className="input input-bordered w-full focus:outline-none focus:ring-0"
                                    onChange={handleChange}
                                />
                            </label>

                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">
                                        Kích thước phòng{" "}
                                        <span className="text-red-500">*</span>
                                    </span>
                                </div>
                                <input
                                    type="number"
                                    name="size"
                                    placeholder="Kích thước phòng"
                                    value={form?.size}
                                    className="input input-bordered w-full focus:outline-none focus:ring-0"
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">
                                    Tiện ích kèm theo{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                                {services.map((item, index) => (
                                    <div
                                        className="form-control col-span-1"
                                        key={index}
                                    >
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                value={item}
                                                type="checkbox"
                                                className="checkbox"
                                                checked={checkedItem.includes(
                                                    item
                                                )}
                                                onChange={() =>
                                                    handleChangeCheckbox(item)
                                                }
                                            />
                                            <span className="label-text">
                                                {item}
                                            </span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </label>

                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">
                                    Mô tả{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                            </div>
                            <textarea
                                type="text"
                                name="description"
                                placeholder="Mô tả"
                                value={form?.description}
                                className="textarea textarea-bordered w-full min-h-[150px] focus:outline-none focus:ring-0"
                                onChange={handleChange}
                            />
                        </label>

                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">
                                    Hình ảnh{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                            </div>
                            <input
                                type="file"
                                className="file-input file-input-bordered w-full "
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
                    <div className="modal-action">
                        <div className="flex items-end gap-2">
                            <button
                                className="btn"
                                onClick={() =>
                                    document
                                        .getElementById("detail_category")
                                        .close()
                                }
                            >
                                Cancel
                            </button>
                            <button className="btn" onClick={handleUpdate}>
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
