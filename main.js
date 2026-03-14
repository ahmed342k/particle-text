function xrRenderHeader(){
  const header = document.getElementById("siteHeader");
  if(!header) return;

  header.innerHTML = `
    <div class="container nav">
      <div class="brand">
        <div class="logo">XR</div>
        <div class="brand-text">
          <h1>XR Store</h1>
          <p>متجر متنوع للإكسسوارات والأجهزة البسيطة</p>
        </div>
      </div>

      <div class="nav-links">
        <a class="nav-link" href="index.html">الرئيسية</a>
        <a class="nav-link" href="cart.html">السلة</a>
        <a class="nav-link" href="login.html">تسجيل دخول الإدارة</a>
      </div>

      <div class="nav-actions">
        <button class="theme-toggle" id="themeBtn" aria-label="تغيير الوضع">
          <span class="toggle-track-icon sun-mark">☀</span>
          <span class="toggle-track-icon moon-mark">🌙</span>
          <span class="toggle-thumb">
            <span class="thumb-icon">☀</span>
          </span>
        </button>

        <a class="primary-btn" href="cart.html">السلة (<span id="cartCountTop">${xrCartCount()}</span>)</a>
      </div>
    </div>
  `;

  const btn = document.getElementById("themeBtn");
  if(btn){
    const thumbIcon = btn.querySelector(".thumb-icon");

    function updateThemeIcon(){
      if(document.body.classList.contains("light")){
        thumbIcon.textContent = "☀";
      }else{
        thumbIcon.textContent = "🌙";
      }
    }

    updateThemeIcon();

    btn.addEventListener("click", () => {
      xrThemeToggle();
      updateThemeIcon();
    });
  }
}

function xrRenderFooter(){
  const footer = document.getElementById("siteFooter");
  if(!footer) return;

  footer.innerHTML = `
    <div class="container">
      <div class="footer-links">
        <a href="about.html">من نحن</a>
        <a href="contact.html">اتصل بنا</a>
        <a href="privacy.html">سياسة الخصوصية</a>
        <a href="terms.html">الشروط والأحكام</a>
      </div>
      <p class="center mb0">© 2026 XR Store - جميع الحقوق محفوظة</p>
    </div>
  `;
}

function xrRefreshCartTop(){
  const el = document.getElementById("cartCountTop");
  if(el) el.textContent = xrCartCount();
}

document.addEventListener("DOMContentLoaded", () => {
  xrThemeInit();
  xrRenderHeader();
  xrRenderFooter();
  xrRefreshCartTop();
});
