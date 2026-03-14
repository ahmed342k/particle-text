const XR_DEFAULT_PRODUCTS = [
  {
    id: "p1",
    category: "coolers",
    name: "مبرد هاتف XR Ice Pro",
    desc: "مبرد عملي وخفيف لتقليل حرارة الهاتف أثناء اللعب والاستخدام الطويل.",
    price: 18,
    rating: 4.7,
    sizes: [],
    features: ["تبريد سريع", "تركيب سهل", "صوت منخفض"],
    images: [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "p2",
    category: "cases",
    name: "كفر شفاف مقاوم XR",
    desc: "كفر أنيق شفاف يحمي الهاتف من الصدمات والخدوش اليومية.",
    price: 9,
    rating: 4.4,
    sizes: ["iPhone", "Samsung", "Xiaomi"],
    features: ["شفاف", "مقاوم للصدمات", "خفيف"],
    images: [
      "https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583573636246-18cb2246697d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "p3",
    category: "chargers",
    name: "شاحن سريع XR 25W",
    desc: "شاحن سريع مناسب للاستخدام اليومي مع حجم صغير وسرعة ممتازة.",
    price: 14,
    rating: 4.8,
    sizes: [],
    features: ["شحن سريع", "حجم صغير", "حماية من الحرارة"],
    images: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1615526675051-83a5f7a6c568?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "p4",
    category: "cables",
    name: "كيبل XR Type-C",
    desc: "كيبل قوي ومرن للشحن ونقل البيانات بسرعة وثبات.",
    price: 7,
    rating: 4.3,
    sizes: ["1m", "2m"],
    features: ["سريع", "قوي", "عمر طويل"],
    images: [
      "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "p5",
    category: "holders",
    name: "حامل هاتف للسيارة XR",
    desc: "حامل عملي وثابت للسيارة مع تركيب سريع وتحكم مريح.",
    price: 11,
    rating: 4.5,
    sizes: [],
    features: ["ثبات قوي", "سهل التركيب", "دوران مرن"],
    images: [
      "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "p6",
    category: "headphones",
    name: "سماعة XR Lite",
    desc: "سماعة بسيطة بجودة جيدة للمكالمات والاستماع اليومي.",
    price: 16,
    rating: 4.2,
    sizes: [],
    features: ["صوت واضح", "وزن خفيف", "شكل أنيق"],
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=900&q=80"
    ]
  }
];

const XR_CATEGORIES = [
  { key: "all", label: "الكل" },
  { key: "coolers", label: "مبردات" },
  { key: "cases", label: "كفرات" },
  { key: "chargers", label: "شواحن" },
  { key: "cables", label: "كيابل" },
  { key: "holders", label: "حوامل" },
  { key: "headphones", label: "سماعات" }
];

function xrGetProducts(){
  const saved = localStorage.getItem("xr_products");
  if(saved){
    try{ return JSON.parse(saved); }catch(e){}
  }
  localStorage.setItem("xr_products", JSON.stringify(XR_DEFAULT_PRODUCTS));
  return [...XR_DEFAULT_PRODUCTS];
}

function xrSaveProducts(products){
  localStorage.setItem("xr_products", JSON.stringify(products));
}

function xrGetCart(){
  const saved = localStorage.getItem("xr_cart");
  if(saved){
    try{ return JSON.parse(saved); }catch(e){}
  }
  return [];
}

function xrSaveCart(cart){
  localStorage.setItem("xr_cart", JSON.stringify(cart));
}

function xrAddToCart(id){
  const cart = xrGetCart();
  const found = cart.find(i => i.id === id);
  if(found) found.qty += 1;
  else cart.push({id, qty:1});
  xrSaveCart(cart);
}

function xrCartCount(){
  return xrGetCart().reduce((a,b)=>a+b.qty,0);
}

function xrFindProduct(id){
  return xrGetProducts().find(p => p.id === id);
}

function xrStars(value){
  const full = Math.round(value);
  return "★".repeat(full) + "☆".repeat(5-full);
}

function xrShowNotice(text){
  let notice = document.getElementById("xrNotice");
  if(!notice){
    notice = document.createElement("div");
    notice.id = "xrNotice";
    notice.className = "notice";
    document.body.appendChild(notice);
  }
  notice.textContent = text;
  notice.classList.add("show");
  clearTimeout(window.xrNoticeTimer);
  window.xrNoticeTimer = setTimeout(()=>notice.classList.remove("show"), 2200);
}

function xrThemeInit(){
  const mode = localStorage.getItem("xr_theme") || "dark";
  if(mode === "light") document.body.classList.add("light");
}

function xrThemeToggle(){
  document.body.classList.toggle("light");
  localStorage.setItem("xr_theme", document.body.classList.contains("light") ? "light" : "dark");
}

function xrRequireAdmin(){
  const logged = localStorage.getItem("xr_admin_logged");
  if(logged !== "yes"){
    location.href = "login.html";
  }
}
