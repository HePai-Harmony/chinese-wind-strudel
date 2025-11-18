// src/chinese_wind_01.strudel.js
//
// Title: 山水問答 (Dialogues in Mountains and Rivers) - Enhanced Version
// A complete Chinese‑style Strudel piece with advanced variations.
// 可以直接整段貼到 https://strudel.cc 播放。
//
// ──────────────────────────────────────────────
// 作品概念：
// 以四段式結構 + 過渡段落，描繪山水行旅中的問答與沉思。
// 從山谷雲起 → 晨霧散去（過渡）→ 山路清行 → 溪澗水聲（過渡）
//    → 簫問水應 → 暮色漸濃（過渡）→ 雲散月明
//
// 創新元素：
// - 動態呼吸感（perlin/sine 控制音量、濾波、空間）
// - 更多樂器模擬（琵琶、編鐘、磬、二胡）
// - 微妙音高變化（滑音、顫音、portamento）
// - 意外元素（rarely 觸發的遠方鳥鳴、風聲）
// - 複雜節奏（polyrhythm、cross-rhythm）
// - 立體聲空間設計（動態 pan、聲場深度）
//
// 調性：C/F 大調五聲音階（宮調式）與 A 小調五聲音階（羽調式）
// 節奏：60 cpm，接近靜坐時的呼吸節奏
// ──────────────────────────────────────────────

setcpm(60) // 約等於 60 BPM，一次 cycle 一秒

// ==============================
// 0. 動態表情控制器
// ==============================
//
// 這些表情控制器讓音樂有「呼吸感」與「生命力」
// ==============================

// 呼吸式音量變化（8 拍一個週期）
const breath_gain = perlin.range(0.22, 0.35).slow(8);

// 脈動式濾波（12 拍一個週期）
const pulse_lpf = sine.range(800, 1800).slow(12);

// 飄移式 pan（16 拍一個週期）
const drift_pan = perlin.range(0.3, 0.7).slow(16);

// 空間深度變化（20 拍一個週期）
const space_depth = sine.range(0.7, 0.95).slow(20);

// ==============================
// I. 核心 Motifs（增強版）
// ==============================

// 宮調主旋律（加入微妙音高變化）
const motif_gong_main = n("0 1 2 3 4 3 2 1")
  .scale("C:major:pentatonic")
  .add(perlin.range(-0.05, 0.05).slow(32))  // 極微妙的音高飄移
  .sound("sine")
  .gain(breath_gain)
  .lpf(pulse_lpf)
  .room(0.75);

// 羽調夜曲（帶顫音效果）
const motif_yu_night = n("0 2 3 4 3 2 0 4")
  .scale("A2:minor:pentatonic")
  .sound("sine")
  .gain(perlin.range(0.24, 0.32).slow(6))   // 音量顫動
  .room(space_depth)
  .lpf(sine.range(1200, 1600).slow(8));     // 濾波顫動

// 古箏琶音（增強版 - 更複雜的 pattern）
const motif_guzheng_arp = n("<0 4 2 4> <0 2 4 2> <0 3 4 3> <2 4 0 4>")
  .scale("F:major:pentatonic")
  .sound("triangle")
  .lpf(1900)
  .gain(0.26)
  .room(0.8)
  .release(0.22)
  .pan(sine.range(0.4, 0.6).slow(8))        // 左右輕微擺動
  .every(3, x => x.fast(2))
  .sometimes(x => x.rev())
  .rarely(x => x.add(7));                    // 偶爾跳高八度

// 多層 drone（三個頻率層疊）
const motif_drone_valley = stack(
  note("f2*8").sound("sine").lpf(120).gain(0.16),   // 極低層
  note("c3*6").sound("sine").lpf(250).gain(0.14),   // 中低層
  note("f3*4").sound("sine").lpf(400).gain(0.12)    // 中音層
)
  .room(0.92)
  .slow(4)
  .gain(perlin.range(0.8, 1.0).slow(16));            // 整體呼吸

// 木魚 + 磬（複合音色）
const motif_temple_bells = stack(
  s("~ hh ~ hh*2").gain(0.16).hpf(3200),             // 木魚
  s("~ ~ ~ cp").gain(0.10).lpf(800).room(0.95)       // 磬（極低頻）
)
  .pan(drift_pan);

// 宮廷鼓組（polyrhythm）
const motif_drum_palace = stack(
  s("bd ~ ~ bd").gain(0.32).lpf(140),                // 大鼓（4 拍）
  s("~ sd ~ sd ~").gain(0.28).lpf(180),              // 小鼓（5 拍）
  s("hh*6").gain(0.10).hpf(5000)                     // 高頻（6 拍）
);

// 簫主題（加入滑音與呼吸）
const bamboo_flute_theme = n("4 3 2 0 2 3 4 7")
  .scale("F:major:pentatonic")
  .sound("sine")
  .lpf(sine.range(1000, 1400).slow(4))               // 音色變化模擬氣流
  .gain(perlin.range(0.24, 0.34).slow(6))            // 強弱變化
  .room(0.85)
  .every(2, x => x.slow(2))
  .sometimes(x => x.add(7))
  .sometimes(x => x.degradeBy(0.3))
  .rarely(x => x.add(perlin.range(-1, 1)));          // 偶爾微分音

// ==============================
// II. 新增樂器 Motifs
// ==============================

// 琵琶式快速撥弦
const motif_pipa_pluck = n("0 2 4 3 2 0 4 2")
  .scale("C:major:pentatonic")
  .fast(2)
  .sound("triangle")
  .lpf(2200)
  .gain(0.24)
  .release(0.12)
  .pan(rand.range(0.3, 0.7))                         // 隨機 pan
  .degradeBy(0.5);                                    // 50% 稀疏度

// 編鐘悠遠音色（極長 release）
const motif_bronze_bell = n("0 ~ ~ ~ 4 ~ ~ ~")
  .scale("C:major:pentatonic")
  .sound("sine")
  .lpf(600)
  .gain(0.20)
  .release(4)                                         // 極長餘韻
  .room(0.98)
  .delay(0.8)
  .delayfeedback(0.85)
  .slow(2);

// 二胡式拉弦（帶滑音）
const motif_erhu_slide = n("0 1 2 3")
  .scale("A2:minor:pentatonic")
  .sound("sawtooth")
  .lpf(perlin.range(1400, 2000).slow(4))
  .gain(perlin.range(0.20, 0.30).slow(6))
  .room(0.75)
  .slow(4)
  .sometimes(x => x.add(perlin.range(-0.3, 0.3)));   // 滑音效果

// 遠方鳥鳴（隨機出現）
const motif_bird_call = n(rand.range(7, 14))
  .scale("C:major:pentatonic")
  .sound("sine")
  .lpf(3000)
  .gain(0.12)
  .room(0.95)
  .pan(rand.range(0, 1))
  .fast(4)
  .degradeBy(0.9);                                    // 極稀疏

// ==============================
// III. 段落 I：山谷雲起 (Valley Mist) - Enhanced
// ==============================
//
// 創新元素：
// - 三層 drone 提供豐富低頻質感
// - 編鐘遠音營造空間深度
// - 隨機鳥鳴增加自然感
// - 動態空間變化（room 隨時間變化）
// ==============================

const valley_mist_enhanced = stack(
  // Drone 層（三個頻率）
  motif_drone_valley,

  // 主旋律層（羽調式 + 呼吸感）
  motif_yu_night.slow(2),

  // 打擊層（木魚 + 磬）
  motif_temple_bells,

  // 遠景層（編鐘）
  motif_bronze_bell.gain(0.15),

  // 自然音效（極稀疏的鳥鳴）
  motif_bird_call
)
  .every(16, x => x.degradeBy(0.25))                 // 時濃時淡
  .every(32, x => x.lpf(perlin.range(400, 1200)))    // 濾波演化
  .room(space_depth);                                 // 空間呼吸

// ==============================
// IV. 過渡段落 A：晨霧散去 (Morning Mist Clearing)
// ==============================
//
// 從山谷雲起過渡到山路清行
// 霧氣漸散、視野開闊、光線增強
// ==============================

const transition_morning = stack(
  // 持續的 drone（漸弱）
  motif_drone_valley.gain(0.12),

  // 漸強的古箏（預告主題）
  motif_guzheng_arp.degradeBy(0.6).gain(0.18),

  // 光線感（高頻閃爍）
  s("hh*16")
    .gain(perlin.range(0.08, 0.18))
    .hpf(7000)
    .pan(sine.slow(4))
    .degradeBy(0.7)
)
  .lpf(sine.range(600, 2200).slow(8))                // 濾波漸開
  .gain(sine.range(0.6, 1.0).slow(4));               // 音量漸強

// ==============================
// V. 段落 II：山路清行 (Mountain Path) - Enhanced
// ==============================
//
// 創新元素：
// - Polyrhythm 鼓組（4、5、6 拍交織）
// - 琵琶快速撥弦增加活力
// - 二胡拉弦提供人聲感
// - 立體聲空間設計（主旋律中央、伴奏兩側）
// ==============================

const mountain_path_enhanced = stack(
  // 主旋律層（宮調式 - 中央）
  motif_gong_main.slow(2).pan(0.5),

  // 古箏伴奏層（偏右）
  motif_guzheng_arp.pan(0.65),

  // 琵琶撥弦層（偏左）
  motif_pipa_pluck.pan(0.35),

  // 節奏層（polyrhythm）
  motif_drum_palace,

  // 二胡拉弦（遠景、極小聲）
  motif_erhu_slide.gain(0.14).room(0.90)
)
  .every(8, x => x.sometimes(y => y.fast(1.5)))     // 偶爾加速
  .every(16, x => x.degradeBy(0.15))                 // 偶爾稀疏
  .rarely(x => x.add(7));                            // 極少數跳高八度

// ==============================
// VI. 過渡段落 B：溪澗水聲 (Stream Murmuring)
// ==============================
//
// 從山路清行過渡到簫問水應
// 溪水潺潺、節奏漸緩、準備對話
// ==============================

const transition_stream = stack(
  // 水聲（高頻密集）
  s("hh*32")
    .gain(perlin.range(0.12, 0.22))
    .hpf(6000)
    .pan(perlin.range(0, 1))
    .room(0.75),

  // 古箏水波紋
  motif_guzheng_arp.fast(1.5).degradeBy(0.5).gain(0.20),

  // Drone 漸入
  motif_drone_valley.gain(sine.range(0.08, 0.18).slow(8))
)
  .lpf(perlin.range(1000, 2500).slow(6));

// ==============================
// VII. 段落 III：簫問水應 (Dialogues) - Enhanced
// ==============================
//
// 創新元素：
// - 簫與古箏的「呼應」（使用 .late() 製造對話）
// - 編鐘深沉迴響
// - 動態濾波模擬情緒起伏
// - 立體聲對話（左右聲道）
// ==============================

const dialogue_enhanced = stack(
  // 簫聲「問」（左側）
  bamboo_flute_theme
    .slow(1.5)
    .pan(0.35),

  // 古箏「答」（右側、延遲 1 拍）
  motif_guzheng_arp
    .late(1)
    .pan(0.65)
    .degradeBy(0.3),

  // 二胡「和」（中央、延遲 0.5 拍）
  motif_erhu_slide
    .late(0.5)
    .pan(0.5)
    .gain(0.18),

  // Drone 基底
  motif_drone_valley.gain(0.14),

  // 編鐘迴響（極低頻、極稀疏）
  motif_bronze_bell.degradeBy(0.8).gain(0.12)
)
  .every(12, x => x.sometimes(y => y.fast(2)))       // 對話激動時刻
  .lpf(sine.range(1000, 2000).slow(10))              // 情緒起伏
  .room(sine.range(0.75, 0.92).slow(16));            // 空間變化

// ==============================
// VIII. 過渡段落 C：暮色漸濃 (Dusk Falling)
// ==============================
//
// 從對話過渡到寂靜
// 光線漸暗、聲音漸遠、準備收尾
// ==============================

const transition_dusk = stack(
  // 簫聲漸遠
  bamboo_flute_theme
    .slow(3)
    .gain(sine.range(0.20, 0.08).slow(8))            // 漸弱
    .lpf(sine.range(1200, 400).slow(8)),             // 漸悶

  // 遠方鐘聲
  s("bd ~ ~ ~ ~ ~ ~ ~")
    .gain(0.15)
    .lpf(60)
    .room(0.98),

  // Drone 漸強
  motif_drone_valley.gain(sine.range(0.12, 0.20).slow(8))
)
  .lpf(sine.range(1000, 300).slow(12));              // 整體漸暗

// ==============================
// IX. 段落 IV：雲散月明 (Return to Stillness) - Enhanced
// ==============================
//
// 創新元素：
// - 極簡主義（大量留白）
// - 多層 drone 營造無盡空間
// - 心跳般的遠鼓
// - 最後的編鐘餘韻
// ==============================

const return_to_stillness_enhanced = stack(
  // 多層 drone（極低音量）
  motif_drone_valley.lpf(200).gain(0.14),

  // 羽調主題（極慢、極稀疏）
  motif_yu_night
    .slow(4)
    .gain(0.18)
    .degradeBy(0.6)
    .lpf(600),

  // 心跳鼓聲（規律、極遠）
  s("bd*4")
    .gain(0.14)
    .lpf(80)
    .room(0.98)
    .slow(2),

  // 最後的編鐘（極稀疏）
  motif_bronze_bell
    .degradeBy(0.9)
    .gain(0.10)
)
  .every(16, x => x.lpf(150).gain(0.15))             // 漸入寂靜
  .room(0.98);                                        // 無盡空間

// ==============================
// X. 完整旅程（含過渡段落）
// ==============================
//
// 使用 slowcat 串接所有段落，形成完整敘事
// ==============================

const full_journey_with_transitions = slowcat(
  valley_mist_enhanced,      // 8 cycles: 山谷雲起
  transition_morning,        // 4 cycles: 晨霧散去
  mountain_path_enhanced,    // 8 cycles: 山路清行
  transition_stream,         // 4 cycles: 溪澗水聲
  dialogue_enhanced,         // 8 cycles: 簫問水應
  transition_dusk,           // 4 cycles: 暮色漸濃
  return_to_stillness_enhanced  // 持續: 雲散月明
);

// ==============================
// XI. 全曲疊加版（進階）
// ==============================
//
// 所有段落同時演奏（不含過渡）
// 適合背景冥想、長時間聆聽
// ==============================

const full_mix_enhanced = stack(
  valley_mist_enhanced.gain(0.85),
  mountain_path_enhanced.slow(2).gain(0.75),
  dialogue_enhanced.gain(0.80),
  return_to_stillness_enhanced.gain(0.90)
)
  .every(32, x => x.degradeBy(0.2))                  // 演進中漸疏
  .every(64, x => x.lpf(perlin.range(400, 1800)))    // 濾波演化
  .room(space_depth);                                 // 空間呼吸

// ==============================
// XII. 實驗版本
// ==============================

// 極簡版（只保留核心元素）
const minimal_version = stack(
  motif_drone_valley,
  motif_yu_night.slow(3).degradeBy(0.7),
  s("bd ~ ~ ~ ~ ~ ~ ~").gain(0.12).lpf(60).room(0.99)
)
  .lpf(400)
  .room(0.95);

// 節奏強化版（突出打擊樂）
const rhythmic_version = stack(
  motif_drum_palace.gain(1.2),
  mountain_path_enhanced,
  motif_pipa_pluck.gain(1.1)
)
  .every(4, x => x.fast(1.5));

// 氛圍版（強調空間與質感）
const ambient_version = stack(
  valley_mist_enhanced,
  dialogue_enhanced.slow(2),
  motif_bronze_bell.degradeBy(0.5)
)
  .room(0.95)
  .delay(0.6)
  .delayfeedback(0.8)
  .lpf(1000);

// ==============================
// XIII. 播放指南
// ==============================
//
// 【推薦播放順序】
//
// 1. 單段體驗：
//    valley_mist_enhanced           // 靜謐開場
//    mountain_path_enhanced         // 行旅律動
//    dialogue_enhanced              // 對話高潮
//    return_to_stillness_enhanced   // 圓滿收尾
//
// 2. 完整旅程（推薦！）：
//    full_journey_with_transitions  // 包含所有過渡段落
//
// 3. 全曲疊加：
//    full_mix_enhanced              // 所有段落同時演奏
//
// 4. 實驗版本：
//    minimal_version                // 極簡禪修
//    rhythmic_version               // 節奏強化
//    ambient_version                // 氛圍沉浸
//
// ──────────────────────────────────────────────
// 創新技巧說明：
//
// 【動態表情】
// - breath_gain: 呼吸式音量變化
// - pulse_lpf: 脈動式濾波
// - drift_pan: 飄移式立體聲
// - space_depth: 空間深度變化
//
// 【音高變化】
// - .add(perlin.range(-0.05, 0.05)): 微妙音高飄移
// - .add(perlin.range(-0.3, 0.3)): 滑音效果
//
// 【節奏創新】
// - Polyrhythm: 4、5、6 拍同時進行
// - Cross-rhythm: 不同層次的節奏交織
//
// 【空間設計】
// - 左右聲道對話（.pan(0.35) vs .pan(0.65)）
// - 前後景深（gain + room 的組合）
//
// 【意外元素】
// - .rarely(): 極少數觸發
// - .degradeBy(0.9): 極稀疏出現
//
// ──────────────────────────────────────────────

// 預設播放（推薦完整旅程）
full_journey_with_transitions
