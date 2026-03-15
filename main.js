function xrRenderHeader() {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  header.innerHTML = `
    <div class="container nav desktop-nav">
      <div class="header-logo-wrap">
        <div class="logo">XR</div>
        <div class="brand-text">
          <h1>XR Store</h1>
          <p>متجر متنوع للإكسسوارات والأجهزة البسيطة</p>
        </div>
      </div>

      <div class="header-center-links">
        <a class="nav-link" href="#productsSection">الصفحة الرئيسية</a>
        <a class="nav-link" href="#productsSection">الأقسام</a>
        <a class="nav-link" href="#articlesSection">العروض</a>
        <a class="nav-link" href="cart.html">سلة التسوق</a>
      </div>

      <div class="header-actions">
        <button class="theme-toggle" id="themeBtn" aria-label="تغيير الوضع">
          <span class="toggle-track-icon sun-mark">☀</span>
          <span class="toggle-track-icon moon-mark">🌙</span>
          <span class="toggle-thumb">
            <span class="thumb-icon">☀</span>
          </span>
        </button>
      </div>
    </div>

    <div class="container mobile-appbar">
      <div class="mobile-top">
        <div class="mobile-brand">
          <div class="mobile-logo-text">
            <div class="mobile-store-name">XR Store</div>
            <div class="mobile-store-sub">متجر متنوع للإكسسوارات والأجهزة البسيطة</div>
          </div>
          <div class="logo mobile-logo">XR</div>
        </div>

        <div class="mobile-icons">
          <a class="mobile-icon-btn" href="cart.html" aria-label="السلة">🛒</a>
          <button class="mobile-icon-btn mobile-theme-placeholder" type="button" aria-label="زر وهمي">⚙</button>
          <a class="mobile-icon-btn" href="#articlesSection" aria-label="العروض">٪</a>
          <a class="mobile-icon-btn" href="#productsSection" aria-label="الرئيسية">⌂</a>
        </div>
      </div>

      <div class="mobile-theme-row">
        <button class="theme-toggle" id="themeBtnMobile" aria-label="تغيير الوضع">
          <span class="toggle-track-icon sun-mark">☀</span>
          <span class="toggle-track-icon moon-mark">🌙</span>
          <span class="toggle-thumb">
            <span class="thumb-icon">☀</span>
          </span>
        </button>
      </div>
    </div>
  `;

  const desktopBtn = document.getElementById("themeBtn");
  const mobileBtn = document.getElementById("themeBtnMobile");

  function bindThemeButton(btn) {
    if (!btn) return;
    const thumbIcon = btn.querySelector(".thumb-icon");

    function updateThemeIcon() {
      if (document.body.classList.contains("light")) {
        thumbIcon.textContent = "☀";
      } else {
        thumbIcon.textContent = "🌙";
      }
    }

    updateThemeIcon();

    btn.addEventListener("click", () => {
      xrThemeToggle();
      updateThemeIcon();

      const otherBtn = btn.id === "themeBtn" ? mobileBtn : desktopBtn;
      if (otherBtn) {
        const otherIcon = otherBtn.querySelector(".thumb-icon");
        if (otherIcon) {
          otherIcon.textContent = document.body.classList.contains("light") ? "☀" : "🌙";
        }
      }
    });
  }

  bindThemeButton(desktopBtn);
  bindThemeButton(mobileBtn);
}

function xrRenderFooter() {
  const footer = document.getElementById("siteFooter");
  if (!footer) return;

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

function xrRefreshCartTop(){}

document.addEventListener("DOMContentLoaded", () => {
  xrThemeInit();

  if (!localStorage.getItem("xr_theme")) {
    document.body.classList.add("light");
    localStorage.setItem("xr_theme", "light");
  }

  xrRenderHeader();
  xrRenderFooter();
});
