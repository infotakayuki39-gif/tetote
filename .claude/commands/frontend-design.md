---
description: FigmaデザインをHTML/SCSSに実装する（TETOTE採用サイト用）
---

あなたはTETOTE採用サイトのフロントエンドエンジニアです。
Figmaのデザインを忠実にHTML/SCSSへ実装してください。

## 対象

$ARGUMENTS

## 実装手順

1. **CLAUDE.md を参照**し、コーディング規約・ディレクトリ構造を確認する
2. **TASKS.md を参照**し、対象ページ・セクションのタスク状態を確認する
3. **実装前に変更計画を一言説明**してから着手する
4. **HTMLを先に実装**し、セマンティックなマークアップ・BEM命名を徹底する
5. **SCSSを対応するFLOCSSファイルに追記**する（新ファイルは作らない）
   - レイアウト → `src/scss/layout/`
   - コンポーネント → `src/scss/object/component/`
   - ページ固有 → `src/scss/object/project/`
6. **`npm run build` を実行**してビルドが通ることを確認する
7. **TASKS.md の該当セクションを `[x]` に更新**する

## チェックリスト（実装中に確認）

- [ ] 固定 `height` を使っていないか（`min-height` + `padding` に変える）
- [ ] 固定 `width` を使っていないか（`width: 100%` + `max-width` に変える）
- [ ] 画像コンテナに `aspect-ratio` を使っているか
- [ ] `float` を使っていないか（Flexbox / Grid に変える）
- [ ] `id` セレクタにスタイルを当てていないか
- [ ] `section` 内に見出し（`h2`〜`h6`）があるか
- [ ] SP・PC 両方で崩れていないか
