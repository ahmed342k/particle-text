document.addEventListener("DOMContentLoaded", () => {
  const tableWrap = document.getElementById("cartTableWrap");
  const totalPrice = document.getElementById("totalPrice");

  function renderCart(){
    const cart = xrGetCart();
    const products = xrGetProducts();

    if(!cart.length){
      tableWrap.innerHTML = `<div class="empty">السلة فارغة حالياً</div>`;
      totalPrice.textContent = "$0";
      xrRefreshCartTop();
      return;
    }

    let total = 0;

    tableWrap.innerHTML = `
      <div class="table-wrap card">
        <table class="table">
          <thead>
            <tr>
              <th>المنتج</th>
              <th>السعر</th>
              <th>الكمية</th>
              <th>المجموع</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            ${cart.map(item => {
              const p = products.find(x => x.id === item.id);
              if(!p) return "";
              const sum = p.price * item.qty;
              total += sum;
              return `
                <tr>
                  <td>${p.name}</td>
                  <td>$${p.price}</td>
                  <td>
                    <div class="qty-wrap">
                      <button class="qty-btn" data-minus="${p.id}">-</button>
                      <strong>${item.qty}</strong>
                      <button class="qty-btn" data-plus="${p.id}">+</button>
                    </div>
                  </td>
                  <td>$${sum}</td>
                  <td><button class="small-btn" data-remove="${p.id}">حذف</button></td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    `;

    totalPrice.textContent = `$${total}`;
    xrRefreshCartTop();

    document.querySelectorAll("[data-plus]").forEach(btn => {
      btn.onclick = () => {
        const cart = xrGetCart();
        const item = cart.find(i => i.id === btn.dataset.plus);
        if(item) item.qty++;
        xrSaveCart(cart);
        renderCart();
      };
    });

    document.querySelectorAll("[data-minus]").forEach(btn => {
      btn.onclick = () => {
        let cart = xrGetCart();
        const item = cart.find(i => i.id === btn.dataset.minus);
        if(item){
          item.qty--;
          if(item.qty <= 0) cart = cart.filter(i => i.id !== btn.dataset.minus);
        }
        xrSaveCart(cart);
        renderCart();
      };
    });

    document.querySelectorAll("[data-remove]").forEach(btn => {
      btn.onclick = () => {
        const cart = xrGetCart().filter(i => i.id !== btn.dataset.remove);
        xrSaveCart(cart);
        renderCart();
      };
    });
  }

  document.getElementById("clearCartBtn").onclick = () => {
    xrSaveCart([]);
    renderCart();
    xrShowNotice("تم تفريغ السلة");
  };

  document.getElementById("checkoutBtn").onclick = () => {
    xrShowNotice("هذه واجهة تجريبية، ويمكن لاحقاً إضافة صفحة طلب حقيقية");
  };

  renderCart();
});
