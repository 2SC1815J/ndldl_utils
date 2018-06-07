// ==UserScript==
// @name        ndldl_utils
// @description 国立国会図書館デジタルコレクション閲覧画面のカスタマイズ
// @author      2SC1815J
// @date        2018-06-07
// @license     MIT License
// @namespace   https://github.com/2SC1815J
// @homepageURL https://github.com/2SC1815J/ndldl_utils
// @include     http://dl.ndl.go.jp/info:ndljp/pid/*
// @require     https://gist.githubusercontent.com/BrockA/2625891/raw/9c97aa67ff9c5d56be34a55ad6c18a314e5eb548/waitForKeyElements.js
// @version     0.3
// ==/UserScript==

// 従来
// https://github.com/2SC1815J/kindigi_utils
// として公開していたものの後継版

(function($) {
    // 2013年9月27日のレイアウト変更で使いにくくなった箇所を応急的に変更する。
    // 細かい辻褄合わせはしていない。対象の選択は手を抜いている。

    // 以下のデザインは後日廃止されたのでコメントアウト
    // 検索窓 → 赤色の枠は目に付きすぎるので変更。
    // $('#search-textbox').css('border-color', 'transparent');
    // 検索ボタン → 青色の枠は目に付きすぎるので変更。
    // $('.mainbutton').css({'height': '23px', 'border-top-width': '0px', 'border-color': 'transparent', 'background-image': 'url("/resources/images/button-bg.png")'});

    // コンテンツ表示エリアの各種ボタンが大きくなりすぎて使いにくいので小さくする。
    // 概観図オン・表示領域設定・JPEG表示等の列のボタン下端が、画像の上端とちょうど
    // 接してしまい、両者がひとつながりに見えて混乱するので、ボタンを小さくする。
    // （ボタンアイコンが大きいままなのは仕様。余力のある方は直してください。）
    waitForKeyElements(
        '.minibutton, .mb-placeholder',
        function(jNode) {
            jNode.css({ 'height': '20px', 'font-weight': 'normal', 'font-size': '100%' });
            $('#btn-help').css({ 'right': '25px', 'top': '7px' }); //ついでに修正
        }
    );
    waitForKeyElements(
        '.imagecontrol',
        function(jNode) {
            jNode.css('padding-bottom', '6px');
        }
    );

    // その後行われたデザイン変更に対するCSSカスタマイズ（目立ちすぎる配色を抑えるなど）
    $('.detailcontrolbox').css({ 'line-height': '30px', 'height': '30px' });
    $('.searchotherdata').find('br').remove();
    $('.searchotherdata').css({ 'width': '270px !important', 'padding-right': '0px' });
    $('.backtoresult, .searchotherdata').css('font-size', '12px');
    $('.backtoresult a, .searchotherdata a').css('font-weight', 'normal');
    $('.searchotherdata a span').css('background-color', 'transparent');
    $('.toctabopened a').css('background-position', '0 -25px');
    $('#GlobalNaviArea').css({ 'padding-top': '10px', 'padding-bottom': '10px' });

    // タブやブックマークで識別しやすくするため、タイトルを「資料名 - サイト名」に変更する。
    function fixTitle() {
        var match = document.title.match(/(国立国会図書館デジタルコレクション) - (.+)/i);
        if (match) {
            document.title = match[2] + ' - ' + match[1];
        }
    }

    var target = document.querySelector('head > title');
    var observer = new MutationObserver(function(MutationRecords, MutationObserver) {
        fixTitle();
        // ブラウザのアドレスバーを、現在表示中のコマのURLに更新する。
        var val = $('#sel-content-no').val();
        if (history.replaceState && history.state !== undefined && val) {
            var url = location.protocol + '//' + location.host + location.pathname;
            var match = url.match(/http:\/\/dl\.ndl\.go\.jp\/info:ndljp\/pid\/([0-9]+)(\/[0-9]+)?/i);
            if (match) {
                var newUrl = 'http://dl.ndl.go.jp/info:ndljp/pid/' + match[1];
                if (val > 1) {
                    newUrl += '/' + val;
                }
                history.replaceState(null, null, newUrl);
            }
        }

        //IIIFアイコンをコマ番号指定付きリンクに変更する（manifest自身へのリンクは残す）。
        $('.item-icon-iiif').each(function() {
            var $manifestLink = $(this).closest('a');
            if ($manifestLink) {
                if (!$manifestLink.attr('data-manifest')) {
                    $manifestLink.attr('data-manifest', $manifestLink.attr('href'));
                }
                var manifestUrl = $manifestLink.attr('data-manifest');
                var viewerUrl = 'http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?manifest=' + manifestUrl + '&pos=' + val;
                $manifestLink.attr('href', viewerUrl).empty()
                    .append('<img class="item-icon-iiif" src="/resources/images/iiif.png">')
                    .append($('<a>').attr('href', manifestUrl).attr('target', '_blank').text(manifestUrl));
            }
        });
    });
    observer.observe(target, { subtree: true, characterData: true, childList: true });

    fixTitle();

})(jQuery);
