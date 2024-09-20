import { useState } from "react";

const ImageUploader = () => {
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => prevImages.concat(newImages));
    };

    const handleRemoveImage = (image) => {
        setImages(images.filter((img) => img !== image));
    };

    return (
        <div>
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
            />
            <div
                style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        style={{ position: "relative", margin: "10px" }}
                    >
                        <img
                            src={image}
                            alt={`Uploaded ${index}`}
                            style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                            }}
                        />
                        <button
                            onClick={() => handleRemoveImage(image)}
                            style={{
                                position: "absolute",
                                top: "0",
                                right: "0",
                                background: "red",
                                color: "white",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageUploader;
