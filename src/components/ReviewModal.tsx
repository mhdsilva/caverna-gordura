import React, { useState } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Produto, Review } from "../types";
import { StarRating } from "./StarRating";

interface ReviewModalProps {
  produto: Produto;
  onClose: () => void;
  onSubmitReview: (review: Omit<Review, "id">) => void;
}

export const ReviewModal = ({
  produto,
  onClose,
  onSubmitReview,
}: ReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  const { t, i18n } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && comment && author) {
      onSubmitReview({ author, rating, comment });
    }
  };

  const averageRating =
    produto.reviews && produto.reviews.length > 0
      ? (
          produto.reviews.reduce((acc, review) => acc + review.rating, 0) /
          produto.reviews.length
        ).toFixed(1)
      : 0;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-label={t("closeModal")}
      />
      <div className="relative flex items-center justify-center h-full">
        <dialog
          open
          className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-11/12 md:max-w-2xl max-h-[90vh] overflow-y-auto border-0 outline-none m-0 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          aria-labelledby="modal-title"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2
                id="modal-title"
                className="text-2xl font-bold text-brand-brown"
              >
                {produto.nome[i18n.language]}
              </h2>
              <div className="flex items-center gap-2 text-lg">
                <StarRating rating={Number(averageRating)} />
                <span className="text-brand-brown font-bold">
                  {averageRating}
                </span>
                <span className="text-gray-500">
                  {t("reviewCount", { count: produto.reviews?.length ?? 0 })}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-800"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Review Form */}
            <div className="md:border-r md:pr-8">
              <h3 className="text-xl font-semibold text-brand-brown mb-4">
                {t("leaveYourReview")}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="author"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("yourName")}
                  </label>
                  <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-yellow focus:border-brand-yellow"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t("yourRating")}
                  </label>
                  <div className="flex items-center mt-1">
                    <StarRating
                      rating={rating}
                      onChange={setRating}
                      totalStars={5}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("yourComment")}
                  </label>
                  <textarea
                    id="comment"
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-yellow focus:border-brand-yellow"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-yellow text-white py-2 px-4 rounded-md hover:bg-brand-brown transition-colors focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2"
                >
                  {t("submitReview")}
                </button>
              </form>
            </div>

            {/* Review List */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-brand-brown mb-4">
                {t("whatOtherClientsSay")}
              </h3>
              {produto.reviews && produto.reviews.length > 0 ? (
                <div className="space-y-4">
                  {produto.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-brand-brown">
                          {review.author}
                        </h4>
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="mt-2 text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">{t("noReviewsYet")}</p>
              )}
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};
