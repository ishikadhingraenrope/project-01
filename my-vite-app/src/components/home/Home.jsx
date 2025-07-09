import React, { useState, useEffect, useRef } from "react";

function Home() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const fileInputRef = useRef(null);
  const [editModeIndex, setEditModeIndex] = useState(null);

  // Load images and admin status
  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem("sliderImages")) || [];
    setImages(storedImages);

    const user = JSON.parse(localStorage.getItem("userdata"));
    setIsAdmin(user?.isAdmin === true);
  }, []);

  // Auto Slide Logic
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images]);

 const handleImageUpload = (e) => {
  const files = Array.from(e.target.files);
  if (files.length === 0) return;

  const promises = files.map(file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  });

  Promise.all(promises).then((newImages) => {
    // 🔥 Fetch latest from localStorage to avoid overwriting with stale state
    const storedImages = JSON.parse(localStorage.getItem("sliderImages")) || [];
    let updatedImages = [...storedImages, ...newImages];

    if (updatedImages.length > 3) {
      updatedImages = updatedImages.slice(0, 3);
      alert("Only the first 3 images are added to the slider.");
    }

    setImages(updatedImages); // update UI
    localStorage.setItem("sliderImages", JSON.stringify(updatedImages)); // persist
  });
};


  const deleteImage = (index) => {
    const filtered = images.filter((_, i) => i !== index);
    setImages(filtered);
    localStorage.setItem("sliderImages", JSON.stringify(filtered));
  };

  return (
    <div className="flex flex-col items-center">
      {/* Slider Section */}
      <div className="relative w-full shadow overflow-hidden h-[300px]">
        {images.length > 0 ? (
          <img
            src={images[currentIndex]}
            alt={`slide-${currentIndex}`}
            className="w-full h-full object-cover transition-all duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Images Available
          </div>
        )}
      </div>

      {/* Admin Controls */}
      {isAdmin && (
        <>
          <div className="mt-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editModeIndex !== null ? "Replace Image" : "Upload New Image"}
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {images.map((img, index) => (
              <div key={index} className="relative border rounded shadow">
                <img src={img} alt={`thumb-${index}`} className="h-32 w-full object-cover" />
                <div className="absolute top-1 right-1 flex gap-2">
                  <button
                    onClick={() => {
                      setEditModeIndex(index);
                      fileInputRef.current.click();
                    }}
                    className="bg-yellow-400 px-2 text-xs text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteImage(index)}
                    className="bg-red-500 px-2 text-xs text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
