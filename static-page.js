document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtnStatic");
  if(logoutBtn){
    logoutBtn.onclick = () => {
      localStorage.removeItem("xr_admin_logged");
      location.href = "login.html";
    };
  }
});
