// src/apiConfig.js

//const BASE_URL = "http://localhost:3001"; 
//const BASE_URL = "https://jwt-backend-render.onrender.com"
//export default BASE_URL;
// src/apiConfig.js
const BASE_URL = import.meta.env.VITE_API_URL;
export default BASE_URL;
