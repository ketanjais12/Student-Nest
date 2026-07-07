import { Link } from "react-router-dom";
import { 
  Star, MapPin, 
  BedDouble, Wifi, Utensils, Snowflake, Check, Droplets, Cctv , Shirt
} from "lucide-react";

const BACKEND_URL = "https://student-nest-bjtk.onrender.com";


const HostelCard = ({ hostel }) => {
  let displayImage = "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800";

  if (hostel?.images && hostel.images.length > 0) {
    let rawPath = hostel.images[0];
    let cleanPath = rawPath.replace(/\\/g, "/"); 
   displayImage = hostel.images[0];;
  }

const getIcon = (name) => {
    if (!name) return Check;
    const n = name.toLowerCase();
    if (n.includes('wifi') || n.includes('internet')) return Wifi;
    if (n.includes('food') || n.includes('meal') || n.includes('mess')) return Utensils;
    if (n.includes('ac') || n.includes('air')) return Snowflake;
    if (n.includes('bed') || n.includes('sharing') || n.includes('room')) return BedDouble;
    
    if (n.includes('water') || n.includes('ro')) return Droplets;
    if (n.includes('cctv') || n.includes('camera') || n.includes('security')) return Cctv;
    if (n.includes('laundry') || n.includes('washing')) return Shirt;

    console.log(hostel.name);
console.log(hostel.images[0]);
console.log(displayImage);

    return Check;
  };

  return (
    <Link 
      to={`/hostels/${hostel?._id}`}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col group cursor-pointer block"
    >
      
      <div className="relative w-full h-[250px] aspect-video overflow-hidden bg-gray-100">
        <img 
          src={displayImage} 
          alt={hostel?.name || "Hostel"} 
          className="w-full h-full object-cover brightness-[0.92] group-hover:scale-110 group-hover:brightness-100 transition-all duration-500 ease-out" 
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800";
          }}
        />
        
        {hostel?.rating && (
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm z-10">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-sm text-gray-800">{hostel.rating}</span>
            {hostel?.reviewsCount && (
              <span className="text-xs text-gray-500 font-medium">({hostel.reviewsCount})</span>
            )}
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-extrabold text-gray-900 line-clamp-1">{hostel?.name}</h3>
        
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 font-medium">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-gray-400 shrink-0" /> 
            <span className="truncate">{hostel?.city || "Location unavailable"}</span>
          </div>
        </div>

        <div className="h-px bg-gray-100 w-full my-4"></div>

        <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-6">
          {hostel?.facilities && hostel.facilities.length > 0 ? (
            hostel.facilities.slice(0, 4).map((facility, index) => {
              const Icon = getIcon(facility);
              return (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-700 font-medium truncate">
                  <Icon className="w-4 h-4 text-blue-500 shrink-0" /> 
                  <span className="truncate capitalize">{facility}</span>
                </div>
              );
            })
          ) : (
            <div className="col-span-2 text-sm text-gray-400 italic">No facilities listed yet</div>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <p className="text-2xl font-black text-blue-600 flex items-baseline gap-1">
              {hostel?.rent ? `₹${hostel.rent}` : 'N/A'} 
              {hostel?.rent && <span className="text-sm font-bold text-gray-400">/month</span>}
            </p>
          </div>
          
          <div className="bg-gray-900 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold transition-colors active:scale-95 shadow-md">
            View Details
          </div>
        </div>
        
      </div>
    </Link>
  );
  
};


export default HostelCard;