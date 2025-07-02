
# ファイナンシャルカリキュレーター

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black.svg?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue.svg?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC.svg?logo=tailwind-css)

[English](README.md) | [简体中文](README.zh.md)

最新のWeb技術で構築された、エレガントでパワフルな多言語対応の金融計算ウェブアプリケーションです。洗練されたレスポンシブデザインのUIで、必要不可欠な金融ツール一式を提供します。英語、中国語、日本語に対応しており、学生、専門家、そして賢明な財務判断を下したいすべての人に最適なツールです。

---

## 🌐 ライブデモ

**[https://financialcalculator.site/](https://financialcalculator.site/)**

## 📸 スクリーンショット

*ここにアプリケーションのスクリーンショットを挿入し、洗練されたUIを展示します。*

## ✨ 主な特徴

### 主要な計算ツール
- **現在価値 (Present Value) 計算機**: 将来の金額の現在の価値を計算します。
- **将来価値 (Future Value) 計算機**: 現在の資産の将来の価値を計算します。
- **内部収益率 (IRR) 計算機**: 投資の収益性を評価します。
- **ローン計算機**: ローンの毎月の返済額と総利息を計算します。
- **損益分岐点分析**: 総収益が総費用と等しくなる点を特定します。
- **機会費用計算機**: ある選択肢を選ぶことで見逃される潜在的な利益を理解するのに役立ちます。

### ユーザーエクスペリエンス
- **多言語対応**: 英語、中国語、日本語をシームレスに切り替え可能。
- **モダンなUI**: Tailwind CSSで構築された、クリーンで美しいデザイン。
- **完全レスポンシブ**: デスクトップ、タブレット、モバイルの各デバイスで完璧な体験を提供。
- **直感的なコンポーネント**: Radix UIを基に構築し、アクセシビリティとベストプラクティスを保証。

### 教育コンテンツ
- **知識ベース**: 各計算ツールの背景にある中心的な金融概念を学びます。
- **ケーススタディ**: 実社会の例を通して、金融ツールの実用的な応用を理解します。

## 🛠️ 技術スタック

- **フロントエンド**: Next.js 15.3.4, React 19, TypeScript
- **スタイリング**: Tailwind CSS 4
- **UIコンポーネント**: Radix UI, Lucide React (アイコン用)
- **国際化**: `next-intl`

## 🚀 クイックスタート

### 前提条件

- Node.js 18+
- pnpm (推奨), npm, または yarn

### インストール

```bash
# リポジトリをクローンする
git clone <repository-url>

# プロジェクトディレクトリに移動する
cd financial-calculator

# 依存関係をインストールする
pnpm install
````

### 開発

```bash
# 開発サーバーを実行する
pnpm dev

# ブラウザで http://localhost:3000 を開く
```

### 本番環境向けビルド

```bash
# アプリケーションをビルドする
pnpm build

# 本番サーバーを起動する
pnpm start
```

## 📁 プロジェクト構造

```
financial-calculator/
├── app/                  # Next.js App ディレクトリ
│   └── [locale]/         # 動的ロケールルーティング
│       ├── cases/        # ケーススタディページ
│       ├── knowledge/    # 知識ベースページ
│       ├── tools/        # 金融ツールページ
│       └── page.tsx      # ホームページ
├── components/           # React コンポーネント
├── i18n/                 # 国際化設定
├── messages/             # 翻訳メッセージ (en.json, zh.json, ja.json)
└── public/               # 公開アセット
```

## 🤝 貢献

貢献を歓迎します！アイデアや提案があれば、気軽にプルリクエストを送信したり、Issueを作成してください。

## 📄 ライセンス

このプロジェクトは [MIT](https://www.google.com/search?q=LICENSE) ライセンスの下で公開されています。

