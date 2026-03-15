document.addEventListener("DOMContentLoaded", () => {
  xrRequireAdmin();

  const addForm = document.getElementById("addProductForm");
  const logoutBtn = document.getElementById("logoutBtn");

  const tabs = [...document.querySelectorAll(".admin-tab")];
  const panels = {
    add: document.getElementById("panel-add"),
    manage: document.getElementById("panel-manage"),
    reservations: document.getElementById("panel-reservations"),
    orders: document.getElementById("panel-orders"),
    offers: document.getElementById("panel-offers")
  };

  const manageProductsWrap = document.getElementById("manageProductsWrap");
  const reservationsWrap = document.getElementById("reservationsWrap");
  const ordersWrap = document.getElementById("ordersWrap");
  const offersWrap = document.getElementById("offersWrap");

  const statProducts = document.getElementById("statProducts");
  const statOrders = document.getElementById("statOrders");
  const statReservations = document.getElementById("statReservations");
  const statOffers = document.getElementById("statOffers");

  function switchTab(name){
    tabs.forEach(tab => {
      tab.classList.toggle("active", tab.dataset.tab === name);
    });

    Object.keys(panels).forEach(key => {
      panels[key].classList.toggle("active", key === name);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
  });

  function updateStats(){
    const products = xrGetProducts();
    const orders = xrGetOrders();
    const reservations = xrGetReservations();

    statProducts.textContent = products.length;
    statOrders.textContent = orders.length;
    statReservations.textContent = reservations.length;
    statOffers.textContent = products.filter(p => p.isOnSale && p.oldPrice && p.oldPrice > p.price).length;
  }

  function renderManageProducts(){
    const products = xrGetProducts();

    if(!products.length){
      manageProductsWrap.innerHTML = `<div class="admin-empty">لا توجد سلع حالياً</div>`;
      return;
    }

    manageProductsWrap.innerHTML = products.map(product => `
      <div class="mini-product">
        <div class="admin-line">
          <h4>${product.name}</h4>
          <span class="stock-badge">${product.stock > 0 ? `المتوفر: ${product.stock}` : "نفدت الكمية"}</span>
        </div>

        <p>${product.desc}</p>

        <div class="admin-two">
          <input class="admin-input" id="edit_price_${product.id}" type="number" step="0.1" value="${product.price}" placeholder="السعر" />
          <input class="admin-input" id="edit_stock_${product.id}" type="number" min="0" value="${product.stock}" placeholder="الكمية" />
        </div>

        <div class="mt10">
          <textarea class="admin-input" id="edit_desc_${product.id}" rows="3" placeholder="الوصف">${product.desc}</textarea>
        </div>

        <div class="admin-actions">
          <button class="save-btn" data-save="${product.id}">حفظ التعديلات</button>
          <button class="remove-btn" data-delete="${product.id}">حذف السلعة</button>
        </div>
      </div>
    `).join("");

    document.querySelectorAll("[data-save]").forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.save;
        const products = xrGetProducts();
        const item = products.find(p => p.id === id);
        if(!item) return;

        const newPrice = parseFloat(document.getElementById(`edit_price_${id}`).value || "0");
        const newStock = parseInt(document.getElementById(`edit_stock_${id}`).value || "0", 10);
        const newDesc = document.getElementById(`edit_desc_${id}`).value.trim();

        if(newPrice <= 0){
          xrShowNotice("السعر غير صحيح");
          return;
        }

        item.price = newPrice;
        item.stock = Math.max(0, isNaN(newStock) ? 0 : newStock);
        item.desc = newDesc || item.desc;

        if(item.oldPrice && item.oldPrice <= item.price){
          item.oldPrice = null;
          item.isOnSale = false;
        }

        xrSaveProducts(products);
        renderAllAdmin();
        xrShowNotice("تم حفظ التعديلات");
      };
    });

    document.querySelectorAll("[data-delete]").forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.delete;
        const products = xrGetProducts().filter(p => p.id !== id);
        xrSaveProducts(products);
        renderAllAdmin();
        xrShowNotice("تم حذف السلعة");
      };
    });
  }

  function renderReservations(){
    const items = xrGetReservations();

    if(!items.length){
      reservationsWrap.innerHTML = `<div class="admin-empty">لا توجد حجوزات حالياً</div>`;
      return;
    }

    reservationsWrap.innerHTML = items.slice().reverse().map(item => `
      <div class="order-card">
        <div class="admin-line">
          <h4>${item.customer_name || "بدون اسم"}</h4>
          <span class="status-badge">حجز عند التوفر</span>
        </div>
        <p><strong>الرقم:</strong> ${item.phone || "-"}</p>
        <p><strong>العنوان:</strong> ${item.address || "لم يكتبه الزبون"}</p>
        <p><strong>التاريخ:</strong> ${item.created_at || "-"}</p>
        <div class="order-items">
          ${(item.items || []).map(x => `<p>• ${x.name} × ${x.qty}</p>`).join("")}
        </div>
      </div>
    `).join("");
  }

  function renderOrders(){
    const items = xrGetOrders();

    if(!items.length){
      ordersWrap.innerHTML = `<div class="admin-empty">لا توجد طلبات حالياً</div>`;
      return;
    }

    ordersWrap.innerHTML = items.slice().reverse().map(item => `
      <div class="order-card">
        <div class="admin-line">
          <h4>${item.customer_name || "بدون اسم"}</h4>
          <span class="status-badge">طلب شراء</span>
        </div>
        <p><strong>الرقم:</strong> ${item.phone || "-"}</p>
        <p><strong>العنوان:</strong> ${item.address || "لم يكتبه الزبون"}</p>
        <p><strong>التاريخ:</strong> ${item.created_at || "-"}</p>
        <div class="order-items">
          ${(item.items || []).map(x => `<p>• ${x.name} × ${x.qty}</p>`).join("")}
        </div>
      </div>
    `).join("");
  }

  function renderOffers(){
    const products = xrGetProducts();

    if(!products.length){
      offersWrap.innerHTML = `<div class="admin-empty">لا توجد سلع حالياً</div>`;
      return;
    }

    offersWrap.innerHTML = products.map(product => `
      <div class="mini-product">
        <div class="admin-line">
          <h4>${product.name}</h4>
          ${product.isOnSale && product.oldPrice && product.oldPrice > product.price
            ? `<span class="sale-badge">خصم ${xrDiscountPercent(product.oldPrice, product.price)}%</span>`
            : `<span class="stock-badge">بدون عرض</span>`
          }
        </div>

        <p>
          السعر الحالي: <strong>${xrCurrency(product.price)}</strong>
          ${product.oldPrice ? `<span class="old-price">${xrCurrency(product.oldPrice)}</span>` : ""}
        </p>

        <div class="admin-two">
          <input class="admin-input" id="offer_old_${product.id}" type="number" step="0.1" value="${product.oldPrice || ""}" placeholder="السعر القديم" />
          <input class="admin-input" id="offer_new_${product.id}" type="number" step="0.1" value="${product.price}" placeholder="السعر الجديد" />
        </div>

        <div class="admin-actions">
          <button class="save-btn" data-offer-save="${product.id}">حفظ العرض</button>
          <button class="edit-btn" data-offer-remove="${product.id}">إلغاء العرض</button>
        </div>
      </div>
    `).join("");

    document.querySelectorAll("[data-offer-save]").forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.offerSave || btn.dataset.offer_save || btn.getAttribute("data-offer-save");
        const products = xrGetProducts();
        const item = products.find(p => p.id === id);
        if(!item) return;

        const oldPrice = parseFloat(document.getElementById(`offer_old_${id}`).value || "0");
        const newPrice = parseFloat(document.getElementById(`offer_new_${id}`).value || "0");

        if(oldPrice <= 0 || newPrice <= 0){
          xrShowNotice("أدخل الأسعار بشكل صحيح");
          return;
        }

        if(newPrice >= oldPrice){
          xrShowNotice("السعر الجديد يجب أن يكون أقل من السعر القديم");
          return;
        }

        item.oldPrice = oldPrice;
        item.price = newPrice;
        item.isOnSale = true;

        xrSaveProducts(products);
        renderAllAdmin();
        xrShowNotice("تم حفظ العرض");
      };
    });

    document.querySelectorAll("[data-offer-remove]").forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.offerRemove || btn.dataset.offer_remove || btn.getAttribute("data-offer-remove");
        const products = xrGetProducts();
        const item = products.find(p => p.id === id);
        if(!item) return;

        item.oldPrice = null;
        item.isOnSale = false;

        xrSaveProducts(products);
        renderAllAdmin();
        xrShowNotice("تم إلغاء العرض");
      };
    });
  }

  function renderAllAdmin(){
    updateStats();
    renderManageProducts();
    renderReservations();
    renderOrders();
    renderOffers();
  }

  addForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const category = document.getElementById("category").value;
    const desc = document.getElementById("desc").value.trim();
    const price = parseFloat(document.getElementById("price").value || "0");
    const stock = parseInt(document.getElementById("stock").value || "0", 10);
    const image = document.getElementById("image").value.trim();
    const features = document.getElementById("features").value.trim().split(",").map(x => x.trim()).filter(Boolean);
    const sizes = document.getElementById("sizes").value.trim().split(",").map(x => x.trim()).filter(Boolean);

    if(!name || !desc || !image || price <= 0){
      xrShowNotice("املأ الحقول المطلوبة بشكل صحيح");
      return;
    }

    const products = xrGetProducts();
    products.unshift({
      id: "p" + Date.now(),
      category,
      name,
      desc,
      price,
      oldPrice: null,
      isOnSale: false,
      rating: 4,
      stock: Math.max(0, isNaN(stock) ? 0 : stock),
      sizes,
      features: features.length ? features : ["جودة جيدة", "تصميم أنيق"],
      images: [image, image, image, image]
    });

    xrSaveProducts(products);
    addForm.reset();
    renderAllAdmin();
    switchTab("manage");
    xrShowNotice("تمت إضافة السلعة");
  });

  logoutBtn.onclick = () => {
    localStorage.removeItem("xr_admin_logged");
    location.href = "login.html";
  };

  renderAllAdmin();
});
