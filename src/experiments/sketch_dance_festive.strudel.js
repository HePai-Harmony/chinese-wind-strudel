// src/experiments/sketch_dance_festive.strudel.js
//
// 實驗主題：較快的舞曲欢庆風格
// 概念：保持五聲音階中國風，但節奏更快、更有律動感
// 適合場景：慶典、節日、活潑的場合
//
// ──────────────────────────────────────────────

setcpm(90) // 較快，但不至於太 EDM（約 90 BPM）

// ==============================
// 節奏基底：活潑鼓組
// ==============================

// 主鼓組（四四拍，較滿）
const dance_drums_main = s("bd sd bd sd, hh*8")
  .gain(0.34)
  .lpf(200)
  .stack(
    s("~ ~ cp ~").gain(0.30)  // 掌聲感（第三拍）
  );

// 副鼓組（加花）
const dance_drums_fill = s("~ ~ hh*4 ~, ~ bd ~ ~")
  .gain(0.28)
  .hpf(3000)
  .sometimes(x => x.fast(2));

// ==============================
// 旋律：快速五聲音階跑句
// ==============================

// 主旋律：徵調式（昂揚感）
const dance_melody_main = n("0 2 3 4 3 2 0 3")
  .scale("C:major:pentatonic")
  .add(3)  // 徵調式
  .sound("triangle")
  .lpf(2200)
  .gain(0.32)
  .release(0.15)
  .room(0.65);

// 快速跑句（裝飾）
const dance_run_ornament = run(8)
  .scale("C:major:pentatonic")
  .fast(2)
  .sound("triangle")
  .lpf(2500)
  .gain(0.26)
  .release(0.12)
  .room(0.6)
  .every(4, x => x.rev());  // 每 4 拍反轉

// ==============================
// 伴奏：快速古箏琶音
// ==============================

const dance_guzheng_fast = n("<0 4 2 4> <0 2 4 2> <0 3 4 3> <2 4 0 4>")
  .scale("F:major:pentatonic")
  .sound("triangle")
  .lpf(1900)
  .gain(0.28)
  .room(0.7)
  .release(0.18)
  .fast(1.5)
  .every(2, x => x.rev())
  .sometimes(x => x.fast(2));

// ==============================
// Bass Line：五聲音階 bassline
// ==============================

// 低音旋律線（支撐節奏）
const dance_bass_line = n("<0 0 4 0> <0 0 3 0>")
  .scale("C:major:pentatonic")
  .sound("sawtooth")
  .lpf(350)
  .gain(0.30)
  .room(0.4)
  .octave(2);  // 低八度

// ==============================
// 高潮段落：層層疊加
// ==============================

const dance_climax = stack(
  // 鼓組
  dance_drums_main,
  dance_drums_fill,

  // 旋律層
  dance_melody_main,
  dance_run_ornament.late(0.5),  // 稍微延遲，製造對話

  // 伴奏層
  dance_guzheng_fast,
  dance_bass_line,

  // 高音點綴
  n("4 ~ 7 ~")
    .scale("C:major:pentatonic")
    .add(7)  // 高八度
    .sound("sine")
    .lpf(3000)
    .gain(0.22)
    .room(0.8)
    .sometimes(x => x.add(7))  // 偶爾再高八度
)
  .every(8, x => x.sometimes(y => y.fast(2)))  // 偶爾加速
  .every(16, x => x.degradeBy(0.1));           // 偶爾稀疏

// ==============================
// 變化版本：加入「吆喝」感
// ==============================

// 模擬人聲吆喝（用快速音符）
const dance_vocal_call = n("0 0 2 2 4 4 3 3")
  .scale("C:major:pentatonic")
  .fast(3)
  .sound("square")
  .lpf(1500)
  .gain(0.24)
  .room(0.6)
  .degradeBy(0.5)  // 50% 省略（不要太吵）
  .every(8, x => x.rev());

const dance_with_vocals = stack(
  dance_climax,
  dance_vocal_call
);

// ==============================
// 變化版本：漸進式 build-up
// ==============================

// 從簡單開始，逐步加入元素
const dance_intro = stack(
  dance_drums_main.gain(0.28),
  dance_bass_line
);

const dance_verse = stack(
  dance_intro,
  dance_melody_main.slow(2)
);

const dance_chorus = stack(
  dance_verse,
  dance_guzheng_fast,
  dance_run_ornament
);

// 完整結構（使用 slowcat 輪流播放）
const dance_full_structure = slowcat(
  dance_intro,   // 8 cycles: 只有鼓 + bass
  dance_verse,   // 8 cycles: 加入旋律
  dance_chorus,  // 8 cycles: 全部元素
  dance_climax   // 持續: 高潮
);

// ==============================
// 播放建議
// ==============================
//
// 建議播放：
//   dance_climax          // 直接高潮（推薦試聽）
//   dance_full_structure  // 完整結構（有起承轉合）
//   dance_with_vocals     // 加入「吆喝」版本
//
// 實驗建議：
// - 調整 setcpm（70-110）感受不同速度
// - 試著只播放 dance_drums_main + dance_bass_line（極簡舞曲）
// - 改變 scale 到 "F:major:pentatonic" 或其他調性
// - 使用 .fast(2) 讓整首曲子加速一倍
//
// Live Coding 技巧：
// - 從 dance_intro 開始播放
// - 手動切換到 dance_verse（加入旋律）
// - 再切到 dance_chorus（全部元素）
// - 最後到 dance_climax（高潮保持）
//
// ──────────────────────────────────────────────
