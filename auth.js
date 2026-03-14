document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if(!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();

    if(user === "xradmin" && pass === "123456"){
      localStorage.setItem("xr_admin_logged", "yes");
      xrShowNotice("تم تسجيل الدخول بنجاح");
      setTimeout(() => location.href = "admin.html", 700);
      return;
    }

    xrShowNotice("اسم المستخدم أو كلمة المرور غير صحيحة");
  });
});
