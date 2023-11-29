$(document).ready(function() {
    $('.carousel__inner').slick({
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow_left.svg" alt="arrow_left"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow_right.svg" alt="arrow_right"></button>',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: false
                }
            },
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('section.catalog').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    $('.catalog-item__link').each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            $(this).text(function(j, text) {
                return text === "Подробнее" ? "Назад" : "Подробнее";
            })
        })
    })

    function validateForms(form) {
        $(form).validate({
        rules: {
            name: "required",
            phone: {
                required: true,
                minlength: 7
            },
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: "Пожалуйста, введите своё имя",
            phone: {
                required: "Пожалуйста, введите свой номер телефона",
                minlength: jQuery.validator.format("Минимум {0} символов")
            },
            email: {
                required: "Пожалуйста, введите свою почту",
                email: "Неправильно введён адрес почты"
            }
        }
    });
    }

    validateForms('#consultation-form');
    validateForms('#consult form');
    validateForms('#purchase form');

    $('input[name=phone]').mask("+7 (999) 999-99-99")
    
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");

            if (document.querySelector('.popup-active#consult')) {
                popup('#consult')
            } else if (document.querySelector('.popup-active#purchase')) {
                popup('#purchase')
            };

            popup('#thank-you');
            $('form').trigger('reset');
        });
        return false;
    });

    // smooth scroll and pageup

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1300) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    new WOW().init();
});



const popup = (el) => document.querySelector(el).classList.toggle('popup-active');

let productList = document.querySelectorAll('.catalog-item .catalog-item__subtitle')

for (let i = 0; i < productList.length; i++) {
    document.querySelectorAll('.button_mini')[i].onclick = function () {
        document.querySelector('#purchase .popup-text span').innerHTML = productList[i].innerHTML;
        popup('#purchase')
    }
}