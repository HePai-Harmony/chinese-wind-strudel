# 中國風音色設計備忘（Strudel）

這份筆記整理如何在 Strudel 裡，用簡單的波形與效果，模擬「古箏、古琴、簫／笛子、二胡」等東亞音色意象。
目標不是物理上完全擬真，而是達到「一聽就有東方感」的主觀印象。

---

## 1. 通用原則

1. **少用重度失真與超低頻 bass**：中國風主題多半偏乾淨自然，較少極重低音或 hard EDM 風格。
2. **重視空間感**：適度的 `room()`（reverb）與偶爾的 `delay()`，可以營造山谷、寺廟或庭園的空間感。
3. **避免太西方的和聲堆疊**：減少三和弦平行、爵士擴展和弦，改以單聲部旋律與 drone 為主。

---

## 2. 古箏 / 古琴（plucked strings）

### 2.1 基本作法

- 波形：`triangle` 或 `sine`
- 包絡：快速 attack、短 release
- 濾波：輕微的低通，剪掉最刺耳的高頻

範例：

```js
const guzheng_arp = n("<0 4 2 4> <0 2 4 2>")
  .scale("F:major:pentatonic")
  .sound("triangle")
  .lpf(1800)
  .gain(0.26)
  .room(0.8)
  .release(0.25)
  .every(2, x => x.fast(2))
  .sometimes(x => x.rev())
```

### 2.2 技巧與變化

- 使用 `every(2, x => x.fast(2))` 模擬「加花」或快速拂弦。
- 使用 `rev()` 讓部分分解和弦反轉，形成掃弦感。

---

## 3. 簫 / 橫笛（soft lead）

### 3.1 基本作法

- 波形：`sine` 或帶少許鋸齒的 `sawtooth`
- 濾波：較低的 cutoff（例如 800–1500 Hz），避免太亮。
- 空間：中等以上的 `room()`，帶出遠景感。

範例：

```js
const bamboo_flute = n("4 3 2 0 2 3 4 7")
  .scale("F:major:pentatonic")
  .sound("sine")
  .lpf(1200)
  .gain(0.28)
  .room(0.8)
  .every(2, x => x.slow(2))
  .sometimes(x => x.add(7))   // 偶爾跳高八度
  .sometimes(x => x.degradeBy(0.3))
```

### 3.2 吐音與裝飾

- 可用 `sometimes(x => x.fast(2))` 在短時間內密集演奏，模擬顫音或快速裝飾音。
- 若未來使用更進階的合成器，可透過 LFO modulation 模擬氣流與 vibrato。

---

## 4. 二胡 / 弦樂（expressive lead）

Strudel 內建簡單波形，無法完全模擬擦弦，但可以用下列策略接近：

- 波形：`sawtooth` 或 `square` 加上濾波。
- 濾波：`lpf` 約 1200–2500 Hz。
- 微小的音量與 cutoff 變化：使用 `perlin` 或 `sine` pattern 控制 `gain`、`lpf`。

範例：

```js
const erhu_like = n("0 1 2 3 2 1 0 1")
  .scale("D:minor:pentatonic")
  .sound("sawtooth")
  .lpf(1800)
  .gain(0.25)
  .room(0.7)
  .gain(perlin.range(0.2, 0.35)) // 細微力度起伏
```

---

## 5. 鼓與打擊（木魚、鼓、鑼）

### 5.1 木魚 / 小擊樂

- 使用高頻 sample（例如 `hh`）＋高通濾波。
- 讓節奏留白，不要塞滿每一拍。

```js
const temple_wood = s("~ hh ~ hh*2")
  .gain(0.18)
  .hpf(3000)
  .pan(sine.slow(8))
```

### 5.2 低鼓 / 鑼感

- 使用 `bd` sample，搭配極低的 `lpf`。
- 節奏可以是每小節少量敲擊，營造儀式感。

```js
const temple_drum = s("bd ~ bd ~")
  .gain(0.35)
  .lpf(120)
```

---

## 6. Drone 與空間背景（山谷、寺廟）

Drone（持續音）是中國風冥想音樂中很好用的元素：

- 波形：`sine` 或 `triangle`
- 低頻：1–2 個音即可，例如 1 度或 5 度。
- 空間：大 `room()` + 偶爾 `delay()`。

```js
const valley_drone = note("f2*8")
  .sound("sine")
  .lpf(300)
  .gain(0.18)
  .room(0.9)
  .slow(4)
```

---

## 7. 實作建議

1. **從簡單開始**：先只用一條主旋律 + 一條 drone，確定氣質到位，再逐漸加上 arp 與打擊。
2. **一首歌只用 2–3 種主要音色**：避免聽覺太雜，讓聽者更專注在旋律與空間感。
3. **用 pattern 操作做「表情」而不是換 chord**：用 `every`、`sometimes`、`degradeBy` 等讓旋律與節奏有細微變化，而不是一直換和弦進行。
4. **如果覺得太「西洋」**：試著減少和弦堆疊，回到單聲部＋ drone，並確保主旋律限制在五聲音階的 5 個音上。

後續若你接上外部合成器或採樣（例如真實古箏 sample），這些 pattern 仍可以直接重用，只需把 `.sound("sine")` 改成對應音源的名稱即可。
