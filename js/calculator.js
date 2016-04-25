/**
 *
 * For solarwest
 * Count for trees
 * Created by
 * @author Bogdan Lebedenko
 *
 */

'use strict';

jQuery(function() {
    var procent = 0.25,
        u_KwMonth = 250,
        SP_Kw = u_KwMonth/30/24,
        Pr = 0.57,
        oneYearSaving = 0,
        fiveYearSaving = 0,
        tenYearSaving = 0,
        treesCount = 0;

    // Функция расчета
    function recount() {

        oneYearSaving = ((((u_KwMonth - SP_Kw) * Pr) * 12) * procent)/25.6;
        oneYearSaving = +oneYearSaving.toFixed(2);
        fiveYearSaving = oneYearSaving * 5;
        fiveYearSaving = +fiveYearSaving.toFixed(2);
        tenYearSaving = fiveYearSaving * 2;
        tenYearSaving = +tenYearSaving.toFixed(2);

        SP_Kw = u_KwMonth/30/24;
        treesCount = ((SP_Kw * 0.357 * 12)).toFixed(2);

        // Выводим данные
        jQuery("#u_KwMonth_cifra span").html((u_KwMonth + u_KwMonth*procent).toFixed(0));
        jQuery("#oneYearSaving span").html(oneYearSaving);
        jQuery("#fiveYearSaving span").html(fiveYearSaving);
        jQuery("#tenYearSaving span").html(tenYearSaving);
        jQuery("#treesCount span").html(treesCount);
    }

    // Вызываем функцию расчета
    recount();


    // Вывод данных из слайдера, при условии что он был сдвинут, слайдер выдает переменную в виде строки, преобразуем ее в число добавив унарный +
    $(document).on("change keyup", "#procent", function() {
        procent = +$(this).val();
        procent = procent/100;
        $("#procent-slider").slider("value", procent);
        // Вызываем функцию расчета, чтобы пересчитать после зменения
        recount();
    });


    // Вывод данных из слайдера, при условии что он был сдвинут, слайдер выдает переменную в виде строки, преобразуем ее в число добавив унарный +
    $(document).on("change keyup", "#u_KwMonth", function() {
        u_KwMonth = +$(this).val();
        $("#u_KwMonth-slider").slider("value", u_KwMonth);
        // Вызываем функцию расчета, чтобы пересчитать после зменения
        recount();
    });


});

// Слайдер 1
$(function() {
    $("#procent-slider").slider({
        orientation: 'vertical',
        range: "min",
        value: 25,
        min: 1,
        max: 100,
        slide: function(event, ui) {
            $('#procent').val(ui.value).trigger("change");

            $("#u_KwMonth").css("color", "#999");
            $("#u_KwMonth > .ui-slider-handle").css("background", "url('../img/disabled.png') 0 0 no-repeat");

            $("#procent").css("color", "#f66124");
        }
    });
    $("#procent").val($("#procent-slider").slider("value"));
});

// слайдер 2
$(function() {
    $("#u_KwMonth-slider").slider({
        orientation: 'vertical',
        range: "min",
        value: 250,
        min: 1,
        max: 2500,
        slide: function(event, ui) {
            $("#u_KwMonth").val(ui.value).trigger("change");

            $("#procent").css("color", "#999");
            $("#procent > .ui-slider-handle").css("background", "url('../img/disabled.png') 0 0 no-repeat");
            $("#u_KwMonth").css("color", "#f66124");
        }
    });
    $("#u_KwMonth").val($("#u_KwMonth-slider").slider("value"));
});