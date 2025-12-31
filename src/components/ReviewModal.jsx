import React, { useState } from "react";
import { X, Star } from "lucide-react";
import { services } from "../utils/services";
import { StaticApi } from "../utils/StaticApi";
import { toast } from "react-toastify";

const MAX_IMAGES = 5;
const ReviewModal = ({ orderId, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    if (images.length + selectedFiles.length > MAX_IMAGES) {
      toast.error(`You can upload maximum ${MAX_IMAGES} images`);
      return;
    }

    setImages([...images, ...selectedFiles]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };
  const submitReview = async () => {
    if (!rating) {
      toast.error("Please select rating");
      return;
    }

    const formData = new FormData();
    formData.append("orderId", orderId);
    formData.append("rating", rating.toString());
    formData.append("comment", comment);

    images.forEach((img) => formData.append("images", img));

    try {
      setLoading(true);
      await services.post(StaticApi.submitReview, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Review submitted successfully");
      onClose();
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-5 relative">
        <button onClick={onClose} className="absolute right-3 top-3">
          <X />
        </button>

        <h2 className="text-lg font-semibold mb-4">Rate your order</h2>

        {/* STARS */}
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={28}
              className={`cursor-pointer ${
                i <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
              }`}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(i)}
              fill={i <= rating ? "#facc15" : "none"}
            />
          ))}
        </div>

        {/* COMMENT */}
        <textarea
          placeholder="Write your review (optional)"
          className="w-full border rounded-lg p-3 text-sm mb-4"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* IMAGE UPLOAD */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">
            Upload photos <span className="text-gray-400">(optional)</span>
          </p>

          <div className="grid grid-cols-3 gap-3">
            {/* IMAGE PREVIEWS */}
            {images.map((img, index) => (
              <div
                key={index}
                className="relative w-full h-24 border rounded-lg overflow-hidden"
              >
                <img
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  className="w-full h-full object-cover"
                />

                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
                >
                  <X size={14} />
                </button>
              </div>
            ))}

            {/* ADD IMAGE */}
            {images.length < MAX_IMAGES && (
              <label className="w-full h-24 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer text-gray-400 hover:border-green-600 hover:text-green-600">
                <span className="text-2xl">+</span>
                <span className="text-xs">Add photo</span>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <p className="text-xs text-gray-500 mt-2">
            {images.length}/{MAX_IMAGES} images selected
          </p>
        </div>

        {/* SUBMIT */}
        <button
          onClick={submitReview}
          disabled={loading}
          className="bg-green-600 text-white w-full py-3 rounded-lg"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
