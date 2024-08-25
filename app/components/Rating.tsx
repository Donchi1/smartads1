import React from 'react'

    interface RatingProps {
        rating: number;
        onRate: (rating: number) => void;
      }
      
const Rating: React.FC<RatingProps> = ({ rating, onRate }) => (
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              onClick={() => onRate(star)}
              className={`size-6 cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-500'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927a.5.5 0 00-.898 0L6.158 7.89l-5.057.733a.5.5 0 00-.277.853l3.654 3.558-.862 5.029a.5.5 0 00.725.527L10 15.347l4.519 2.376a.5.5 0 00.725-.527l-.862-5.029 3.654-3.558a.5.5 0 00-.277-.853l-5.057-.733-2.063-4.963z" />
            </svg>
          ))}
        </div>
      );
      
export default Rating
