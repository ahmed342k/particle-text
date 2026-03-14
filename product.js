document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const product = xrFindProduct(id);
  const box = document.getElementById("productPage");
  const similarWrap = document.getElementById("similarProducts");

  if(!product){
    box.innerHTML = `<div class="card page-hero"><h2>المنتج غير موجود</h2><p>هذا الرابط لا يحتوي على منتج صحيح.</p></div>`;
    return;
  }

  function renderMainImage(src){
    document.getElementById("mainProductImage").src = src;
  }

  box.innerHTML = `
    <div class="product-layout">
      <div class="card gallery">
        <div class="gallery-main">
          <img id="mainProductImage" src="${product.images[0]}" alt="${product.name}">
        </div>
        <div class="thumb-row">
          ${product.images.map(img => `
            <button class="thumb" data-thumb="${img}">
              <img src="${img}" alt="${product.name}">
            </button>
          `).join("")}
        </div>
      </div>

      <div class="card product-info">
        <div class="badge">XR Product</div>
        <h2>${product.name}</h2>
        <div class="row mt10">
          <div class="price">$${product.price}</div>
          <div class="rating">${xrStars(product.rating)} <span class="muted">(${product.rating})</span></div>
        </div>

        <p class="muted mt14">${product.desc}</p>

        <div class="info-list">
          <div class="info-chip"><strong>القسم:</strong> ${XR_CATEGORIES.find(c=>c.key===product.category)?.label || "-"}</div>
          <div class="info-chip"><strong>المميزات:</strong> ${product.features.join(" - ")}</div>
          ${product.sizes && product.sizes.length ? `<div class="info-chip"><strong>المقاسات / الأنواع:</strong> <div class="sizes mt10">${product.sizes.map(s=>`<span class="size-chip">${s}</span>`).join("")}</div></div>` : ""}
        </div>

        <button class="primary-btn full-btn mt10" id="addCurrentToCart">أضف للسلة</button>
      </div>
    </div>
  `;

  document.querySelectorAll("[data-thumb]").forEach(btn=>{
    btn.onclick = ()=> renderMainImage(btn.dataset.thumb);
  });

  document.getElementById("addCurrentToCart").onclick = () => {
    xrAddToCart(product.id);
    xrRefreshCartTop();
    xrShowNotice("تمت إضافة المنتج إلى السلة");
  };

  const similar = xrGetProducts().filter(p => p.category === product.category && p.id !== product.id).slice(0,4);

  if(!similar.length){
    similarWrap.innerHTML = `<div class="empty">لا توجد منتجات مشابهة حالياً</div>`;
    return;
  }

  similarWrap.innerHTML = similar.map(p => `
    <article class="card product-card">
      <div class="product-image"><img src="${p.images[0]}" alt="${p.name}"></div>
      <div class="product-content">
        <div class="row">
          <h4 class="product-title">${p.name}</h4>
          <span class="price">$${p.price}</span>
        </div>
        <div class="rating">${xrStars(p.rating)}</div>
        <p class="product-desc">${p.desc}</p>
        <div class="card-actions">
          <button class="add-btn" data-add="${p.id}">أضف للسلة</button>
          <button class="details-btn" data-open="${p.id}">التفاصيل</button>
        </div>
      </div>
    </article>
  `).join("");

  document.querySelectorAll("[data-add]").forEach(btn => {
    btn.onclick = () => {
      xrAddToCart(btn.dataset.add);
      xrRefreshCartTop();
      xrShowNotice("تمت إضافة المنتج إلى السلة");
    };
  });

  document.querySelectorAll("[data-open]").forEach(btn => {
    btn.onclick = () => {
      location.href = `product.html?id=${btn.dataset.open}`;
    };
  });
});
