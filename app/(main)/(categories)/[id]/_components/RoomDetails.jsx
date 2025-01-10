
import { BedDoubleIcon,  EyeIcon, FullscreenIcon, SoupIcon, Square, Star, User,} from "lucide-react";

export default function RoomDetails({room}) {
  const {Adults,children,bed_type,room_type,amenities,meal,view,size} = room
  return (

      <div className="w-full mt-8">
      <h2 className="text-2xl font-semibold mb-4">Details</h2>
      <table className="w-full text-left border border-gray-200">
        <tbody>
          <tr>
            <th className="py-2 px-4 text-sm font-semibold text-gray-600 flex items-center border-b-2 border-gray-200">
              <span role="img" aria-label="adults"><User className="size-4 mr-2"/></span> Adults:
            </th>
            <td className="py-2 px-4 text-sm text-gray-700 border border-gray-200">{Adults}</td>
          </tr>

          <tr>
            <th className="py-2 px-4 text-sm font-semibold text-gray-600 flex items-center border-b-2 border-gray-200">
              <span role="img" aria-label="adults"><User className="size-4 mr-2"/></span> children:
            </th>
            <td className="py-2 px-4 text-sm text-gray-700 border border-gray-200">{children}</td>
          </tr>

          <tr>
            <th className="py-2 px-4 text-sm font-semibold text-gray-600 flex items-center border-b-2 border-gray-200">
              <span role="img" aria-label="amenities"><Star className="size-4 mr-2 text-deep-yellow fill-deep-yellow"/></span> Amenities:
            </th>
            <td className="py-2 px-4 text-sm text-gray-700 border border-gray-200">
               {amenities?.length && amenities.map((amenity) => (
                <span key={amenity._id}>{amenity.name}, </span> 
               )
                )}
            </td>
          </tr>
          <tr>
            <th className="py-2 px-4 text-sm font-semibold text-gray-600 flex items-center border-b-2 border-gray-200">
              <span role="img" aria-label="view"><EyeIcon className="size-4 mr-2" /></span> View:
            </th>
            <td className="py-2 px-4 text-sm text-gray-700 border border-gray-200">{view}</td>
          </tr>
          <tr>
            <th className="py-2 px-4 text-sm font-semibold text-gray-600 flex items-center border-b-2 border-gray-200">
              <span role="img" aria-label="size"><FullscreenIcon className="size-4 mr-2" /></span> Size:
            </th>
            <td className="py-2 px-4 text-sm text-gray-700 border border-gray-200">{size}m<sup>2</sup></td>
          </tr>
          <tr>
            <th className="py-2 px-4 text-sm font-semibold text-gray-600 flex items-center border-b-2 border-gray-200">
              <span role="img" aria-label="bed-type"><BedDoubleIcon className="size-4 mr-2" /></span> Bed Type:
            </th>
            <td className="py-2 px-4 text-sm text-gray-700 border border-gray-200">{bed_type}</td>
          </tr>
          <tr>
            <th className="py-2 px-4 text-sm font-semibold text-gray-600 flex items-center border-b-2 border-gray-200">
              <span role="img" aria-label="categories"><Square className="size-4 mr-2"/></span> Room Type:
            </th>
            <td className="py-2 px-4 text-sm text-gray-700 border border-gray-200">{room_type}</td>
          </tr>

          <tr>
            <th className="py-2 px-4 text-sm font-semibold text-gray-600 flex items-center border-gray-200">
              <span role="img" aria-label="categories"><SoupIcon className="size-4 mr-2"/></span> meal:
            </th>
            <td className="py-2 px-4 text-sm text-gray-700 border border-gray-200">
              {
                meal ? <span>{meal}</span> : "no meal included"
              }
              </td>
          </tr>

        </tbody>
      </table>
    </div>


  );
}
