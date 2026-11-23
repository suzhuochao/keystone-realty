# Keystone Realty — Lab 网站

## 文件
- `index.html` — 首页（视频、房贷计算器、X-Factor 说明）
- `about.html` — 第二页（品牌故事、服务、购房流程、精选房源、FAQ）
- `style.css` — 样式
- `chatbot.js` — 聊天机器人 Keys（两个页面都会加载）
- `gemini_generated_video_db18c851.mp4` — 首页循环背景视频

## GitHub Pages

在仓库的 **Settings → Pages** 中，将发布源设为 **Deploy from a branch**，选择 `main` 和 `/(root)`，然后保存。部署完成后，网站地址为 `https://suzhuochao.github.io/keystone-realty/`。

> GitHub Pages 对私有仓库的支持取决于 GitHub 账户方案；如当前方案不支持，需在 GitHub 上为此仓库启用 Pages 或另行选择公开发布方式。

## （可选）换成你 Lab 3 的聊天机器人

如果你 Lab 3 的机器人有嵌入代码（Chatbase / Botpress / Voiceflow 等），在 `index.html` 和 `about.html` 底部找到 `LAB 3 CHATBOT EMBED` 注释，把嵌入代码粘贴进去，并删除 `<script src="chatbot.js"></script>` 那一行。不换也没问题——现在的 Keys 本身就是可用的聊天机器人。
