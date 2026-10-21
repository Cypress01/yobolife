const PRODUCT_PRICE = 43500;
const WHATSAPP_NUMBER = "REPLACE_WITH_SELLER_WHATSAPP_NUMBER";
const images = [
  ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yobolife3605_2%20%281%29-atutaTsxbIzgkrpXlWOQM9CgYF5634.png", "Complete YOBOLIFE LM-3605 kit"],
  ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yobolife3605_10-9dxf9coa5l6gez4SqMzQDTniMpSmJZ.png", "6V 4W solar panel"],
  ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yobolife3605_19-SQXxMmg4voansACadnJPmb53epZEgv.png", "Three LED bulbs"],
  ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yobolife3605_6-ajjC7IIImX3ggA9KA8jAN2FWMHpZzX.png", "LM-3605 front"],
  ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yobolife3605_5-YmyGH5FSZZKyXOATdGAJM3SZ6Hqzfy.png", "LM-3605 rear ports"],
  ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yobolife3605_4-Rt8HThZC6xsp4Hne9YMXfLcJJvbLaK.png", "LM-3605 flashlight"],
  ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yobolife-Solar-Lighting-Kit-with-3LED-Bulbs-USB-Mobile-Phone-Charge-and-LED-Lighting-3-lVqNDfPmgCBDplLVC2NBvyLfpCuMOz.avif", "LM-3605 kit with bulbs"],
  ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yobolife-Solar-Lighting-Kit-with-3LED-Bulbs-USB-Mobile-Phone-Charge-and-LED-Lighting-1-j3rAhv0fP30dkKvf5TkoNv2rbH0fii.avif", "LM-3605 USB phone charging"],
  ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yobolife-Solar-Lighting-Kit-with-3LED-Bulbs-USB-Mobile-Phone-Charge-and-LED-Lighting-5-vaRybZfPjXcPl9fcilkiuHTsm2tZR1.avif", "LM-3605 rear panel"]
];
let currentImage = 0;
const mainImage = document.querySelector("#main-image");
const thumbnails = document.querySelector(".thumbnails");
function showImage(index) {
  currentImage = (index + images.length) % images.length;
  mainImage.src = images[currentImage][0];
  mainImage.alt = images[currentImage][1];
  document.querySelectorAll(".thumb").forEach((thumb, i) => thumb.classList.toggle("active", i === currentImage));
}
images.forEach((image, index) => {
  const button = document.createElement("button");
  button.className = "thumb";
  button.type = "button";
  button.setAttribute("aria-label", `View ${image[1]}`);
  button.innerHTML = `<img src="${image[0]}" alt="">`;
  button.addEventListener("click", () => showImage(index));
  thumbnails.appendChild(button);
});
document.querySelector(".prev").addEventListener("click", () => showImage(currentImage - 1));
document.querySelector(".next").addEventListener("click", () => showImage(currentImage + 1));
mainImage.addEventListener("click", () => window.open(mainImage.src, "_blank", "noopener,noreferrer"));
showImage(0);
let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;
mainImage.addEventListener("touchstart", (event) => {
  const touch = event.changedTouches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
  touchStartTime = Date.now();
}, { passive: true });
mainImage.addEventListener("touchend", (event) => {
  const touch = event.changedTouches[0];
  const deltaX = touch.clientX - touchStartX;
  const deltaY = touch.clientY - touchStartY;
  const elapsed = Date.now() - touchStartTime;
  if (elapsed < 700 && Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
    showImage(currentImage + (deltaX < 0 ? 1 : -1));
  }
}, { passive: true });
let autoplayTimer = window.setInterval(() => showImage(currentImage + 1), 4500);
const gallery = document.querySelector(".gallery");
gallery.addEventListener("mouseenter", () => window.clearInterval(autoplayTimer));
gallery.addEventListener("mouseleave", () => { autoplayTimer = window.setInterval(() => showImage(currentImage + 1), 4500); });
gallery.addEventListener("touchstart", () => window.clearInterval(autoplayTimer), { passive: true });
gallery.addEventListener("touchend", () => { autoplayTimer = window.setInterval(() => showImage(currentImage + 1), 4500); }, { passive: true });

document.querySelectorAll('a[href="#order"]').forEach((link) => link.addEventListener("click", () => document.querySelector("#order")?.scrollIntoView({ behavior: "smooth" })));
const quantity = document.querySelector("#quantity");
const summaryQuantity = document.querySelector("#summary-quantity");
const subtotal = document.querySelector("#subtotal");
function formatNaira(value) { return `₦${value.toLocaleString("en-NG")}`; }
function updateTotal() {
  const count = Math.max(1, Number.parseInt(quantity.value, 10) || 1);
  summaryQuantity.textContent = quantity.value ? count : 1;
  subtotal.textContent = formatNaira(PRODUCT_PRICE * (quantity.value ? count : 1));
}
quantity.addEventListener("input", updateTotal);
updateTotal();
function openWhatsApp(message) {
  if (WHATSAPP_NUMBER === "REPLACE_WITH_SELLER_WHATSAPP_NUMBER") {
    alert("Please replace WHATSAPP_NUMBER in script.js with the seller's WhatsApp number before publishing.");
    return;
  }
  window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}
document.querySelectorAll("[data-whatsapp]").forEach((button) => button.addEventListener("click", (event) => {
  event.preventDefault();
  openWhatsApp("Hello, I'm interested in ordering the YOBOLIFE LM-3605 Solar Lighting Kit for ₦43,500. Please provide more information.");
}));
const form = document.querySelector("#order-form");
const formMessage = document.querySelector("#form-message");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    formMessage.textContent = "Please complete all required fields before submitting.";
    formMessage.className = "form-message error";
    form.reportValidity();
    return;
  }
  formMessage.textContent = "Your details are valid. Connect this form to an order endpoint before accepting live orders.";
  formMessage.className = "form-message success";
});
document.querySelectorAll(".faq details").forEach((detail) => {
  detail.addEventListener("click", (event) => {
    if (!detail.open) return;
    event.preventDefault();
    detail.classList.add("faq-closing");
    window.setTimeout(() => {
      detail.open = false;
      detail.classList.remove("faq-closing");
    }, 350);
  });
});

document.querySelector("form .outline").addEventListener("click", () => {
  const data = new FormData(form);
  const name = data.get("name") || "there";
  const count = data.get("quantity") || 1;
  openWhatsApp(`Hello, I'm ${name}. I'd like to order ${count} YOBOLIFE LM-3605 Solar Lighting Kit(s) at ₦43,500 each. My delivery location is ${data.get("city") || "to be confirmed"}. Please confirm delivery charges.`);
});
