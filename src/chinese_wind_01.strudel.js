// src/chinese_wind_01.strudel.js
//
// Title: 山水問答 (Dialogues in Mountains and Rivers)
// A first complete Chinese‑style Strudel piece.
// 可以直接整段貼到 https://strudel.cc 播放。

setcpm(60) // 約等於 60 BPM，一次 cycle 一秒

// ==============================
// 0. 引用（若你是從 motifs_library 複製過來，可直接修改）
// ==============================

// 這裡直接內嵌一些 motifs，實務上也可以從 motifs_library.strudel.js 複製。

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

const valley_mist = stack(
  motif_drone_valley,
  motif_yu_night.slow(2),
  motif_temple_wood
).every(16, x => x.degradeBy(0.3));

// ==============================
// II. 行旅：山路清行 (Mountain Path)
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

const dialogue_section = stack(
  bamboo_flute_theme.slow(1.5),
  motif_drone_valley.gain(0.15),
  motif_guzheng_arp_slow.degradeBy(0.2)
).every(12, x => x.sometimes(y => y.fast(2)));

// ==============================
// IV. 歸一：雲散月明 (Return to Stillness)
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
// 實際 live coding 時，你可以只播放其中一段：
//   valley_mist
//   mountain_path
//   dialogue_section
//   return_to_stillness
//
// 或者像下面這樣，把它們疊在一起做為「最高潮」。

const full_mix = stack(
  valley_mist,
  mountain_path.slow(2),
  dialogue_section,
  return_to_stillness
)
  .every(32, x => x.degradeBy(0.2))  // 演進中漸漸稀疏
  .every(64, x => x.slow(2));        // 也可以改成 fast(2) 增加張力

// 建議先播放 valley_mist 或 mountain_path，
// 再在 live coding 過程中動態改成 full_mix。
//
// 貼到 strudel.cc 時，選擇你想聽的 pattern，例如：
//
//   valley_mist
//   // 或
//   full_mix
//
// 然後按下播放。
