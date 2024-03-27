$(document).ready(function () {
  $.get(
    `http://makeup-api.herokuapp.com/api/v1/products.json `,
    function (data) {
      const brands = data.map((product) => product.brand);
      const uniqueBrands = [...new Set(brands)];

      const brandlist = document.getElementById("brand");

      uniqueBrands.forEach((brand) => {
        const brandlistOption = document.createElement("option");
        brandlistOption.value = brand;
        brandlist.appendChild(brandlistOption);
      });

      const type = data.map((product) => product.product_type);
      const uniqueTypes = [...new Set(type)];
      const typeList = document.getElementById("product_type");
      typeList.innerHTML = "";

      uniqueTypes.forEach((brand) => {
        const typelistOption = document.createElement("option");
        typelistOption.value = brand;
        typeList.appendChild(typelistOption);
      });
    }
  );
});

$("#marka").blur(function () {
  document.querySelector("#product").value = "";

  $.get(
    `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${marka.value}`,
    function (data) {
      const type = data.map((product) => product.product_type);
      const uniqueTypes = [...new Set(type)];
      const typeList = document.getElementById("product_type");
      typeList.innerHTML = "";

      uniqueTypes.forEach((brand) => {
        const typelistOption = document.createElement("option");
        typelistOption.value = brand;
        typeList.appendChild(typelistOption);
      });
    }
  );
});

$("#ska").click(function () {
  const min = document.getElementById("custom-handle").innerHTML;
  $.get(
    `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${marka.value}&product_type=${product.value}&price_greater_than=${min} `,
    function (data, status) {
      const resp = $.map(data, function (value) {
        return value;
      });
      document.getElementById("card").innerHTML = "";
      for (let i = 0; i < resp.length; i++) {
        document
          .getElementById("card")
          .insertAdjacentHTML(
            "beforeend",
            '<div class="card"><h3 class="card-name">' +
              resp[i].name +
              '</h3><a href="' +
              ("https://www.google.com/search?q=" + resp[i].name) +
              '" class="card-link"><img src = "' +
              resp[i].image_link +
              '" alt = "" class="card-image"></a><p class="card-price">$' +
              resp[i].price +
              "</p></div>"
          );
      }
    }
  );
});
$(function () {
  var handle = $("#custom-handle");
  $("#slider").slider({
    create: function () {
      handle.text($(this).slider("value"));
    },
    slide: function (event, ui) {
      handle.text(ui.value);
    },
  });
});
