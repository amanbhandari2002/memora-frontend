import react from "react";
import { Calendar } from "lucide-react";

const ImageCard = ({ src, title, date, count })=> {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition w-64 overflow-hidden">
      {/* Image */}
      <img
        src={src}
        alt={title}
        className="w-full h-40 object-cover rounded-t-2xl"
      />

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 truncate">{title}</h3>
        <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium">
            +{count}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ImageCard