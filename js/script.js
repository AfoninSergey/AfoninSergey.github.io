$(document).ready(function () {
  $(".carousel__inner").slick({
    infinite: true,
    speed: 900,

    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="images/icons/left.svg" width="30" height="50" alt="Назад" /></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="images/icons/right.svg" width="30" height="50" alt="Вперед" /></button>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  });

  $("ul.catalog__tabs").on(
    "click",
    "li:not(.catalog__tab_active)",
    function () {
      $(this)
        .addClass("catalog__tab_active")
        .siblings()
        .removeClass("catalog__tab_active")
        .closest("div.container")
        .find("div.catalog__content")
        .removeClass("catalog__content_active")
        .eq($(this).index())
        .addClass("catalog__content_active");
    }
  );
  // function clear() {
  //   document.querySelectorAll(".card__content").forEach((i) => {
  //     i.classList.add("card__content_active");
  //   });
  //   document.querySelectorAll(".card__details").forEach((i) => {
  //     i.classList.remove("card__details_active");
  //   });
  // }
  function toggleClass(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        // clear();
        $(".card__content").eq(i).toggleClass("card__content_active");
        $(".card__details").eq(i).toggleClass("card__details_active");
      });
    });
  }
  toggleClass(".card__link_back");
  toggleClass(".card__link_details");

  //MODAL

  $('[data-modal="consultation"]').on("click", function () {
    $(".overlay, #consultation").fadeIn("slow");
  });

  $(".modal__close").on("click", function () {
    $(".overlay, #consultation, #order, #thanks").fadeOut("slow");
  });

  // $(".button_mini").on("click", function () {
  //   $(".overlay, #order").fadeIn("slow");
  // });

  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".card__title").eq(i).text());
      $(".overlay, #order").fadeIn("slow");
    });
  });

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: "Пожалуйста, введите Ваше имя!",
        phone: "Пожалуйста, введите номер телефона!",
        email: {
          required: "Пожалуйста, введите Ваш E-mail",
          email: "Неправильно введен E-mail",
        },
      },
    });
  }

  validateForms("#consultation-form");
  validateForms("#order .feed-form");
  validateForms("#consultation .feed-form");

  $("input[name=phone]").mask("+7(999) 999-99-99");

  $("form").submit(function (e) {
    e.preventDefault();

    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut();
      $(".overlay, #thanks").fadeIn("slow");
      $("form").trigger("reset");
    });
    return false;
  });

  //smooth

  $(window).scroll(function () {
    if ($(this).scrollTop() > 1100) {
      $(".up").fadeIn();
    } else {
      $(".up").fadeOut();
    }
  });

  $("a").on("click", function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      const hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        150,
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    } // End if
  });

  new WOW().init();

});
