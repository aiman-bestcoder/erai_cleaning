document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("order-form");

  form.querySelectorAll("input, select, textarea").forEach(el => {
    el.addEventListener("change", updateVirtualCheck);
    el.addEventListener("input", updateVirtualCheck);
  });

  form.addEventListener("click", () => {
    setTimeout(updateVirtualCheck, 10);
  });

  updateVirtualCheck();
});

function getFormData() {
  const form = document.getElementById("order-form");
  const formData = new FormData(form);
  return new URLSearchParams(formData).toString();
}

function updateVirtualCheck() {
  const query = getFormData();
  fetch(`${ajaxCalculatePriceUrl}?${query}`)
    .then(res => res.json())
    .then(data => {
      const checkDetails = document.getElementById("check-details");
      checkDetails.innerHTML = "";

      const breakdown = data.breakdown;
      const total = data.total;

      const areaItem = breakdown.find(x => x.label.startsWith("Area ("));
      const roomsItem = breakdown.find(x => x.label.includes("Room"));
      const bathroomsItem = breakdown.find(x => x.label.includes("Bathroom"));
      const serviceTypeItem = breakdown.find(x => x.label.startsWith("Service Type"));

      const extras = breakdown.filter(x =>
        x.label &&
        !x.label.startsWith("Area") &&
        !x.label.includes("Room") &&
        !x.label.includes("Bathroom") &&
        !x.label.startsWith("Service Type") &&
        !x.label.startsWith("Frequency Discount:") &&
        !x.label.includes("Carpet Cleaning") &&
        x.label !== "Discount Amount"
      );

      const carpet = breakdown.find(x => x.label.toLowerCase().includes("carpet cleaning"));

      const frequencyItem = breakdown.find(x => x.label.startsWith("Frequency Discount:"));
      let discountPercent = 0;
      if (frequencyItem && typeof frequencyItem.label === "string") {
        const match = frequencyItem.label.match(/-(\d+)%/);
        if (match) discountPercent = parseInt(match[1]);
      }

      const discountAmountItem = breakdown.find(x => x.label === "Discount Amount");
      const discountAmount = discountAmountItem
        ? parseFloat(discountAmountItem.price.replace(/[^0-9.-]+/g, ""))
        : 0;

      const basePrice = (areaItem?.price || 0) + (roomsItem?.price || 0) + (bathroomsItem?.price || 0);

      let serviceCoeff = 1;
      if (serviceTypeItem && typeof serviceTypeItem.price === "string" && serviceTypeItem.price.startsWith("x")) {
        serviceCoeff = parseFloat(serviceTypeItem.price.substring(1));
      }
      const cleaningServiceTotal = basePrice * serviceCoeff;

      const extrasTotal = extras.reduce((sum, item) => sum + item.price, 0);
      const carpetTotal = carpet ? carpet.price : 0;

      const subtotal = cleaningServiceTotal + extrasTotal + carpetTotal;

      let html = "";

      const roomType = document.querySelector('[name="room_type"]')?.selectedOptions[0]?.textContent || "";
      const serviceType = document.querySelector('[name="service_type"]')?.selectedOptions[0]?.textContent || "";
      if (roomType && serviceType) {
        html += `<li style="font-weight: bold; margin-bottom: 0.5em; display: flex; justify-content: space-between;">
          <span>${roomType} — ${serviceType}</span><span></span>
        </li>`;
      }

      html += `<li style="font-weight: bold; font-size: 1.05rem; display: flex; justify-content: space-between;">
        <span>Cleaning Service</span><span>$${cleaningServiceTotal.toFixed(2)}</span>
      </li>`;

      if (areaItem) {
        html += `<li style="padding-left: 1em; display: flex; justify-content: space-between;">
          <span>${areaItem.label}</span>
        </li>`;
      }
      if (roomsItem) {
        html += `<li style="padding-left: 1em; display: flex; justify-content: space-between;">
          <span>${roomsItem.label}</span>
        </li>`;
      }
      if (bathroomsItem) {
        html += `<li style="padding-left: 1em; display: flex; justify-content: space-between;">
          <span>${bathroomsItem.label}</span>
        </li>`;
      }

      if (extras.length > 0) {
        html += `<li style="font-weight: bold; font-size: 1.05rem; margin-top: 0.5em;">Extras</li>`;
        extras.forEach(item => {
          html += `<li style="padding-left: 1em; display: flex; justify-content: space-between;">
            <span>${item.label}</span><span>$${item.price.toFixed(2)}</span>
          </li>`;
        });
      }

      if (carpet) {
        const match = carpet.label.match(/\((\d+)\s*sqft\)/i);
        const carpetArea = match ? match[1] : "";
        html += `<li style="font-weight: bold; font-size: 1.05rem; margin-top: 0.5em;">Carpet Cleaning</li>`;
        if (carpetArea) {
          html += `<li style="padding-left: 1em; display: flex; justify-content: space-between;">
            <span>Area</span><span>${carpetArea} sqft</span>
          </li>`;
        }
        html += `<li style="padding-left: 1em; display: flex; justify-content: space-between;">
          <span>Price</span><span>$${carpetTotal.toFixed(2)}</span>
        </li>`;
      }

      if (discountPercent > 0) {
        html += `<li style="display: flex; justify-content: space-between; font-weight: bold; margin-top: 0.5em;">
          <span>Frequency Discount</span><span>- ${discountPercent}%</span>
        </li>`;
        html += `<li style="padding-left: 1em; flex; justify-content: space-between;">
          <span>Discount Amount</span><span>${discountAmount.toFixed(2)}</span>
        </li>`;
      }

      const name = document.querySelector('[name="name"]')?.value;
      const date = document.querySelector('[name="date"]')?.value;
      const time = document.querySelector('[name="time"]')?.value;
      const message = document.querySelector('[name="message"]')?.value?.slice(0, 40);

      if (name || date || time || message) {
        html += `<li style="margin-top: 0.5em; font-weight: bold;">Client Info</li>`;
      }
      if (name) {
        html += `<li style="padding-left: 1em; display: flex; justify-content: space-between;">
          <span>Name</span><span>${name}</span>
        </li>`;
      }
      if (date) {
        html += `<li style="padding-left: 1em; display: flex; justify-content: space-between;">
          <span>Date</span><span>${date}</span>
        </li>`;
      }
      if (time) {
        html += `<li style="padding-left: 1em; display: flex; justify-content: space-between;">
          <span>Time</span><span>${time}</span>
        </li>`;
      }
      if (message) {
        html += `<li style="padding-left: 1em; display: flex; justify-content: space-between;">
          <span>Note</span><span>${message}</span>
        </li>`;
      }

      checkDetails.innerHTML = html;
      document.getElementById("check-total-price").textContent = `$${total.toFixed(2)}`;
    })
    .catch(() => {
      document.getElementById("check-details").innerHTML = "";
      document.getElementById("check-total-price").textContent = "$0.00";
    });
}
