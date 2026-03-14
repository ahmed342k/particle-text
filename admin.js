document.addEventListener("DOMContentLoaded", () => {
  xrRequireAdmin();

  const form = document.getElementById("adminForm");
  const productsTable = document.getElementById("productsTableWrap");
  const logoutBtn = document.getElementById("logoutBtn");

  function renderAdminProducts(){
    const products = xrGetProducts();
    productsTable.innerHTML = `
      <div class="table-wrap card">
        <table class="table">
          <thead>
            <tr>
              <th>الاسم</th>
              <th>القسم</th>
              <th>السعر</th>
              <th>التقييم</th>
              <th>تعديل السعر</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            ${products.map(p => `
              <tr>
                <td>${p.name}</td>
                <td>${XR_CATEGORIES.find(c=>c.key===p.category)?.label || p.category}</td>
                <td>$${p.price}</td>
                <td>${p.rating}</td>
                <td>
                  <div class="qty-wrap">
                    <input class="input" style="padding:8px 10px;max-width:90px" type="number" step="0.1" value="${p.price}" id="price_${p.id}">
                    <button class="small-btn" data-price="${p.id}">حفظ</button>
                  </div>
                </td>
                <td><button class="small-btn" data-delete="${p.id}">حذف</button></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;

    document.querySelectorAll("[data-delete]").forEach(btn => {
      btn.onclick = () => {
        const products = xrGetProducts().filter(p => p.id !== btn.dataset.delete);
        xrSaveProducts(products);
        renderAdminProducts();
        xrShowNotice("تم حذف المنتج");
      };
    });

    document.querySelectorAll("[data-price]").forEach(btn => {
      btn.onclick = () => {
        const products = xrGetProducts();
        const item = products.find(p => p.id === btn.dataset.price);
        const newPrice = parseFloat(document.getElementById(`price_${item.id}`).value || "0");
        if(item && newPrice > 0){
          item.price = newPrice;
          xrSaveProducts(products);
          renderAdminProducts();
          xrShowNotice("تم تعديل السعر");
        }
      };
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const category = document.getElementById("category").value;
    const desc = document.getElementById("desc").value.trim();
    const price = parseFloat(document.getElementById("price").value || "0");
    const rating = parseFloat(document.getElementById("rating").value || "0");
    const image = document.getElementById("image").value.trim();
    const features = document.getElementById("features").value.trim().split(",").map(x=>x.trim()).filter(Boolean);
    const sizes = document.getElementById("sizes").value.trim().split(",").map(x=>x.trim()).filter(Boolean);

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
      rating: rating || 4,
      sizes,
      features: features.length ? features : ["جودة جيدة", "تصميم أنيق"],
      images: [image, image, image, image]
    });

    xrSaveProducts(products);
    form.reset();
    renderAdminProducts();
    xrShowNotice("تمت إضافة المنتج");
  });

  logoutBtn.onclick = () => {
    localStorage.removeItem("xr_admin_logged");
    location.href = "login.html";
  };

  renderAdminProducts();
});
