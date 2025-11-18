// src/motifs_library.strudel.js
//
// 常用「中國風」旋律 / 節奏動機的素材庫。
// 可在其他檔案中直接複製這些 pattern，或作為靈感參考。

setcpm(60) // 預設人類心跳附近的 tempo，可依作品覆寫

// ==============================
// 1. 五聲音階旋律動機（宮商角徵羽）
// ==============================

// 宮調式：穩定、明朗
const motif_gong_main = n("0 1 2 3 4 3 2 1")
  .scale("C:major:pentatonic")
  .sound("sine")
  .gain(0.3);

// 羽調式：柔和、略帶感傷
const motif_yu_night = n("0 2 3 4 3 2 0 4")
  .scale("A2:minor:pentatonic")
  .sound("sine")
  .gain(0.28)
  .room(0.7)
  .lpf(1400);

// 角調式：開闊但帶一點哀愁
const motif_jue_open = n("0 2 3 4 3 2 0 2")
  .scale("C:major:pentatonic")
  .add(2) // 以第三級為重心
  .sound("triangle")
  .gain(0.27)
  .room(0.65);

// 商調式：敘事感、向外的運動
const motif_shang_story = n("0 1 3 4 3 1 0 1")
  .scale("C:major:pentatonic")
  .add(1)
  .sound("triangle")
  .gain(0.27);

// 徵調式：昂揚、奔放
const motif_zhi_bright = n("0 2 3 4 3 2 0 3")
  .scale("C:major:pentatonic")
  .add(3)
  .sound("sawtooth")
  .lpf(1800)
  .gain(0.25);

// ==============================
// 2. 伴奏與分解和弦（類古箏 / 琵琶）
// ==============================

const motif_guzheng_arp_slow = n("<0 4 2 4> <0 2 4 2>")
  .scale("F:major:pentatonic")
  .sound("triangle")
  .lpf(1800)
  .gain(0.26)
  .room(0.8)
  .release(0.25)
  .every(2, x => x.fast(2))
  .sometimes(x => x.rev());

const motif_guzheng_arp_fast = motif_guzheng_arp_slow.fast(2).gain(0.22);

const motif_drone_valley = note("f2*8")
  .sound("sine")
  .lpf(300)
  .gain(0.18)
  .room(0.9)
  .slow(4);

// ==============================
// 3. 打擊與節奏動機
// ==============================

// 柔和宮廷鼓：四分音符為主，留有空白
const motif_drum_palace = s("bd ~ ~ bd, ~ sd ~ sd")
  .gain(0.35)
  .lpf(140)
  .stack(
    s("hh*4").gain(0.12).hpf(5000)
  );

// 木魚感 + 高頻襯底
const motif_temple_wood = s("~ hh ~ hh*2")
  .gain(0.18)
  .hpf(3000)
  .pan(sine.slow(8));

// 輕快行板（適合舞曲感、山間行走）
const motif_walk_groove = s("bd ~ sd ~, hh*4")
  .gain(0.26)
  .stack(
    s("~ ~ hh ~").gain(0.16).hpf(6000)
  );

// ==============================
// 4. 組合型 pattern 範例
// ==============================

// 靜謐山谷：羽調式旋律 + drone + 木魚
const pattern_valley_night = stack(
  motif_yu_night.slow(2),
  motif_drone_valley,
  motif_temple_wood
);

// 宮廷行板：宮調主題 + 古箏 arp + 柔和鼓
const pattern_palace_walk = stack(
  motif_gong_main.slow(2),
  motif_guzheng_arp_slow,
  motif_drum_palace
);

// 山間清晨：角調主題 + drone + 行板 groove
const pattern_mountain_morning = stack(
  motif_jue_open.slow(2),
  motif_drone_valley,
  motif_walk_groove
);

// 使用方式：在其他檔案中可以直接 stack 這些 pattern，例如：
//   stack(pattern_valley_night, bamboo_flute_solo)
// 或：
//   pattern_palace_walk.fast(1.5).every(16, x => x.degradeBy(0.3));
