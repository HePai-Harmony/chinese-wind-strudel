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

---

## 8. 效果鏈組合建議

### 8.1 常見效果組合

#### 山谷回聲（Valley Reverb）

```js
const valley_echo = x => x
  .room(0.92)        // 極大空間
  .delay(0.3)        // 中等延遲
  .delayfeedback(0.6) // 中等回授
  .lpf(1200)         // 柔和高頻
  .gain(0.24)

// 使用範例
motif_yu_night.pipe(valley_echo)
```

#### 廟宇層疊（Temple Echo）

```js
const temple_layers = x => x
  .delay(0.5)        // 較長延遲
  .delayfeedback(0.8) // 高回授（多次回聲）
  .room(0.85)
  .lpf(1500)
  .hpf(200)          // 去除過低頻率

// 適合用於儀式感鼓聲
temple_drum.pipe(temple_layers)
```

#### 雨聲氛圍（Rain Ambient）

```js
const rain_texture = x => x
  .room(0.75)
  .lpf(perlin.range(800, 1800))  // 動態濾波
  .hpf(perlin.range(200, 600))
  .gain(perlin.range(0.2, 0.35)) // 動態音量
  .pan(sine.slow(8))              // 緩慢 pan

// 適合高頻打擊
s("hh*16").pipe(rain_texture)
```

#### 遠山模糊（Distant Mountain）

```js
const distant_blur = x => x
  .lpf(400)          // 極低濾波（只留低頻）
  .room(0.95)        // 最大空間
  .gain(0.18)        // 極小音量
  .delay(0.7)
  .delayfeedback(0.9) // 幾乎無限回聲

// 適合 drone 或背景 pad
valley_drone.pipe(distant_blur)
```

### 8.2 效果疊加順序建議

```js
// 推薦順序：濾波 → 空間效果 → 音量
note("c4")
  .sound("sine")
  .lpf(1200)        // 1. 先濾波
  .room(0.8)        // 2. 再加空間
  .delay(0.5)       // 3. 延遲
  .gain(0.3)        // 4. 最後調音量
```

---

## 9. 參數調整指南

### 9.1 Room（Reverb）參數表

| 數值範圍 | 空間感 | 適用場景 | 範例 |
|---------|--------|---------|------|
| 0.0-0.3 | 極小（室內） | 不適合中國風 | - |
| 0.4-0.6 | 小空間（房間） | 古箏獨奏、近距對話 | 客廳演奏 |
| 0.7-0.8 | 中等空間（廳堂） | 一般旋律、伴奏 | 大廳、竹林 |
| 0.85-0.92 | 大空間（山谷） | drone、遠景旋律 | 山谷、湖面 |
| 0.93-0.99 | 極大空間（無限） | 特殊效果、氛圍層 | 洞穴、天空 |

### 9.2 LPF（Low-Pass Filter）參數表

| Cutoff 頻率 | 音色特徵 | 適用樂器 | 範例 |
|------------|---------|---------|------|
| 60-150 Hz | 極悶、極遠 | 遠方鼓聲、極低 drone | 遠山鼓聲 |
| 200-500 Hz | 低頻為主 | 寺廟鐘聲、低 drone | 晨鐘 |
| 600-1000 Hz | 柔和、溫暖 | 簫、夜色旋律 | 夜簫 |
| 1200-1800 Hz | 適中、自然 | 古箏、二胡、一般旋律 | 日常演奏 |
| 2000-3000 Hz | 明亮、清晰 | 笛子、高音古箏 | 清晨笛聲 |
| 3000+ Hz | 極亮、刺耳 | 一般不用（除非特殊效果） | - |

### 9.3 Gain（音量）平衡建議

```js
// 典型音量層次（由大到小）
const main_melody = ...gain(0.30-0.35)    // 主旋律最響
const accompaniment = ...gain(0.24-0.28)  // 伴奏適中
const drone = ...gain(0.16-0.20)          // drone 較小
const percussion = ...gain(0.22-0.30)     // 打擊適中（依風格）
const ambient = ...gain(0.10-0.18)        // 氛圍層最小
```

### 9.4 Delay 參數建議

| Delay Time | Feedback | 效果 | 適用場景 |
|-----------|----------|------|---------|
| 0.125-0.25 | 0.3-0.5 | 短回聲（加厚感） | 增加旋律豐富度 |
| 0.3-0.5 | 0.5-0.7 | 中等回聲（山谷感） | 山谷、空曠場景 |
| 0.5-0.8 | 0.7-0.9 | 長回聲（無盡感） | 洞穴、廟宇 |
| 1.0+ | 0.9+ | 極長回聲（迷幻） | 特殊效果、實驗性 |

---

## 10. 常見問題解答

### Q1: 為什麼我的音樂聽起來「糊成一片」？

**原因**：
- reverb (room) 值太高（>0.95）
- delay feedback 太高（>0.9）
- 所有聲部都用了大量空間效果

**解決方法**：
```js
// ❌ 過度 reverb
stack(
  melody.room(0.95),
  arp.room(0.95),
  drone.room(0.95)
)  // 全部糊在一起

// ✅ 差異化處理
stack(
  melody.room(0.7),      // 主旋律適中
  arp.room(0.85),        // 伴奏較多
  drone.room(0.95)       // 只有 drone 極多
)
```

### Q2: 為什麼聽起來太「安靜」或太「吵」？

**原因**：gain 值不平衡。

**解決方法**：
```js
// 使用 gain 分層
const loud_layer = melody.gain(0.35)      // 最響
const mid_layer = arp.gain(0.26)          // 中等
const quiet_layer = drone.gain(0.16)      // 安靜

// 整體降低
stack(loud_layer, mid_layer, quiet_layer)
  .gain(0.7)  // 整體音量打折
```

### Q3: 為什麼我的古箏聽起來像電吉他？

**原因**：
- 使用了 sawtooth 或 square 波形
- lpf 值太高（>2000 Hz）
- 沒有設定 release（持續音）

**解決方法**：
```js
// ❌ 像電吉他
n("0 2 4").sound("sawtooth").lpf(3000)

// ✅ 像古箏
n("0 2 4")
  .sound("triangle")  // 改用 triangle
  .lpf(1800)          // 降低 cutoff
  .release(0.2)       // 加入短 release
  .room(0.7)          // 適度空間
```

### Q4: 如何做出「時有時無」的感覺？

使用 `degradeBy()` 和 `sometimes()`：

```js
// 40% 機率省略音符
melody.degradeBy(0.4)

// 隨機快兩倍
melody.sometimes(x => x.fast(2))

// 偶爾反轉
melody.sometimes(x => x.rev())

// 組合使用
melody
  .degradeBy(0.3)
  .sometimes(x => x.fast(2))
  .rarely(x => x.add(7))  // 極少數跳高八度
```

### Q5: 如何做出「呼吸感」？

使用 perlin 或 sine 控制參數：

```js
// 音量呼吸
melody.gain(perlin.range(0.2, 0.35).slow(8))

// 濾波呼吸
melody.lpf(sine.range(800, 1600).slow(6))

// 空間呼吸
melody.room(sine.range(0.5, 0.9).slow(10))

// 組合呼吸
melody
  .gain(perlin.range(0.25, 0.35).slow(8))
  .lpf(sine.range(1000, 1800).slow(6))
  .pan(perlin.range(0.3, 0.7).slow(12))
```

---

## 11. 進階技巧

### 11.1 動態濾波掃頻

```js
// 緩慢掃頻（營造空間變化）
melody.lpf(sine.range(600, 2000).slow(16))

// 快速掃頻（模擬 wah 效果）
melody.lpf(sine.range(800, 3000).fast(4))

// Perlin 掃頻（更自然、不規律）
melody.lpf(perlin.range(1000, 2000).slow(8))
```

### 11.2 立體聲動態 Pan

```js
// 緩慢左右飄移
melody.pan(sine.slow(16))  // 0 到 1 之間

// 限制範圍（避免太極端）
melody.pan(sine.range(0.3, 0.7).slow(12))

// 隨機飄移（Perlin）
melody.pan(perlin.range(0, 1).slow(8))

// 固定位置（不同聲部）
stack(
  melody_a.pan(0.3),   // 偏左
  melody_b.pan(0.7)    // 偏右
)
```

### 11.3 多層 Drone 技巧

```js
// 三層 drone（不同頻率 + 不同濾波）
const drone_low = note("c1*8")
  .sound("sine")
  .lpf(100)
  .gain(0.18)

const drone_mid = note("c2*6")
  .sound("sine")
  .lpf(200)
  .gain(0.16)

const drone_high = note("g2*4")
  .sound("sine")
  .lpf(300)
  .gain(0.14)

const full_drone = stack(drone_low, drone_mid, drone_high)
  .room(0.95)
```

### 11.4 效果自動化（Automation）

```js
// 濾波隨時間變化
melody.lpf(time.range(800, 2000).slow(32))

// 音量漸強
melody.gain(time.range(0.1, 0.4).slow(16))

// 空間漸遠
melody.room(time.range(0.5, 0.95).slow(24))
```

### 11.5 條件式效果（Conditional FX）

```js
// 每 4 個 cycle 加一次 delay
melody.every(4, x => x.delay(0.5).delayfeedback(0.7))

// 偶爾降八度
melody.sometimes(x => x.sub(7))

// 極少數反轉
melody.rarely(x => x.rev())

// 組合條件
melody
  .every(8, x => x.fast(2))
  .sometimes(x => x.add(7))
  .rarely(x => x.degradeBy(0.5))
```

---

## 12. 音色設計速查表

```
古箏：triangle + lpf(1800) + release(0.2) + room(0.7)
簫：  sine + lpf(1200) + room(0.8) + slow(2)
二胡：sawtooth + lpf(1800) + gain(perlin) + room(0.7)
笛子：sine + lpf(1500) + room(0.75) + fast(1.5)

Drone：sine + lpf(200-400) + gain(0.16-0.20) + room(0.9)
木魚：hh + hpf(3000) + gain(0.18)
大鼓：bd + lpf(100-150) + gain(0.35) + room(0.85)

山谷：room(0.92) + delay(0.3) + lpf(1200)
廟宇：delay(0.5) + delayfeedback(0.8) + room(0.85)
雨聲：hh*16 + gain(perlin) + pan(perlin) + hpf(6000)
```

---

## 13. 延伸資源

- **實作案例**：`src/chinese_wind_01.strudel.js`、`src/chinese_wind_02.strudel.js`
- **Motif 素材**：`src/motifs_library.strudel.js`（包含預設效果鏈）
- **音階理論**：`reference/chinese_scales.md`
- **Strudel 官方文件**：https://strudel.cc/learn/

---

## 14. 實驗建議

1. **從單一效果開始**：先只用 room，確定空間感對了，再加 delay
2. **對比聆聽**：用同一段旋律，分別試 room(0.5) 和 room(0.9)，感受差異
3. **參數掃描**：用 `sine.range()` 讓參數自動變化，觀察哪個範圍最好聽
4. **效果鏈實驗**：試試不同的效果順序（lpf → room vs room → lpf）
5. **保存喜歡的組合**：把好聽的效果鏈存成 function，重複使用

祝創作愉快！🎵
