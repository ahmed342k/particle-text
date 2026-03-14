document.addEventListener("DOMContentLoaded", () => {
  const productsWrap = document.getElementById("productsWrap");
  const categoriesWrap = document.getElementById("categoriesWrap");
  const searchInput = document.getElementById("searchInput");
  const minPrice = document.getElementById("minPrice");
  const maxPrice = document.getElementById("maxPrice");
  const minRating = document.getElementById("minRating");
  const sortBy = document.getElementById("sortBy");

  let currentCategory = "all";

  function renderCategories(){
    categoriesWrap.innerHTML = "";
    XR_CATEGORIES.forEach(cat => {
      const btn = document.createElement("button");
      btn.className = "cat-btn" + (currentCategory === cat.key ? " active" : "");
      btn.textContent = cat.label;
      btn.onclick = () => {
        currentCategory = cat.key;
        renderCategories();
        renderProducts();
      };
      categoriesWrap.appendChild(btn);
    });
  }

  function productCard(product){
    return `
      <article class="card product-card">
        <div class="product-image">
          <img src="${product.images[0]}" alt="${product.name}">
        </div>
        <div class="product-content">
          <div class="row">
            <h4 class="product-title">${product.name}</h4>
            <span class="price">$${product.price}</span>
          </div>
          <div class="rating">${xrStars(product.rating)} <span class="muted">(${product.rating})</span></div>
          <p class="product-desc">${product.desc}</p>
          <div class="card-actions">
            <button class="add-btn" data-add="${product.id}">أضف للسلة</button>
            <button class="details-btn" data-open="${product.id}">التفاصيل</button>
          </div>
        </div>
      </article>
    `;
  }

  function renderProducts(){
    let items = xrGetProducts();

    const keyword = searchInput.value.trim().toLowerCase();
    const min = parseFloat(minPrice.value || "0");
    const max = parseFloat(maxPrice.value || "999999");
    const rating = parseFloat(minRating.value || "0");

    items = items.filter(p => {
      const matchCategory = currentCategory === "all" || p.category === currentCategory;
      const matchText = p.name.toLowerCase().includes(keyword) || p.desc.toLowerCase().includes(keyword);
      const matchPrice = p.price >= min && p.price <= max;
      const matchRating = p.rating >= rating;
      return matchCategory && matchText && matchPrice && matchRating;
    });

    if(sortBy.value === "price-asc") items.sort((a,b)=>a.price-b.price);
    if(sortBy.value === "price-desc") items.sort((a,b)=>b.price-a.price);
    if(sortBy.value === "rating-desc") items.sort((a,b)=>b.rating-a.rating);
    if(sortBy.value === "name-asc") items.sort((a,b)=>a.name.localeCompare(b.name));

    if(!items.length){
      productsWrap.innerHTML = `<div class="empty">لا توجد منتجات مطابقة حالياً</div>`;
      return;
    }

    productsWrap.innerHTML = items.map(productCard).join("");

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
  }

  [searchInput,minPrice,maxPrice,minRating,sortBy].forEach(el => {
    el.addEventListener("input", renderProducts);
    el.addEventListener("change", renderProducts);
  });

  renderCategories();
  renderProducts();
});
