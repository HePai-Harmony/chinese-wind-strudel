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
