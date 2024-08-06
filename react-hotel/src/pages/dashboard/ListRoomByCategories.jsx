import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ListRoomByCategories() {
    const { id } = useParams();

    useEffect(() => {
        const getListRoom = async () => {
            await axios
                .get(`http://127.0.0.1:8000/api/categories/${id}/rooms`)
                .then((response) => console.log(response.data))
                .catch((error) => console.error(error));
        };
        getListRoom();
    }, [id]);

    return <div>ListRoomByCategories</div>;
}
