// src/chinese_wind_01.strudel.js
//
// Title: 山水問答 (Dialogues in Mountains and Rivers)
// A first complete Chinese‑style Strudel piece.
// 可以直接整段貼到 https://strudel.cc 播放。
//
// ──────────────────────────────────────────────
// 作品概念：
// 以四段式結構，描繪山水行旅中的問答與沉思。
// 從山谷雲起 → 山路清行 → 簫問水應 → 雲散月明。
//
// 調性：主要使用 C/F 大調五聲音階（宮調式）與 A 小調五聲音階（羽調式）
// 節奏：60 cpm，接近靜坐時的呼吸節奏
// ──────────────────────────────────────────────

setcpm(60) // 約等於 60 BPM，一次 cycle 一秒

// ==============================
// 0. Motifs 定義區
// ==============================
//
// 提示：這些 motif 也可以從 motifs_library.strudel.js 複製，
// 或者直接在這裡客製化修改以符合作品需求。
// ==============================

const motif_gong_main = n("0 1 2 3 4 3 2 1")
  .scale("C:major:pentatonic")
  .sound("sine")
  .gain(0.3);

const motif_yu_night = n("0 2 3 4 3 2 0 4")
  .scale("A2:minor:pentatonic")
  .sound("sine")
  .gain(0.28)
  .room(0.7)
  .lpf(1400);

const motif_guzheng_arp_slow = n("<0 4 2 4> <0 2 4 2>")
  .scale("F:major:pentatonic")
  .sound("triangle")
  .lpf(1800)
  .gain(0.26)
  .room(0.8)
  .release(0.25)
  .every(2, x => x.fast(2))
  .sometimes(x => x.rev());

const motif_drone_valley = note("f2*8")
  .sound("sine")
  .lpf(300)
  .gain(0.18)
  .room(0.9)
  .slow(4);

const motif_temple_wood = s("~ hh ~ hh*2")
  .gain(0.18)
  .hpf(3000)
  .pan(sine.slow(8));

const motif_drum_palace = s("bd ~ ~ bd, ~ sd ~ sd")
  .gain(0.35)
  .lpf(140)
  .stack(
    s("hh*4").gain(0.12).hpf(5000)
  );

// 簫風格 lead
const bamboo_flute_theme = n("4 3 2 0 2 3 4 7")
  .scale("F:major:pentatonic")
  .sound("sine")
  .lpf(1200)
  .gain(0.28)
  .room(0.8)
  .every(2, x => x.slow(2))
  .sometimes(x => x.add(7))
  .sometimes(x => x.degradeBy(0.3));

// ==============================
// I. 開篇：山谷雲起 (Valley Mist)
// ==============================
//
// 設計思路：
// - 羽調式旋律 + 低音 drone，營造靜謐山谷氛圍
// - 木魚般的高頻點綴，模擬遠方寺院
// - every(16) 的 degradeBy 讓雲霧時濃時淡
//
// 建議參數調整：
// - 若想更靜謐：將 .slow(2) 改為 .slow(3)
// - 若想更空靈：增加 .room(0.95)
// ==============================

const valley_mist = stack(
  motif_drone_valley,
  motif_yu_night.slow(2),
  motif_temple_wood
).every(16, x => x.degradeBy(0.3));

// ==============================
// II. 行旅：山路清行 (Mountain Path)
// ==============================
//
// 設計思路：
// - 宮調式主旋律，展現行旅的穩健與正氣
// - 古箏琶音提供流動感，如溪水伴行
// - 輕柔的行板節奏，模擬步履聲
//
// 建議參數調整：
// - 若想更輕快：移除 .slow(2)，改為 .fast(1.5)
// - 若想更有層次：在 stack 中加入 bamboo_flute_theme
// ==============================

const mountain_path_rhythm = s("bd ~ sd ~, hh*4")
  .gain(0.26)
  .stack(
    s("~ ~ hh ~").gain(0.16).hpf(6000)
  );

const mountain_path = stack(
  motif_gong_main.slow(2),
  motif_guzheng_arp_slow,
  mountain_path_rhythm
).every(8, x => x.sometimes(y => y.degradeBy(0.2)));

// ==============================
// III. 對話：簫問水、山應聲 (Dialogues)
// ==============================
//
// 設計思路：
// - 簫聲作為「問」，緩慢吹奏主題
// - drone 與古箏作為「答」，提供和聲共鳴
// - every(12) 的 fast(2) 模擬對話中的激動時刻
//
// 建議參數調整：
// - 若想更具對話感：添加 .late() 製造呼應延遲
// - 若想更深沉：降低 bamboo_flute 的八度（.sub(7)）
// ==============================

const dialogue_section = stack(
  bamboo_flute_theme.slow(1.5),
  motif_drone_valley.gain(0.15),
  motif_guzheng_arp_slow.degradeBy(0.2)
).every(12, x => x.sometimes(y => y.fast(2)));

// ==============================
// IV. 歸一：雲散月明 (Return to Stillness)
// ==============================
//
// 設計思路：
// - 回歸羽調式，帶出圓滿與寂靜
// - 極低的濾波讓一切聲音變得模糊、遙遠
// - 遠方的鼓聲，如心跳般規律而微弱
//
// 建議參數調整：
// - 若想更靜謐：增加 .slow() 倍數到 4 或 5
// - 若想更空曠：提高 .room(0.99) 與 .delay(0.8)
// ==============================

const return_to_stillness = stack(
  motif_yu_night.slow(3).gain(0.22),
  motif_drone_valley.lpf(250),
  s("bd*4").gain(0.18).lpf(100) // 遠方的鼓聲
).every(16, x => x.lpf(200).gain(0.2));

// ==============================
// V. 全曲總成 (Full Mix)
// ==============================
//
// 使用建議：
//
// 1. 單段播放（推薦初次聆聽）：
//    - valley_mist          // 靜謐開場
//    - mountain_path        // 行旅律動
//    - dialogue_section     // 對話高潮
//    - return_to_stillness  // 圓滿收尾
//
// 2. 漸進式 live coding：
//    - 從 valley_mist 開始
//    - 手動切換到 mountain_path
//    - 再切到 dialogue_section
//    - 最後以 return_to_stillness 收尾
//
// 3. 全曲疊加（進階）：
//    - 使用下方的 full_mix
//    - 所有段落同時演奏，製造豐富層次
//    - 適合作為背景冥想音樂
// ==============================

const full_mix = stack(
  valley_mist,
  mountain_path.slow(2),
  dialogue_section,
  return_to_stillness
)
  .every(32, x => x.degradeBy(0.2))  // 演進中漸漸稀疏
  .every(64, x => x.slow(2));        // 也可以改成 fast(2) 增加張力

// ==============================
// 播放指南
// ==============================
//
// 貼到 strudel.cc 時，在最後一行選擇你想播放的 pattern：
//
// 範例 1（單段）：
//   valley_mist
//
// 範例 2（全曲）：
//   full_mix
//
// 範例 3（客製化組合）：
//   stack(valley_mist, dialogue_section).slow(1.5)
//
// 然後按下 Ctrl+Enter（或播放按鈕）開始演奏。
//
// ──────────────────────────────────────────────
// 延伸實驗建議：
// - 改變 setcpm 數值（40-80 之間）調整整體節奏感
// - 為任何段落添加 .fast(2) 或 .slow(3) 改變速度
// - 使用 .room() / .delay() / .lpf() 調整空間感
// - 嘗試不同的 scale（如 D:minor:pentatonic）
// ──────────────────────────────────────────────

// 預設播放（可以改成任何上面定義的 pattern）
valley_mist
