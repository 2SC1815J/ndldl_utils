# ndldl_utils

[国立国会図書館デジタルコレクション]向けユーザスクリプト

国立国会図書館デジタルコレクションで資料を閲覧する際、次のカスタマイズを行います。
- コマ移動に応じて、ブラウザのアドレスバーを現在表示中のコマのURLに更新
- タイトルを「サイト名 - 資料名」から「資料名 - サイト名」に変更
- 2013年9月27日のレイアウト変更で使いにくくなったデザインを応急的に変更
- IIIF対応資料では、IIIFアイコンのクリックにより現在表示中のコマを外部IIIFビューワで開けるように変更

[国立国会図書館デジタルコレクション]: http://dl.ndl.go.jp/
[Greasemonkey]: https://addons.mozilla.org/firefox/addon/greasemonkey/
[Violentmonkey]: https://addons.mozilla.org/firefox/addon/violentmonkey/

## インストール方法

1. このツールの利用には、ユーザスクリプトを動作させるためのブラウザ拡張機能（[Greasemonkey]、[Violentmonkey]など）のインストールが必要です。
    - [Greasemonkey]はバージョン3系列で動作を確認しています。
    - Firefox 57以降では、[Violentmonkey]で動作を確認しています。
    - Google Chromeでは、 [Violentmonkey](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)で動作を確認しています。
2. ブラウザ拡張機能を初めてインストールした場合は、ブラウザを再起動してください。
3. 以下のリンクをクリックすると、このユーザスクリプトのインストール確認が表示されます。
    - [ndldl_utils.user.js](https://github.com/2SC1815J/ndldl_utils/raw/master/ndldl_utils.user.js)

## 注意点

国立国会図書館デジタルコレクションのサイトデザインが変更された場合、正しく動作しなくなる可能性があります。
