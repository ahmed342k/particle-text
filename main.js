function xrRenderHeader() {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  header.innerHTML = `
    <div class="container site-header">
      <div class="header-top">
        <div class="header-logo-box">
          <div class="logo">XR</div>
        </div>

        <div class="header-title-box">
          <h1>XR Store</h1>
          <p>متجر متنوع للإكسسوارات والأجهزة البسيطة</p>
        </div>

        <div class="header-theme-box">
          <button class="theme-toggle" id="themeBtn" aria-label="تغيير الوضع">
            <span class="toggle-track-icon sun-mark">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="4"></circle>
                <line x1="12" y1="1.5" x2="12" y2="5"></line>
                <line x1="12" y1="19" x2="12" y2="22.5"></line>
                <line x1="1.5" y1="12" x2="5" y2="12"></line>
                <line x1="19" y1="12" x2="22.5" y2="12"></line>
                <line x1="4.2" y1="4.2" x2="6.8" y2="6.8"></line>
                <line x1="17.2" y1="17.2" x2="19.8" y2="19.8"></line>
                <line x1="17.2" y1="6.8" x2="19.8" y2="4.2"></line>
                <line x1="4.2" y1="19.8" x2="6.8" y2="17.2"></line>
              </svg>
            </span>

            <span class="toggle-track-icon moon-mark">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 14.2A8.5 8.5 0 0 1 9.8 4 9 9 0 1 0 20 14.2Z"></path>
              </svg>
            </span>

            <span class="toggle-thumb">
              <span class="thumb-icon thumb-sun">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="4"></circle>
                  <line x1="12" y1="1.5" x2="12" y2="5"></line>
                  <line x1="12" y1="19" x2="12" y2="22.5"></line>
                  <line x1="1.5" y1="12" x2="5" y2="12"></line>
                  <line x1="19" y1="12" x2="22.5" y2="12"></line>
                  <line x1="4.2" y1="4.2" x2="6.8" y2="6.8"></line>
                  <line x1="17.2" y1="17.2" x2="19.8" y2="19.8"></line>
                  <line x1="17.2" y1="6.8" x2="19.8" y2="4.2"></line>
                  <line x1="4.2" y1="19.8" x2="6.8" y2="17.2"></line>
                </svg>
              </span>

              <span class="thumb-icon thumb-moon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 14.2A8.5 8.5 0 0 1 9.8 4 9 9 0 1 0 20 14.2Z"></path>
                </svg>
              </span>
            </span>
          </button>
        </div>
      </div>

      <nav class="header-nav">
        <a class="nav-link" href="#productsSection">المنتجات</a>
        <a class="nav-link" href="#offersSection">العروض</a>
        <a class="nav-link" href="#aboutStoreSection">تعريف المتجر</a>
        <a class="nav-link" href="#articlesSection">المقالات</a>
        <a class="nav-link" href="cart.html">السلة</a>
      </nav>
    </div>
  `;

  const btn = document.getElementById("themeBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      xrThemeToggle();
    });
  }
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
