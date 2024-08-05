import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete, MdCreate } from "react-icons/md";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [form, setForm] = useState({
        id: "",
        name: "",
        price: "",
        amount: "",
        url: "",
    });

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log("File selected:", event.target.files[0]);
    };

    const handleDelete = async (productID) => {
        const confirm = window.confirm("Are you sure you want to delete?");
        if (confirm) {
            await axios
                .delete(`http://127.0.0.1:8000/api/products/${productID}`)
                .then(() => alert("Xoá sản phẩm"))
                .catch(() => alert("Lỗi khi xóa"));
            getProducts();
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("name", form.name);
        formData.append("price", form.price);
        formData.append("amount", form.amount);
        try {
            await axios
                .post("http://127.0.0.1:8000/api/products", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    console.log(response);
                    getProducts();
                });
        } catch (error) {
            console.error("There was an error uploading the file!", error);
        }
    };

    const handleViewProduct = async (id) => {
        document.getElementById("my_modal_2").showModal();
        await axios
            .get(`http://127.0.0.1:8000/api/products/${id}`)
            .then((response) =>
                setForm({
                    id: response.data.product.id,
                    name: response.data.product.name,
                    price: response.data.product.price,
                    amount: response.data.product.amount,
                    url: response.data.product.image,
                })
            )
            .catch((e) => console.log(e));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        const data = {
            name: form.name,
            price: form.price,
            amount: form.amount,
        };
        if (selectedFile) {
            data.image = selectedFile;
        }

        try {
            await axios
                .put(`http://127.0.0.1:8000/api/products/${form.id}`, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    console.log(response);
                    getProducts();
                    document.getElementById("my_modal_2").close();
                });
        } catch (error) {
            console.error("There was an error updating the product!", error);
        }
    };

    const getProducts = async () => {
        await axios
            .get("http://127.0.0.1:8000/api/products")
            .then((response) => setProducts(response.data.products))
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div>
            <h1 className="text-center text-2xl font-bold uppercase">
                Cơ sở vật chất
            </h1>
            <div className="flex items-center justify-between">
                <button
                    className="btn btn-outline"
                    onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                    }
                >
                    Thêm mới vật phẩm
                </button>

                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Search"
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
            </div>
            <div className="">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th></th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item, index) => (
                            <tr key={index}>
                                <th>
                                    <b>{item?.name}</b>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="object-cover object-center h-16 w-16">
                                                <img
                                                    src={
                                                        "http://127.0.0.1:8000" +
                                                        item?.image
                                                    }
                                                    alt={item?.name}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{item?.amount}</td>
                                <td>{item?.price} VND</td>
                                <td className="">
                                    <div className="flex items-center justify-center gap-2">
                                        <MdCreate
                                            size={20}
                                            className="cursor-pointer hover:text-blue-600"
                                            onClick={() =>
                                                handleViewProduct(item?.id)
                                            }
                                        />{" "}
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
            </div>

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box flex flex-col gap-3">
                    <h3 className="font-bold text-lg">Thêm mới!</h3>
                    <div className="flex flex-col gap-5">
                        <input
                            type="text"
                            name="name"
                            placeholder="Tên sản phẩm"
                            className="input input-bordered w-full max-w-lg focus:outline-none focus:ring-0"
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="amount"
                            placeholder="Số lượng"
                            className="input input-bordered w-full max-w-lg focus:outline-none focus:ring-0"
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Đơn giá"
                            className="input input-bordered w-full max-w-lg focus:outline-none focus:ring-0"
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
                                <button className="btn" onClick={handleSubmit}>
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
                        Thông tin chi tiết sản phẩm
                    </h3>
                    <div className="flex flex-col gap-5">
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            placeholder="Tên sản phẩm"
                            className="input input-bordered w-full max-w-lg focus:outline-none focus:ring-0"
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="amount"
                            value={form.amount}
                            placeholder="Số lượng"
                            className="input input-bordered w-full max-w-lg focus:outline-none focus:ring-0 "
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Đơn giá"
                            value={form.price}
                            className="input input-bordered w-full max-w-lg focus:outline-none focus:ring-0"
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
