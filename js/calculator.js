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
    var procent         = 0.75, // Предустановленные значения - проценты в первом ползунке
        u_KwMonth       = 2480, // Предустановленные значения - Максимальное кол-во кВ в счетчике
        SP_Kw           = 1860, // Предустановленные значения
        Pr              = 1.7,  // грн за 1кВ
        oneYearSaving   = 0,
        fiveYearSaving  = 0,
        tenYearSaving   = 0,
        treesCount      = 0,
        system          ,
        revenue;


    // Функция расчета
    function recount() {
        SP_Kw = u_KwMonth * procent;
        oneYearSaving   = +(SP_Kw * Pr * 12).toFixed(2);
        fiveYearSaving  = +(oneYearSaving * 5).toFixed(2);
        tenYearSaving   = +(oneYearSaving * 10).toFixed(2);
        treesCount  = (SP_Kw * 12 / 100).toFixed(0);

        if (SP_Kw <= 620) {
            system = 24000;
        } else if (SP_Kw > 621 && SP_Kw <= 1240) {
            system = 48000;
        } else if (SP_Kw > 1241 && SP_Kw <= 1860) {
            system = 72000;
        } else if (SP_Kw > 1861 && SP_Kw <= 2480) {
            system = 96000;
        }

        revenue     = (system.toFixed(0) / oneYearSaving).toFixed(1);

        jQuery("#u_KwMonth_cifra span").html((SP_Kw).toFixed(0));
        jQuery("#oneYearSaving span").html(oneYearSaving);
        jQuery("#fiveYearSaving span").html(fiveYearSaving);
        jQuery("#tenYearSaving span").html(tenYearSaving);
        jQuery("#treesCount span").html(treesCount);
        jQuery("#revenue span").html(revenue);
    }
    recount();

    $(document).on("change keyup", "#procent", function() {
        procent = +$(this).val();
        procent = procent/100;
        $("#procent-slider").slider("value", procent);

        recount();
    });

    $(document).on("change keyup", "#u_KwMonth", function() {
        u_KwMonth = +$(this).val();
        $("#u_KwMonth-slider").slider("value", u_KwMonth);
        revenue = (SP_Kw.toFixed(0) / oneYearSaving).toFixed(1);

        recount();
    });
});

// Range 1
$(function() {
    $("#procent-slider").slider({
        orientation: 'vertical',
        range: "min",
        value: 75,
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

// Range 2
$(function() {
    $("#u_KwMonth-slider").slider({
        orientation: 'vertical',
        range: "min",
        value: 2480,
        min: 1,
        max: 2480,
        slide: function(event, ui) {
            $("#u_KwMonth").val(ui.value).trigger("change");
            $("#procent").css("color", "#999");
            $("#procent > .ui-slider-handle").css("background", "url('../img/disabled.png') 0 0 no-repeat");
            $("#u_KwMonth").css("color", "#f66124");
        }
    });
    $("#u_KwMonth").val($("#u_KwMonth-slider").slider("value"));
});