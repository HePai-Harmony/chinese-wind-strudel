// src/experiments/sketch_zen_meditation.strudel.js
//
// 實驗主題：極簡禪修風格
// 概念：大量留白、極慢節奏、單純的五聲音階與 drone
// 適合場景：靜坐、冥想、瑜伽背景音樂
//
// ──────────────────────────────────────────────

setcpm(45) // 極慢，比心跳還慢一點

// ==============================
// 核心元素：極簡 Drone
// ==============================

// 單一低頻 drone（幾乎聽不見，但能感覺到）
const zen_drone_deep = note("c1*8")
  .sound("sine")
  .lpf(80)
  .gain(0.14)
  .room(0.98)
  .slow(8);

// 中頻 drone（稍微明顯一點）
const zen_drone_mid = note("g2*6")
  .sound("sine")
  .lpf(250)
  .gain(0.16)
  .room(0.95)
  .slow(6);

// ==============================
// 旋律：極度稀疏的五聲音階
// ==============================

// 主旋律：每 4 拍只有 1-2 個音
const zen_melody_sparse = n("0 ~ ~ ~ 2 ~ ~ ~ 3 ~ ~ ~ 0 ~ ~ ~")
  .scale("C:major:pentatonic")
  .sound("sine")
  .lpf(1000)
  .gain(0.26)
  .room(0.9)
  .slow(4)
  .degradeBy(0.3); // 30% 機率更稀疏

// 回聲旋律（延遲 8 拍）
const zen_melody_echo = zen_melody_sparse
  .late(8)
  .gain(0.18)
  .lpf(800);

// ==============================
// 打擊：極簡木魚／鐘聲
// ==============================

// 遠方的鐘聲（每 16 拍一次）
const zen_bell_distant = s("bd ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~")
  .gain(0.20)
  .lpf(60)
  .room(0.98)
  .slow(2);

// 偶爾的木魚（隨機出現）
const zen_wood_occasional = s("~ ~ ~ hh")
  .gain(0.14)
  .hpf(4000)
  .room(0.85)
  .degradeBy(0.7) // 70% 機率省略
  .slow(4);

// ==============================
// 全曲組合：禪修靜坐
// ==============================

const zen_meditation_full = stack(
  zen_drone_deep,
  zen_drone_mid,
  zen_melody_sparse,
  zen_melody_echo,
  zen_bell_distant,
  zen_wood_occasional
)
  .every(32, x => x.lpf(200).gain(0.18))  // 每 32 拍極度安靜一次
  .every(64, x => x.room(0.99));          // 偶爾無限遠

// ==============================
// 變化版本：呼吸感
// ==============================

const zen_breathing = stack(
  zen_drone_deep,
  zen_melody_sparse
    .gain(perlin.range(0.18, 0.30).slow(16))  // 音量像呼吸
    .lpf(sine.range(600, 1200).slow(12))      // 濾波像呼吸
)
  .room(sine.range(0.85, 0.98).slow(20));     // 空間像呼吸

// ==============================
// 變化版本：完全寂靜
// ==============================

const zen_silence = stack(
  zen_drone_deep.gain(0.08),  // 極小
  n("0 ~ ~ ~ ~ ~ ~ ~")        // 極稀疏（每 8 拍一個音）
    .scale("C:major:pentatonic")
    .sound("sine")
    .lpf(400)
    .gain(0.15)
    .room(0.99)
    .slow(8)
    .degradeBy(0.8)             // 80% 省略
);

// ==============================
// 播放建議
// ==============================
//
// 建議播放：
//   zen_meditation_full  // 完整版（推薦）
//   zen_breathing        // 呼吸版（更動態）
//   zen_silence          // 寂靜版（最極簡）
//
// 實驗建議：
// - 調整 setcpm（30-60 之間）感受不同呼吸節奏
// - 試著移除某些層（如 zen_wood_occasional）
// - 增加 .degradeBy 數值做更稀疏版本
// - 配合實際靜坐，找出最舒服的速度
//
// ──────────────────────────────────────────────
