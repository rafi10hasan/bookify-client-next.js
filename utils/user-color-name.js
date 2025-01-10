function getBackgroundColor(name) {
    const colors = {
      A: "#0a34ed", B: "#FBBC04", C: "#34A8f3", D: "#4285F4", E: "#A142F4",
      F: "#217275", G: "#46BDFF", H: "#FBBC04", I: "#DB4437", J: "#F4B400",
      K: "#6d9791", L: "#F28B82", M: "#34A8c3", N: "#FBBC04", O: "#A142F4",
      P: "#e19e4d", Q: "#46BDFF", R: "#0d13ee", S: "#DB4437", T: "#F4B400",
      U: "#4285F4", V: "#F28B82", W: "#34A888", X: "#FBBC04", Y: "#A142F4",
      Z: "#FF6D01"
    };
  
    const firstLetter = name.charAt(0).toUpperCase();
  

    return colors[firstLetter] || "#999999"; 
  }

  export {getBackgroundColor}