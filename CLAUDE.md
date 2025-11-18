# Project: Chinese-Wind Strudel Suite

## Project Description

這是一個使用 Strudel（https://strudel.cc）進行 live coding 的音樂創作專案。
目標是創作一系列「中國風 / 東亞意象」的生成音樂作品，風格可包含：

- 山水、道家、禪修風格的冥想音樂
- 帶有古箏、二胡、簫等意象的旋律（以合成器與濾波模擬）
- 帶哲學/自我反省註解的 live coding 作品（類似 “I AM THE SYNTHESIZER”）

所有音樂邏輯以 Strudel pattern code 寫在 `src/` 底下，最後貼到 strudel.cc 播放，
或透過 Strudel MCP server 由 Claude 自動送進瀏覽器。

---

## Tech Stack

- **Strudel**：瀏覽器裡的 live coding / pattern 音樂環境（JavaScript 版 TidalCycles）
- Pattern 語法：`note()` / `n()` / `s()` / `stack()` / `every()` / `sometimes()` / `degradeBy()` 等
- 音階：優先使用五聲音階 `*:major:pentatonic`、`*:minor:pentatonic`
- 音色：Strudel 內建波形（`sine`, `triangle`, `sawtooth`, `square`）與 sample map（`s("bd sd hh")` 等），
  搭配濾波（`lpf`, `hpf`）、reverb（`room`）、delay 等效果。

若本專案未來接上 **Strudel MCP Server**（例如 `strudel-mcp-server`），
也可以把下列工具視為可用：`init`, `write`, `play`, `stop`, `generate_pattern`,
`generate_drums`, `generate_chord_progression`, `apply_scale`, `set_tempo` 等。

---

## Project Structure

- `/CLAUDE.md`  
  本檔案：告訴你（Claude）這個專案在做什麼，偏好與約定。

- `/README.md`  
  人類讀的說明：如何用 Strudel 播放、作品命名規則等。

- `/src/chinese_wind_01.strudel.js`  
  第一首完整的「中國風」作品（目標是可直接貼進 strudel.cc 播放）。

- `/src/motifs_library.strudel.js`  
  常用 pattern 片段：  
  - 常見五聲音階 motif  
  - 鼓組 groove（例如宮廷鼓、柔和節拍）  
  - drone / pad / arpeggio 基底

- `/src/experiments/*.strudel.js`  
  草稿與實驗 pattern，用來 jam 或試效果。

- `/reference/chinese_scales.md`  
  記錄五聲音階、常用調式（宮、商、角、徵、羽）及其對應到西方音名／Strudel scale 字串。

- `/reference/sound_design_notes.md`  
  紀錄如何用 Strudel 的聲音與效果去模擬古箏、二胡、簫等意象。

---

## Code Conventions

請你（Claude）在本專案中遵守以下約定：

### 1. 檔案命名

- 完整作品：`src/chinese_wind_XX.strudel.js`  
  - `XX` 為兩位數（01, 02, 03...）
- 動機／素材庫：`src/motifs_library.strudel.js`
- 草稿：`src/experiments/sketch_YYYYMMDD_HHMM.strudel.js`

### 2. Pattern 設計

- 一首作品盡量拆成多個具語意的常數，例如：

  ```js
  const main_melody = ...
  const guzheng_arp = ...
  const drone = ...
  const percussion = ...
  const full_mix = stack(main_melody, guzheng_arp, drone, percussion)
  ```

- 若有哲學／敘事主題，可以比照以下命名模式：  

  - `const mountain_path = ...`
  - `const river_reflection = ...`
  - `const temple_bell = ...`
  - `const final_unity = stack(...)`

- 優先使用 `stack()` 組合多個 layer，而不是把所有東西塞在一條超長 pattern 裡。

### 3. 音階與調性（中國風重點）

- 優先使用五聲音階（major / minor pentatonic），例如：

  ```js
  // C 大調五聲音階：C D E G A
  n("0 1 2 3 4 3 2 1")
    .scale("C:major:pentatonic")
  ```

- 若想做稍微憂鬱、陰柔的色彩，可以使用 `A2:minor:pentatonic`，或其他 minor pentatonic。

- 如需要日式／東亞感，可以參考類似 ritusen / yo 等五聲音階的音程結構，
  再用最接近的等分律 pitch 做近似。

### 4. 音色與效果（模擬中國樂器）

請你偏好以下設計思路：

- **古箏 / 古琴感**：  
  - 使用 `sound("sine")` 或 `sound("triangle")`，加上短 release、輕微 lpf，例如：
    ```js
    note(...).sound("triangle").lpf(1500).release(0.2)
    ```

- **簫 / 笛子感**：  
  - 使用 `sine` 或 `sawtooth`，加入柔和的 lpf + reverb：
    ```js
    note(...).sound("sine").lpf(1200).room(0.7).gain(0.3)
    ```

- **鼓／節奏**：  
  - 用 sample map：`s("bd sd,hh*8")` 等，聲音不必完全「中國製」，但節奏要留空白、不要太 EDM。

- **空間感**：  
  - 常用 `room(0.6~0.9)` + 少量 `delay`，營造山谷或廟宇殘響。

### 5. Pattern 操作習慣

- 常用：`.every`, `.sometimes`, `.rarely`, `.degradeBy` 來製造「似即興」的細微變化。  
- 避免無限制疊加 `fast` / `slow` 導致 pattern 變得難以理解。  
- 若使用 `rand` / `perlin` 等噪聲函數，請用在力度、濾波 cutoff、pan 等「表情」層，而非核心旋律。

---

## Instructions for Claude

請你在 **Claude Code for web** 中，針對本專案採用以下工作流程：

1. **我說「幫我做一首新的中國風曲子」時：**
   - 先在 `src/experiments/` 建立一個新的 `sketch_YYYYMMDD_*.strudel.js` 檔案。
   - 依照我指定的情緒、場景（例如「下雨的竹林」「夜行的舟」）設定：
     - `setcpm`：對應呼吸感（大約等價 60–80 BPM 的 cycles/min）
     - 預設音階：`C:major:pentatonic` 或 `A2:minor:pentatonic`，依情緒決定。
   - 建立：  
     - `const main_melody`（旋律）  
     - `const accompaniment`（琵琶／古箏式分解和弦）  
     - `const drone`（低音持續）  
     - `const percussion`（輕鼓或木魚感）  
     - `const full_mix = stack(...)`  
   - 在檔案末端留下一段註解，簡述設計思路與可嘗試的變化（例如改調、加快等）。

2. **我把某段 Strudel code 從 strudel.cc 貼回來請你優化時：**
   - 先閱讀 pattern 結構，分出命名良好的常數。
   - 清理重複邏輯（例如多次出現的五聲音階 run，抽成 helper）。
   - 不改變我現有的主旋律節奏，只優化結構與音色參數，除非我要求大改。

3. **使用 Strudel MCP（如果連上）時：**
   - 優先使用工具：
     - `init` / `write` / `play` / `stop` 進行 session 控制。
     - `generate_pattern` / `generate_drums` / `generate_chord_progression` 生出素材，再貼回專案檔案中。
     - `apply_scale` 確保旋律保持在五聲音階或指定調式內。
   - 所有自動產生的 pattern，請同步保存到 `src/experiments/` 或整合到 `motifs_library.strudel.js`。

4. **一般原則：**
   - 寧可多加註解，也不要讓 pattern 難以閱讀。
   - 若我沒說要「重構整首」，請避免把已命名好的常數亂改名。
   - 當你覺得某個 pattern 很容易失控（太亂或太吵），請主動提醒並給「更穩定」版本。

---

## Environment Setup

> 這裡主要是給人類看的，但也讓你知道我們的運作方式。

- 開發環境：  
  - Claude Code for web（瀏覽器端 IDE）  
  - Strudel live coding 網站：https://strudel.cc  

- 基本流程：  
  1. 在 Claude Code 中編輯 `src/*.strudel.js`。  
  2. 將 `setcpm(...)` 之後的一整段 pattern 貼到 strudel.cc。  
  3. 在 Strudel 端播放／停止，調整參數。  
  4. 若有 MCP server，則可以直接在 Claude Code 中叫工具播放。

---

## Future Plans

- 整理一套「中國風 pattern library」，包含：
  - 常見宮商角徵羽動機
  - 不同節奏型（行板、慢板、舞曲感）

- 研究用更進階的合成器或外部音源來模擬中國樂器音色（如 plucked strings 模型），
  以及將成品輸出成 audio 檔，做成 EP／專輯。
