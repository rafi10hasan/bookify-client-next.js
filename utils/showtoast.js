import { toast } from "sonner";

function showToast(type, message) {
    let bgColorClass;
  
    // Set background color based on the toast type
    switch (type) {
      case "success":
        bgColorClass = "bg-green-500 text-white"; // Green for success
        break;
      case "error":
        bgColorClass = "bg-red-500 text-white"; // Red for error
        break;
      case "warning":
        bgColorClass = "bg-yellow-500 text-black"; // Yellow for warning
        break;
      default:
        bgColorClass = "bg-gray-800 text-white"; // Default color
    }
  
    toast(message, {
      className: bgColorClass,
    });
  }
  
  export {showToast}
  // Usage examples

 