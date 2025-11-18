# Chinese-Wind Strudel Suite

一個使用 Strudel（https://strudel.cc）創作「中國風／東亞風」生成音樂的專案。

## 如何使用

1. 在本機建立或下載本專案資料夾，並在 Claude Code for web 中以「開啟資料夾 / Open folder」載入。
2. 在 `src/chinese_wind_01.strudel.js` 或 `src/experiments/*.strudel.js` 裡編輯 Strudel code。
3. 將檔案裡的程式碼（包含 `setcpm(...)`）複製到 https://strudel.cc 的 editor。
4. 在瀏覽器中按下播放，即可聆聽。

> 若你已安裝 Strudel MCP server，亦可在 Claude Code 中讓 Claude 透過工具直接播放 / 停止音樂。

## 檔案說明

- `CLAUDE.md`：給 Claude 的專案說明與工作規則。
- `src/chinese_wind_01.strudel.js`：第一首完整的中國風作品範例。
- `src/motifs_library.strudel.js`：常用旋律動機、節奏型與和聲片段。
- `src/experiments/`：草稿與實驗 pattern。
- `reference/chinese_scales.md`：五聲音階與宮商角徵羽模式備忘。
- `reference/sound_design_notes.md`：模擬古箏、二胡、簫等音色的設計筆記。
