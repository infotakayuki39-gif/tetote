# コーディング規約 — TETOTE 採用サイト

このドキュメントは、TETOTE採用サイトを開発・保守する **人間（本人・チームメンバー・外注先）向け** のコーディング規約です。

> **`CLAUDE.md` との違い**
> `CLAUDE.md` は AIエージェント（Claude Code）向けの簡潔な指示書です。本ドキュメント `CODING_RULES.md` は、人間が読んで理解・運用するために、具体例・理由・図を加えた読み物として整理しています。ルールの中身は両者で共通です。**規約を変更するときは両方を更新してください。**

---

## 1. このサイトについて

- **目的**: 求職者向けの採用サイト（全12ページ）
- **現状**: Vite製の静的サイト（MPA = 複数HTMLページ構成）
- **将来計画**: WordPress化（クラシックテーマを想定）
- **技術スタック**:
  - ビルド: [Vite](https://vitejs.dev/)
  - CSS: [Sass](https://sass-lang.com/)（SCSS記法、FLOCSS設計）
  - JS: バニラJS + [Swiper](https://swiperjs.com/)（スライダー）
  - フォント: Google Fonts（Noto Sans JP / Poppins / Viga）

WordPress化を見据え、**共通パーツ（ヘッダー・フッター）は全ページで同一構造**にしておくこと（後で `header.php` / `footer.php` に集約しやすくするため）。

---

## 2. ディレクトリ構造

実際のパスは以下のとおりです（`src/assets/` ではない点に注意）。

```
tetote/
├── *.html              # 各ページ（ルート直下に12ファイル）
├── js/
│   └── script.js       # メインJS（※ src/ ではなくルートの js/）
├── images/             # 画像（/images/ 絶対パスで参照）
├── src/
│   └── scss/           # ※ src/assets/scss/ ではない
│       ├── style.scss          # 全partialを @use でまとめる入口
│       ├── foundation/         # 土台
│       │   ├── _reset.scss     #   リセットCSS
│       │   ├── _variable.scss  #   変数（色・フォント・BP）
│       │   └── _base.scss      #   ベーススタイル
│       ├── layout/             # 大枠レイアウト（l-）
│       │   ├── _header.scss
│       │   ├── _footer.scss
│       │   └── _main.scss
│       └── object/             # パーツ
│           ├── component/      #   再利用パーツ（c-）: button, card, title
│           ├── project/        #   ページ/セクション固有（p-）
│           │                   #     TOP: hero, about, member, system, top-blog, recruit
│           │                   #     他: staff, blog, contact …
│           └── utility/        #   汎用調整クラス（u-）
└── vite.config.js      # 12ページをエントリーに登録（MPA設定）
```

**FLOCSSの4レイヤー**

| レイヤー | 役割 | プレフィックス | 例 |
|---|---|---|---|
| Foundation | リセット・変数・ベース | なし | `_reset.scss` |
| Layout | ページの大枠 | `l-` | `.l-header` |
| Object / Component | ページ非依存の再利用パーツ | `c-` | `.c-btn` |
| Object / Project | ページ・セクション固有 | `p-` | `.p-hero` |
| Object / Utility | 1つの役割の汎用クラス | `u-` | `.u-text-center` |

新しいスタイルは、**必ず対応するレイヤーのファイル**に書きます。1ファイルが肥大化したらセクション単位で分割してください（例: TOPページは `_hero.scss` `_about.scss` … に分割済み）。

---

## 3. 開発フロー

```bash
npm run dev      # 開発サーバー起動（ホットリロード）
npm run build    # 本番ビルド（dist/ に出力）※ build成功が正しさの最低基準
npm run preview  # ビルド結果をローカルでプレビュー
```

> lint スクリプトは未設定です。

**Git運用**

- ブランチ名: `feature/機能名`
- 1日1回以上 push する
- `node_modules/` `dist/` `.DS_Store` はコミットしない（`.gitignore` 済み）

---

## 4. HTML規約

- **セマンティックなマークアップを徹底する** — `header` / `nav` / `main` / `section` / `article` / `footer` を適切に使う
- **`section` / `article` には必ず見出し（`h2`〜`h6`）を入れる**
- **入れ子ルールを守る** — W3Cバリデーションエラーを出さないこと（例: `p` の中に `div` を入れない、`ul` 直下は `li` のみ 等）
- **`img` や `a` は直接置かず、`div` 等のブロック要素で囲む** — 後からの調整・WordPress化を楽にするため
- **共通パーツ（ヘッダー・ドロワー・フッター）は全ページでマークアップを一致させる**

```html
<!-- 良い例: ブロックで囲み、見出しを持つ -->
<section class="p-about">
  <h2 class="p-about__title">ABOUT</h2>
  <div class="p-about__image">
    <img src="/images/about.jpg" alt="オフィス風景">
  </div>
</section>
```

---

## 5. CSS / SCSS 規約

CSSは「**予測しやすい・再利用しやすい・保守しやすい・拡張しやすい**」の4原則を満たすこと。

### 5.1 命名規則（BEM + FLOCSSプレフィックス）

```
.block__element--modifier
```

- **Block**: 部品の塊（`.l-header`, `.c-btn`, `.p-hero`）
- **Element**: Blockの構成要素、`__` でつなぐ（`.p-hero__title`）
- **Modifier**: バリエーション、`--` でつなぐ（`.l-header__btn--gold`）

```scss
// 良い例（SCSSの & を使ったネスト）
.p-hero {
  &__slide { … }
  &__title { … }
  &__btn--gold { … }   // modifier
}
```

### 5.2 やってはいけないこと

- **`id` にスタイルを当てない** — すべてクラスで管理する。`id` はJSフックとアンカーリンク専用
- **`!important` 禁止** — 唯一の例外は外部ライブラリ（Swiper等）の上書きが他の手段で不可能なとき。使う場合はコメントで理由を残す
- **ハードコードした色・フォントを直書きしない** — 変数（後述）を使う

### 5.3 変数を使う（`foundation/_variable.scss`）

ファイル先頭で `@use '../../foundation/variable' as v;` を読み込み、`v.$変数名` で参照します。

```scss
// 色
$color-black:      #222222;
$color-beige:      #FAF7F1;
$color-gold:       #988C2C;
$color-gold-light: #AFA86F;
$color-white:      #ffffff;

// フォント
$font-main: 'Noto Sans JP', sans-serif;  // 本文
$font-en:   'Poppins', sans-serif;       // 英字
$font-vigo: 'Viga', sans-serif;          // 見出し英字

// ブレイクポイント（詳細は 8.2 参照）
$bp-sp:     375px;
$bp-sp-max: 767px;
$bp-tb:     768px;
$bp-tb-max: 1023px;
$bp-pc:    1024px;
$bp-wide:  1441px;

// トランジション
$transition: 0.3s ease;
```

```scss
.c-btn {
  background-color: v.$color-gold;
  font-family: v.$font-en;
  transition: opacity v.$transition;
}
```

新しく繰り返し使う色などが出てきたら、直書きせず `_variable.scss` に追加してから使ってください。

---

## 6. レイアウトの原則

| 原則 | 内容 |
|---|---|
| **幅** | `width: 100%` + `max-width` を併用し横漏れを防ぐ。**固定幅 `width: 800px` のような指定は避ける** |
| **高さ** | `height` 固定は禁止。`padding` または `min-height` でコンテンツに応じた高さにする |
| **横並び** | `float` 禁止。**Flexbox / Grid** を使う |
| **`position: absolute`** | 最終手段。親の高さが消えてレイアウトが崩れないか注意する |
| **`overflow: hidden`** | レイアウト崩れの「隠蔽」に使わない。幅の設定ミスなど根本原因を直す |
| **余白** | 「親 → 子」方向に設定する。子が外側を押し出す指定は避ける |
| **可変テキスト要素** | ボタン・タグなどは左右に十分な `padding` を取り、テキストが枠に密着しないようにする |

---

## 7. タイポグラフィ

- **`letter-spacing` は原則書かない。** デザインカンプで明示的に字間が指定されている場合のみ設定する

---

## 8. レスポンシブ

### 8.1 画面幅の判断基準

| 画面幅 | やること | 判断基準 |
|---|---|---|
| 〜375px | **SPカンプ通り** | デザイン指定あり |
| 376〜767px | **SPレイアウトをそのまま伸ばす** | `max-width` や `%` で自然に広がればOK |
| **768〜1023px** | **SPレイアウトベースで対応** | デザインカンプなし — 下記3ルール参照 |
| 1024px〜 | **PCレイアウトに切り替え** | デザイン指定あり |
| 1441px〜 | **`max-width` で中央寄せ、それ以上広げない** | コンテナで制御 |

### 8.2 ブレイクポイント変数

```scss
// foundation/_variable.scss
$bp-sp:     375px;   // ~375px: SPカンプ基準
$bp-sp-max: 767px;   // ~767px: SP上限（max-width用）
$bp-tb:     768px;   // 768px~: タブレット開始
$bp-tb-max: 1023px;  // ~1023px: SP＋タブレット上限（max-width用）← 最頻出
$bp-pc:     1024px;  // 1024px~: PCレイアウト切替
$bp-wide:   1441px;  // 1441px~: max-width中央寄せ
```

### 8.3 メディアクエリの書き方（Desktop First）

このサイトは **Desktop First**（PC基準で書き、SP+タブレットを `max-width` で上書き）を採用している。

**基本パターン**（PC がデフォルト、SP+タブレット = `v.$bp-tb-max` 以下で上書き）

```scss
.l-header {
  height: 118px;                                    // PC

  @media screen and (max-width: v.$bp-tb-max) {  // ~1023px: SP＋タブレット
    height: 45px;
  }
}
```

> `v.$bp-tb-max` は `1023px`（SP＋タブレット共通の上限値）。
> タブレット（768〜1023px）はデザインカンプが存在しないため、SP スタイルをそのまま適用する。

**純粋な SP のみに当てたい場合**（タブレットは除外）

原則不要だが、どうしても SP のみを狙う場合は `$bp-sp-max`（767px）を使う。

```scss
.p-hero__catch {
  font-size: 14px;                                   // PC＋タブレット共通

  @media screen and (max-width: v.$bp-sp-max) {      // ~767px: SPのみ
    font-size: 12px;
  }
}
```

**タブレットのみを狙う場合**（例外的な補正）

タブレット専用スタイルが本当に必要なときだけ使う。原則書かない。

```scss
@media screen and (min-width: v.$bp-tb) and (max-width: v.$bp-tb-max) {
  // 768〜1023px のみ
}
```

### 8.4 タブレットサイズのコーディング（768〜1023px）

デザインカンプが存在しないため、要素ごとに下記4パターンから選ぶ。
**原則はパターンAかBかCで解決し、パターンDは最終手段**とする。

#### どのパターンを使うか — 判断フロー

```
要素を見る
 ├─ テキスト＋画像の縦横レイアウト切替 → パターンA
 ├─ カード・グリッドの列数 ───────────── パターンB
 ├─ 余白・フォントサイズの大きさ ──────── パターンC
 └─ 上記3つで解決しない（崩れる）────── パターンD（例外）
```

---

#### パターンA: SP と同じスタイルをタブレットにも継承（最頻出）

PC での横並び・大きめサイズ等を `max-width: v.$bp-tb-max` で上書きすることで、SP とタブレットが同じ縦積みレイアウトになる。タブレット専用の追加記述は不要。

```scss
// NG: 旧ブレイクポイント（~768px のみSP）
.p-about__inner {
  @media screen and (max-width: v.$bp-sp-max) { // 767px: タブレットが崩れる
    flex-direction: column;
  }
}

// OK: SP＋タブレット共通（~1023px）
.p-about__inner {
  flex-direction: row;                              // PC: 横並び

  @media screen and (max-width: v.$bp-tb-max) {  // ~1023px: 縦積み
    flex-direction: column;
  }
}
```

#### パターンB: カード・グリッドは `auto-fit + minmax()` で列数を自動制御

`repeat(auto-fit, minmax(最小幅, 1fr))` に委ねると、幅に応じてブラウザが列数を自動決定する。SP で 1 列 → タブレットで自然に 2 列 → PC で 3〜4 列となり、追加のメディアクエリが不要になる。

```scss
.p-staff__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
// 375px → 1列 / 768px → 2列 / 1024px → 3列以上 が自動で決まる
```

#### パターンC: 余白・フォントサイズは `clamp()` で流動的に補間

SP 値と PC 値が決まっていれば、タブレット幅は `clamp()` の中間値として自動補間される。タブレット専用の上書きは不要。

```
clamp(最小値, 推奨値, 最大値)
  最小値 = SP のデザイン値
  最大値 = PC のデザイン値
  推奨値 = vw を使った線形補間式（下記ツール参照）
```

```scss
// フォントサイズ: SP 28px → PC 48px
.p-hero__title {
  font-size: clamp(1.75rem, 1.2rem + 1.5vw, 3rem);
}

// セクション余白: SP 60px → PC 120px
.l-section {
  padding-block: clamp(3.75rem, 2rem + 4vw, 7.5rem);
}

// clamp() の推奨値を求める式（参考）
// 推奨値 = SP値 + (PC値 - SP値) × (100vw - SP幅) ÷ (PC幅 - SP幅)
// ツール: https://utopia.fyi/
```

#### パターンD: タブレットのみ補正（例外）

パターンA〜Cで解決しない場合にのみ使う。コメントに理由を必ず書く。

```scss
// タブレット（768〜1023px）
@media screen and (min-width: v.$bp-tb) and (max-width: v.$bp-tb-max) {
  .p-hero__slide {
    height: 480px; // PC(640px)だと高すぎ、SP(320px)だと低すぎるため中間値を設定
  }
}
```

---

### 8.5 方針まとめ

- **Desktop First**（PCデフォルト、SP＋タブレットを `max-width` で上書き）
- SP＋タブレット共通 → `max-width: v.$bp-tb-max`（1023px）
- SP のみ → `max-width: v.$bp-sp-max`（767px）、原則不要
- タブレットのみ → `min-width: v.$bp-tb` かつ `max-width: v.$bp-tb-max`、例外のみ（パターンD）
- グリッドは `auto-fit + minmax()` で列数を自動制御（パターンB）
- 余白・フォントは `clamp()` で SP 値〜PC 値を補間（パターンC）
- 余白・フォントは `clamp()` で SP 値〜PC 値を補間
- **すべての画面幅で表示崩れが起きないこと**を確認する（特に 767px / 1023px / 1024px 付近）

---

## 9. JavaScript 規約

`js/script.js` に機能ごとの初期化関数としてまとめています（`initHamburgerMenu()` / `initHeroSlider()` / `initSwiper()` / `initHeaderScroll()` など）。

- **JSが要素を取得するためのフックは `id` に `js-` を付ける**（スタイルは当てない）
  - 例: `#js-hamburger` / `#js-global-menu` / `#js-hero-news`
- **状態は `is-` プレフィックスのクラスで管理する**
  - 例: `is-active` / `is-open` / `is-scrolled` / `is-drawerActive`
- **アクセシビリティ属性**（`aria-expanded` / `aria-hidden`）も状態に合わせて更新する

```js
// 例: ハンバーガーメニューの開閉
hamburger.classList.toggle('is-active', next);
menu.classList.toggle('is-open', next);
body.classList.toggle('is-drawerActive', next);
menu.setAttribute('aria-hidden', String(!next));
```

- スライダーは **Swiper** を使用。必要なモジュール（`Autoplay` / `Navigation`）だけを import する

---

## 10. コミット前チェックリスト

- [ ] `npm run build` が成功する（最低基準）
- [ ] ビルドログに Sass の警告が出ていない
- [ ] ブラウザで **SP / PC 両方**の表示を確認した（特にブレイクポイント前後）
- [ ] コンソールエラー・画像/JSの404が出ていない
- [ ] 新しいスタイルを正しいFLOCSSレイヤーに書いた
- [ ] `id` へのスタイル付与・`!important`・ハードコード色を使っていない
- [ ] HTMLの入れ子・見出し構造が正しい（W3C的にエラーなし）

---

## 11. 作業の進め方

- 実装前に変更計画を一言説明してから着手する
- 不明点は実装前に質問する（手戻りを防ぐ）
- 20分詰まったら別アプローチを検討する
- エラーは「症状」ではなく「根本原因」から直す
- 関係ないファイル・セレクタには触らない（外科手術的な変更）
