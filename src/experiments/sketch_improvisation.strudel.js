// src/experiments/sketch_improvisation.strudel.js
//
// 實驗主題：即興／隨機化實驗
// 概念：使用 rand、perlin 等隨機函數，讓音樂「自己演奏」
// 適合場景：生成音樂、氛圍背景、永不重複的聲音織體
//
// ──────────────────────────────────────────────

setcpm(65) // 中等速度

// ==============================
// 核心概念：隨機旋律生成器
// ==============================

// 完全隨機的五聲音階旋律
const improv_melody_random = n(rand.range(0, 12).segment(32))
  .scale("A2:minor:pentatonic")  // 羽調式（柔和）
  .sound("sine")
  .lpf(perlin.range(800, 2000))  // 濾波也隨機
  .gain(perlin.range(0.22, 0.35)) // 音量也隨機
  .room(perlin.range(0.6, 0.9))   // 空間也隨機
  .pan(perlin.range(0, 1).slow(8)) // Pan 緩慢飄移
  .degradeBy(0.4);                 // 40% 音符省略

// ==============================
// 隨機節奏生成器
// ==============================

// 隨機鼓點（使用 <> 選擇）
const improv_drums_random = s("<bd ~ sd ~> <bd bd ~ sd> <~ bd sd ~>")
  .gain(perlin.range(0.24, 0.36))
  .lpf(perlin.range(100, 250))
  .sometimes(x => x.fast(2))
  .rarely(x => x.rev());

// 隨機高頻打擊
const improv_hh_random = s("hh*<4 6 8 12 16>")
  .gain(perlin.range(0.12, 0.24))
  .hpf(perlin.range(4000, 8000))
  .pan(rand.range(0, 1))
  .degradeBy(rand.range(0.3, 0.7));

// ==============================
// Perlin Noise 控制的 Drone
// ==============================

// Drone 音高隨 perlin 緩慢變化
const improv_drone_perlin = note("c2")
  .add(perlin.range(-3, 3).slow(32))  // 音高微微飄移
  .sound("sine")
  .lpf(perlin.range(150, 400).slow(16))
  .gain(perlin.range(0.14, 0.22).slow(12))
  .room(perlin.range(0.85, 0.98).slow(20));

// ==============================
// 自我對話：兩個即興聲部
// ==============================

// 聲部 A：快速、高音
const improv_voice_a = n(rand.range(4, 12).segment(16))
  .scale("C:major:pentatonic")
  .sound("triangle")
  .fast(2)
  .lpf(2000)
  .gain(0.26)
  .pan(0.3)  // 偏左
  .degradeBy(0.5)
  .sometimes(x => x.fast(2));

// 聲部 B：慢速、低音
const improv_voice_b = n(rand.range(0, 6).segment(8))
  .scale("A2:minor:pentatonic")
  .sound("sine")
  .slow(2)
  .lpf(1200)
  .gain(0.28)
  .pan(0.7)  // 偏右
  .degradeBy(0.3)
  .sometimes(x => x.add(7))  // 偶爾跳高八度
  .late(0.5);  // 延遲回應

// 對話組合
const improv_dialogue = stack(
  improv_voice_a,
  improv_voice_b
).room(0.8);

// ==============================
// 全隨機即興
// ==============================

const improv_full_random = stack(
  // 旋律層
  improv_melody_random,

  // 節奏層
  improv_drums_random,
  improv_hh_random,

  // Drone 層
  improv_drone_perlin,

  // 對話層
  improv_dialogue
)
  .every(rand.range(4, 16), x => x.fast(rand.range(0.5, 2)))  // 隨機加速減速
  .sometimes(x => x.room(0.95))
  .rarely(x => x.lpf(400));  // 極少數變得極遠

// ==============================
// 受控隨機：保持調性
// ==============================

// 只在五聲音階的特定音上隨機選擇
const improv_controlled = n("<0 2 4> <2 3 4> <0 3 4> <2 4 7>".choose())
  .scale("F:major:pentatonic")
  .sound("triangle")
  .lpf(sine.range(1200, 2000).slow(8))  // 用 sine 比 perlin 更可預測
  .gain(0.30)
  .room(0.75)
  .stack(
    // 低音支撐（不隨機）
    note("f2*8").sound("sine").lpf(200).gain(0.18).room(0.9)
  );

// ==============================
// 漸變式即興：從簡單到複雜
// ==============================

// 階段 1：只有 drone
const improv_stage_1 = improv_drone_perlin;

// 階段 2：drone + 簡單旋律
const improv_stage_2 = stack(
  improv_drone_perlin,
  improv_melody_random.degradeBy(0.7).slow(2)  // 極稀疏
);

// 階段 3：加入節奏
const improv_stage_3 = stack(
  improv_stage_2,
  improv_drums_random.gain(0.20)  // 較小聲
);

// 階段 4：全部元素
const improv_stage_4 = improv_full_random;

// 使用 slowcat 做漸進式演化
const improv_evolution = slowcat(
  improv_stage_1,  // 8 cycles
  improv_stage_2,  // 8 cycles
  improv_stage_3,  // 8 cycles
  improv_stage_4   // 持續
);

// ==============================
// 極端實驗：混沌即興
// ==============================

// 所有參數都極度隨機
const improv_chaos = n(rand.range(0, 20).segment(64))  // 音符數量很多
  .scale("<C:major:pentatonic A2:minor:pentatonic F:major:pentatonic>".choose())
  .sound("<sine triangle sawtooth square>".choose())
  .lpf(rand.range(400, 4000))
  .hpf(rand.range(0, 1000))
  .gain(rand.range(0.1, 0.4))
  .room(rand.range(0.3, 0.99))
  .pan(rand.range(0, 1))
  .delay(rand.range(0, 0.8))
  .delayfeedback(rand.range(0, 0.9))
  .degradeBy(rand.range(0, 0.9))
  .sometimes(x => x.fast(rand.range(0.25, 4)))
  .rarely(x => x.rev());

// ==============================
// 播放建議
// ==============================
//
// 建議播放：
//   improv_full_random     // 完整即興（推薦）
//   improv_dialogue        // 對話版本（較有結構）
//   improv_controlled      // 受控隨機（較保守）
//   improv_evolution       // 漸進式演化
//   improv_chaos           // 混沌實驗（極端）
//
// 實驗建議：
// - 每次播放都會不一樣！重新整理頁面聽不同版本
// - 調整 .segment() 的數字改變隨機更新頻率
// - 試著把某些 rand 改成 perlin（更平滑）
// - 或把 perlin 改成 rand（更跳躍）
//
// Perlin vs Rand：
// - perlin：緩慢、平滑、連續變化（適合音量、濾波）
// - rand：快速、跳躍、不連續（適合選擇、觸發）
//
// 進階技巧：
// - 使用 .segment(n) 控制隨機更新頻率
//   - segment(4)：每 1/4 cycle 更新一次（快速變化）
//   - segment(32)：每 1/32 cycle 更新一次（極快變化）
// - 使用 .slow(n) 讓 perlin 變化更慢
//   - slow(4)：4 倍慢（更平滑）
//   - slow(32)：32 倍慢（幾乎不變）
//
// ──────────────────────────────────────────────
