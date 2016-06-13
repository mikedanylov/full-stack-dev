/**
 * Created by mikedanylov on 6/13/16.
 */

(function IIFE() {

    function SideSlider(settings) {

        this.params = {
            width: settings.width
        };

    }

    SideSlider.prototype.open = function () {
        $("body").css("overflow", "hidden");
        $('.side-slider').animate({ "right": "+=" + this.params.width}, 500, function () {
            $("body").css("overflow", "auto");
        });
        this.opened = true;
    };

    SideSlider.prototype.close = function () {
        var slider = this;
        return new Promise(function (resolve, reject) {
            $("body").css("overflow", "hidden");
            $('.side-slider').animate({ "right": "-=" + slider.params.width}, 500, function () {
                $("body").css("overflow", "auto");
                resolve();
            });
            slider.opened = false;
        });
    };

    SideSlider.prototype.isOpened = function () {
        return this.opened;
    };

    SideSlider.prototype.insertWidget = function ($qd, $parent) {
        $qd.css('position', 'relative');
        $qd.css('top', '0');
        $qd.css('left', '0');
        $('.arrow-up.arrow').css('display', 'none');
        $('.quickDepositOverlay').hide();
        $parent.append($qd);
    };

    SideSlider.prototype.removeWidget = function ($qd) {
        var $body = $("body");

        $qd.hide();
        $body.append($qd);
        $('#divQuickDepositInfo, span.qd-close, .arrow-up.arrow').removeAttr('style');
        $qd.scope().resetWidget();
        $qd.show();
        $body.css("overflow", "auto");
    };

    var $content = $('.side-slider-content-wrapper');
    var slider = new SideSlider({
        width: parseInt($content.css('width')) + 2 * parseInt($content.css('padding'))
    });

    $('.side-slider-tab .rotated-text').click(function () {
        var $elem = $('.side-slider-content-wrapper');
        var $widget = $('#divQuickDepositInfo');

        if (slider.isOpened()) {
            slider.close().then(function () {
                slider.removeWidget($widget, $elem);
            });
        } else {
            slider.insertWidget($widget, $elem);
            slider.open();
            $widget.show();
        }
    });

})();
