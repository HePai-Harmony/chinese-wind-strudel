# 中國五聲音階與宮商角徵羽對照

本檔案整理傳統中國五聲音階「宮、商、角、徵、羽」與西方音名、度數，以及在 Strudel 中常用的 scale 寫法對照。

> 備註：為方便在 Strudel 中使用，以下皆以等分律近似表示（例如以 C 大調五聲音階 C–D–E–G–A 來代表宮調式），
> 真實古代律制（十二律、三分損益法等）在頻率上會有細微差異。

---

## 1. 宮商角徵羽與 Do Re Mi So La

在最常見的教學中，中國五聲音階可視為：

- 宮（gōng） ≈ 1 度 = Do
- 商（shāng） ≈ 2 度 = Re
- 角（jué）   ≈ 3 度 = Mi
- 徵（zhǐ）   ≈ 5 度 = So
- 羽（yǔ）    ≈ 6 度 = La

若以 C 作為 1 度（Do），則對應的音高約為：

- 宮：C
- 商：D
- 角：E
- 徵：G
- 羽：A

也就是西方所謂「C major pentatonic」：C–D–E–G–A。

---

## 2. 常見五聲調式（以 C pentatonic 旋轉）

以下用「1 2 3 5 6」代表 pentatonic 度數，起點不同產生不同調式。
實際演奏時可依情緒選擇根音與音域。

### 2.1 宮調式（Gong mode）

- 度數：1 2 3 5 6
- 以 C 為 1：C D E G A
- 氣質：穩定、端正、明朗，常作為「中庸」「正氣」的象徵。
- Strudel 寫法示例：

  ```js
  n("0 1 2 3 4 3 2 1")
    .scale("C:major:pentatonic")
  ```

### 2.2 商調式（Shang mode）

- 度數：2 3 5 6 1
- 以 C 為 1 時，可視為 D–E–G–A–C。
- 氣質：清朗、偏向向外的動感，有時帶一點悲愴或訴說感。

在 Strudel 中沒有直接稱為「Shang mode」的預設 scale，
可以用同一套 pentatonic 音級，改變旋律重心或 transpose 來表現：

```js
n("0 1 3 4 1 0")
  .scale("C:major:pentatonic")
  .add(1) // 以第二級為感覺上的「主音」
```

### 2.3 角調式（Jue mode）

- 度數：3 5 6 1 2
- C 基準下可視為 E–G–A–C–D。
- 氣質：較為清幽、帶有一點伸展感，常被形容為「開闊中的哀愁」。

Strudel 中同樣以 pentatonic 為母體，改用第三級作為旋律重心，或加 `add(2)`：

```js
n("0 2 3 4 2 0")
  .scale("C:major:pentatonic")
  .add(2)
```

### 2.4 徵調式（Zhi mode）

- 度數：5 6 1 2 3
- C 基準下可視為 G–A–C–D–E。
- 氣質：奔放、明亮，常用於較歡樂或昂揚的段落。

```js
n("0 1 2 3 4")
  .scale("C:major:pentatonic")
  .add(3)
```

### 2.5 羽調式（Yu mode）

- 度數：6 1 2 3 5
- C 基準下可視為 A–C–D–E–G。
- 氣質：帶有柔和、略為內斂甚至偏悲傷的色彩。

在實作上，也可以直接選用 `A:minor:pentatonic` 來模擬偏「羽」的感受：

```js
n("0 1 3 4 1 0")
  .scale("A2:minor:pentatonic")
```

---

## 3. 在 Strudel 中使用五聲音階

### 3.1 以數字搭配 `.scale()` 的基本方式

```js
setcpm(60)

n("0 2 4 3 2 0 [4 2] 0")
  .scale("C:major:pentatonic")
  .sound("piano")
```

說明：

- `n("0 2 4 ...")` 代表選擇五聲音階中的第 1、3、5... 個音（0 為第一個）。
- `.scale("C:major:pentatonic")` 設定音階為 C 大調五聲音階。
- 若改成 `.scale("A2:minor:pentatonic")` 則會得到偏陰柔的 minor pentatonic 色彩。

### 3.2 以 root 變換模擬不同調式

你可以用同樣的旋律數字，改變根音來模擬不同情緒，例如：

```js
// 宮調式感：穩定、明亮
n("0 1 2 3 4 3 2 1")
  .scale("C:major:pentatonic")

// 羽調式感：較柔和、內斂
n("0 1 2 3 4 3 2 1")
  .scale("A2:minor:pentatonic")
```

---

## 4. 建議的實作策略

在本專案中，建議：

1. **主旋律**：多以 `C:major:pentatonic` 或 `F:major:pentatonic` 為基礎，
   再透過 `add()` 或 `scaleTranspose()` 去偏向不同模式（宮／商／角／徵／羽）。
2. **悲傷或夜色場景**：優先考慮 `A2:minor:pentatonic` 等 minor pentatonic。
3. **調性變化**：可在長時間演進中，逐步從宮 → 商 → 羽 等模式切換，
   讓樂曲有「空間移動」或「情緒轉調」的感覺。
4. **避免頻繁使用半音**：中國風主題中，除非刻意設計，不建議大量 chromatic line，
   將重心放在 1–2–3–5–6 的五個音上，會讓風格更集中。

---

## 5. 常見錯誤與避免方法

### 5.1 錯誤：聽起來太「西方」

**症狀**：明明用了五聲音階，卻還是覺得像流行歌或爵士樂。

**原因**：
- 使用了太多西方和聲進行（如 I-IV-V-I）
- 節奏太規律、太填滿，缺乏留白
- 音色太現代（heavy bass、distortion）

**解決方法**：
```js
// ❌ 太西方
stack(
  n("0 2 4 7").scale("C:major:pentatonic"),  // I-iii-V-vii 感覺
  note("c2 f2 g2 c2").sound("sawtooth")      // 四五度進行
).fast(2) // 太快

// ✅ 更中國風
stack(
  n("0 2 3 4 2 0").scale("C:major:pentatonic").slow(2),  // 級進為主
  note("c2*8").sound("sine").lpf(200)                     // 單一 drone
).degradeBy(0.2).room(0.8) // 留白 + 空間
```

### 5.2 錯誤：調式混淆

**症狀**：想做「宮調式」，結果聽起來像「商調式」。

**原因**：
- 旋律的「落腳點」（ending note）不在預期的主音上
- `add()` 的數字用錯

**解決方法**：
```js
// 確保旋律結束在你想要的主音
// 宮調式：結束在 0（第一級）
n("0 2 4 3 2 0").scale("C:major:pentatonic")  // ✅ 結束在宮

// 商調式：結束在 1（第二級）
n("1 3 4 0 1").scale("C:major:pentatonic").add(1)  // ✅ 結束在商
```

### 5.3 錯誤：音域過窄或過寬

**症狀**：旋律聽起來單調（音域太窄）或不連貫（音域太寬）。

**解決方法**：
```js
// 音域太窄（只在一個八度內）
n("0 1 2 1 0 1 2 1")  // ❌ 單調

// 適中音域（1.5-2 個八度）
n("0 2 4 7 9 7 4 2 0")  // ✅ 更有起伏

// 跨八度技巧
n("0 2 4").add("<0 7 14>")  // 同樣旋律在不同八度
```

---

## 6. 調式轉換速查表

| 起始調式 | 目標調式 | 轉換方法 | 情緒變化 |
|---------|---------|---------|---------|
| 宮（穩定）| 商（敘事）| `.add(1)` | 明朗 → 外放 |
| 宮（穩定）| 角（開闊）| `.add(2)` | 明朗 → 哀愁 |
| 宮（穩定）| 羽（柔和）| 改用 `minor:pentatonic` | 明朗 → 內斂 |
| 羽（柔和）| 宮（穩定）| 改用 `major:pentatonic` | 內斂 → 明朗 |
| 宮（明亮）| 徵（昂揚）| `.add(3)` | 明朗 → 奔放 |

**實戰範例**：

```js
// 從宮調式漸進到羽調式（情緒由明轉暗）
const melody_gong = n("0 2 4 3 2 0").scale("C:major:pentatonic")
const melody_yu = n("0 2 3 4 3 2 0 4").scale("A2:minor:pentatonic")

// 使用 cat (連接) 做轉調
melody_gong.cat(melody_yu)  // 先明後暗

// 使用 slowcat 做週期性轉調
slowcat(melody_gong, melody_yu)  // 輪流出現
```

---

## 7. 實戰案例分析

### 案例 1：山水行旅（明亮 → 沉靜）

```js
// 起點：宮調式（明朗的山路）
const section_a = n("0 1 2 3 4 3 2 1")
  .scale("F:major:pentatonic")
  .sound("triangle")
  .slow(2)

// 過渡：角調式（開闊但帶哀愁）
const section_b = n("0 2 3 4 3 2 0")
  .scale("F:major:pentatonic")
  .add(2)
  .sound("sine")
  .lpf(1200)
  .slow(2)

// 終點：羽調式（夜幕降臨）
const section_c = n("0 2 3 4 3 2 0 4")
  .scale("D:minor:pentatonic")
  .sound("sine")
  .lpf(800)
  .room(0.9)
  .slow(3)

// 完整行旅
slowcat(section_a, section_b, section_c)
```

### 案例 2：廟宇儀式（莊嚴感）

```js
// 使用徵調式（昂揚）+ 極慢速度 + 低頻 drone
const temple_theme = n("0 2 3 4")
  .scale("C:major:pentatonic")
  .add(3)  // 徵調式
  .sound("sine")
  .slow(4)
  .stack(
    note("c1*8").sound("sine").lpf(100).gain(0.2)  // 極低 drone
  )
  .room(0.95)
```

### 案例 3：即興對話（動態調式）

```js
// 兩個聲部在不同調式中對話
const voice_a = n("0 2 4 3").scale("C:major:pentatonic")  // 宮
const voice_b = n("0 2 3 4").scale("A2:minor:pentatonic")  // 羽

stack(
  voice_a.sound("sine").pan(0.3),
  voice_b.sound("triangle").pan(0.7).late(0.5)  // 延遲回應
)
```

---

## 8. 進階技巧

### 8.1 調式混合（Modal Mixture）

```js
// 在同一段落中混合宮調式與羽調式
const mixed_melody = n("<0 2 4 3> <0 2 3 4>")
  .scale("<C:major:pentatonic A2:minor:pentatonic>")
  .sound("sine")
  .slow(2)
```

### 8.2 轉調（Modulation）

```js
// 從 C pentatonic 轉到 F pentatonic
const phrase_1 = n("0 2 4 3 2 0").scale("C:major:pentatonic")
const phrase_2 = n("0 2 4 3 2 0").scale("F:major:pentatonic")

cat(phrase_1, phrase_2)  // 順暢轉調
```

### 8.3 平行調式（Parallel Modes）

```js
// 同根音，不同調式（C major pentatonic vs C minor pentatonic）
const bright = n("0 2 4 7").scale("C:major:pentatonic")
const dark = n("0 2 4 7").scale("C:minor:pentatonic")

slowcat(bright, dark)  // 明暗對比
```

### 8.4 臨時變化音（Chromatic Passing Tones）

```js
// 偶爾加入半音經過音（謹慎使用）
n("0 2 <4 4.5> 5")  // 在 4 和 5 之間偶爾加入半音
  .scale("C:major:pentatonic")
  .sometimes(x => x.sub(0.5))  // 隨機降半音
```

---

## 9. 快速參考卡

```
五聲音階 = 1 2 3 5 6 (Do Re Mi So La)

宮調式 (Gong)  = 1 2 3 5 6 → 穩定、明朗
商調式 (Shang) = 2 3 5 6 1 → 敘事、外放
角調式 (Jue)   = 3 5 6 1 2 → 開闊、哀愁
徵調式 (Zhi)   = 5 6 1 2 3 → 昂揚、奔放
羽調式 (Yu)    = 6 1 2 3 5 → 柔和、內斂

Strudel 常用：
- C:major:pentatonic  → C D E G A (宮調式感)
- A2:minor:pentatonic → A C D E G (羽調式感)
- 用 .add(n) 改變重心，模擬不同調式
```

---

## 10. 延伸資源

- 實作案例：參考 `src/chinese_wind_01.strudel.js` 和 `chinese_wind_02.strudel.js`
- 更多 motif：查看 `src/motifs_library.strudel.js`
- 音色設計：參考 `reference/sound_design_notes.md`
