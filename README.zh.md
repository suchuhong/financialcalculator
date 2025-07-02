# 财务计算器

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black.svg?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue.svg?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC.svg?logo=tailwind-css)

[English](README.md) | [日本語](README.ja.md)

一个使用最新 Web 技术构建的、功能强大且界面优雅的财务计算器网站应用。它提供一套核心的财务工具，具有简洁、响应式的用户界面，并支持英语、中文和日语。无论是学生、专业人士，还是任何希望做出明智财务决策的人，这都是一个完美的工具。

---

## 🌐 在线演示

**[https://financialcalculator.site/](https://financialcalculator.site/)**

## 📸 截图

*在这里插入应用的截图，展示其优雅的界面。*

## ✨ 主要特点

### 核心计算器
- **现值计算器 (Present Value)**: 计算未来一笔钱在今天的价值。
- **未来值计算器 (Future Value)**: 计算今天一笔投资在未来的价值。
- **内部收益率 (IRR) 计算器**: 评估一项投资的盈利能力。
- **贷款计算器 (Loan Calculator)**: 计算贷款的月供和总利息。
- **盈亏平衡分析 (Breakeven Analysis)**: 确定达到收支平衡所需的销售量。
- **机会成本计算器 (Opportunity Cost)**: 帮助您理解选择一个选项而放弃另一个的潜在收益。

### 用户体验
- **多语言支持**: 无缝切换英语、中文和日语。
- **现代化界面**: 使用 Tailwind CSS 构建的简洁、美观的设计。
- **完全响应式**: 在桌面、平板和手机上均提供完美的视觉和使用体验。
- **直观的组件**: 基于 Radix UI 构建，确保可访问性和最佳实践。

### 教育内容
- **知识库**: 学习每个计算器背后的核心财务概念。
- **案例研究**: 通过真实世界的示例，理解财务工具的实际应用。

## 🛠️ 技术栈

- **前端**: Next.js 15.3.4, React 19, TypeScript
- **样式**: Tailwind CSS 4
- **UI 组件库**: Radix UI, Lucide React (图标)
- **国际化**: `next-intl`

## 🚀 快速上手

### 前提条件

- Node.js 18+
- pnpm (推荐), npm, 或 yarn

### 安装

```bash
# 克隆仓库
git clone <repository-url>

# 进入项目目录
cd financial-calculator

# 安装依赖
pnpm install
````

### 本地开发

```bash
# 运行开发服务器
pnpm dev

# 在浏览器中打开 http://localhost:3000
```

### 生产环境构建

```bash
# 构建应用
pnpm build

# 启动生产服务器
pnpm start
```

## 📁 项目结构

```
financial-calculator/
├── app/                  # Next.js App 目录
│   └── [locale]/         # 动态语言路由
│       ├── cases/        # 案例研究页面
│       ├── knowledge/    # 知识库页面
│       ├── tools/        # 财务工具页面
│       └── page.tsx      # 首页
├── components/           # React 组件
├── i18n/                 # 国际化配置
├── messages/             # 翻译文件 (en.json, zh.json, ja.json)
└── public/               # 公共静态资源
```

## 🤝 参与贡献

欢迎各种形式的贡献！如果您有任何想法或建议，请随时提交 Pull Request 或创建 Issue。

## 📄 许可证

本项目基于 [MIT](https://www.google.com/search?q=LICENSE) 许可证。


