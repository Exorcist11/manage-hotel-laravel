import axios from "axios";
import { useState, useEffect } from "react";

export default function Room() {
    const [rooms, setRooms] = useState([]);
    const fetchRooms = async () => {
        await axios
            .get("http://127.0.0.1:8000/api/room")
            .then((response) => setRooms(response.data));
    };

    useEffect(() => {
        fetchRooms().catch((err) => console.error(err));
    }, []);

    return (
        <div className="">
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
                                <th>{i + 1}</th>
                                <td>{room?.room_no}</td>
                                <td>{room?.max_number}</td>
                                <td>{room?.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">
                        Press ESC key or click the button below to close
                    </p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
