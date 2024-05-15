import { jwtDecode }  from "jwt-decode";

const getUserId = () => {
  let token = window.localStorage.getItem('access');
  if (token) {
    let decodedToken = jwtDecode(token);
    return decodedToken.user_id; 
  }
  return "";
};
getUserId()
const getUserIdUtil = {
  getUserId: getUserId,
};

export default getUserIdUtil;
