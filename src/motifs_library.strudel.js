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

// ==============================
// 5. 快速旋律技巧（runs & ornaments）
// ==============================

// 快速上行跑句（八度內五聲音階）
const motif_run_ascending = run(8)
  .scale("C:major:pentatonic")
  .fast(2)
  .sound("triangle")
  .lpf(2000)
  .gain(0.24)
  .release(0.15);

// 快速下行跑句
const motif_run_descending = run(8)
  .scale("C:major:pentatonic")
  .rev()
  .fast(2)
  .sound("triangle")
  .lpf(2000)
  .gain(0.24)
  .release(0.15);

// 裝飾音型（顫音模擬）
const motif_trill_ornament = n("0 1 0 1 0 1 0 1")
  .scale("F:major:pentatonic")
  .fast(4)
  .sound("sine")
  .lpf(1500)
  .gain(0.20)
  .release(0.1);

// 滑音模擬（使用連續音高）
const motif_glissando_up = n("0 1 2 3 4")
  .scale("C:major:pentatonic")
  .fast(3)
  .sound("sine")
  .lpf(sine.range(800, 2000).fast(2))
  .gain(0.22)
  .room(0.6);

// 即興風格隨機旋律（帶 degradeBy）
const motif_improvised_melody = n(rand.range(0, 8).segment(16))
  .scale("A2:minor:pentatonic")
  .sound("triangle")
  .lpf(1600)
  .gain(0.26)
  .degradeBy(0.4) // 40% 的音符會被省略
  .room(0.7)
  .sometimes(x => x.fast(2));

// ==============================
// 6. 進階節奏型
// ==============================

// 舞曲風格（較快、較滿）
const rhythm_dance_festive = s("bd sd bd sd, hh*8")
  .gain(0.32)
  .lpf(180)
  .stack(
    s("~ ~ cp ~").gain(0.28) // 掌聲感
  );

// 禪修極簡節奏（大量留白）
const rhythm_zen_minimal = s("bd ~ ~ ~, ~ ~ ~ hh")
  .gain(0.22)
  .lpf(100)
  .room(0.85)
  .slow(2);

// 行板變化型（帶隨機化）
const rhythm_walking_varied = s("bd ~ sd ~, hh*<4 6 8>")
  .gain(0.28)
  .lpf(perlin.range(120, 200))
  .sometimes(x => x.fast(2));

// 宮廷儀式鼓（莊嚴感）
const rhythm_ceremonial = s("bd*2 ~ bd ~ ~ bd ~ ~")
  .gain(0.38)
  .lpf(90)
  .room(0.9)
  .slow(2);

// 雨聲節奏（高頻密集）
const rhythm_rain_ambient = s("hh*16")
  .gain(perlin.range(0.10, 0.25))
  .hpf(6000)
  .pan(perlin.range(0, 1))
  .room(0.8);

// ==============================
// 7. 效果鏈預設組合
// ==============================

// 山谷 reverb chain（極大空間感）
const fx_valley_reverb = x => x
  .room(0.92)
  .delay(0.3)
  .delayfeedback(0.6)
  .lpf(1200)
  .gain(0.24);

// 廟宇 echo chain（回聲層疊）
const fx_temple_echo = x => x
  .delay(0.5)
  .delayfeedback(0.8)
  .room(0.85)
  .lpf(1500)
  .hpf(200);

// 雨聲 ambient chain（濕潤氛圍）
const fx_rain_ambient = x => x
  .room(0.75)
  .lpf(perlin.range(800, 1800))
  .hpf(perlin.range(200, 600))
  .gain(perlin.range(0.2, 0.35))
  .pan(sine.slow(8));

// 遠山 distant chain（極遠、模糊）
const fx_distant_mountain = x => x
  .lpf(400)
  .room(0.95)
  .gain(0.18)
  .delay(0.7)
  .delayfeedback(0.9);

// 古箏 pluck chain（撥弦質感）
const fx_guzheng_pluck = x => x
  .release(0.2)
  .lpf(1800)
  .room(0.7)
  .gain(0.26)
  .hpf(200);

// ==============================
// 8. 動態表情控制
// ==============================

// Perlin 控制音量（呼吸感）
const expr_breathing_gain = perlin.range(0.20, 0.35).slow(8);

// Sine 控制濾波（週期性明暗）
const expr_pulsing_lpf = sine.range(600, 2000).slow(4);

// Perlin 控制 pan（飄移感）
const expr_drifting_pan = perlin.range(0, 1).slow(16);

// Sine 控制 room（空間變化）
const expr_spatial_room = sine.range(0.5, 0.95).slow(12);

// 綜合表情範例：會呼吸、會飄移的旋律
const motif_expressive_melody = n("0 2 4 3 2 0 4 2")
  .scale("F:major:pentatonic")
  .sound("sine")
  .lpf(expr_pulsing_lpf)
  .gain(expr_breathing_gain)
  .pan(expr_drifting_pan)
  .room(expr_spatial_room);

// ==============================
// 9. 組合型進階 Pattern 範例
// ==============================

// 快速跑句 + 裝飾音組合
const pattern_virtuoso_run = stack(
  motif_run_ascending,
  motif_trill_ornament.late(0.5)
).every(4, x => x.rev());

// 雨聲氛圍層（適合背景）
const pattern_rain_layer = stack(
  rhythm_rain_ambient,
  motif_improvised_melody.slow(2),
  motif_drone_valley.lpf(200).gain(0.12)
);

// 舞曲高潮（適合較快段落）
const pattern_dance_climax = stack(
  rhythm_dance_festive,
  motif_run_ascending.fast(0.5),
  motif_guzheng_arp_fast
).every(8, x => x.sometimes(y => y.fast(2)));

// 禪修靜坐（極簡）
const pattern_zen_meditation = stack(
  rhythm_zen_minimal,
  motif_drone_valley,
  motif_yu_night.slow(4).degradeBy(0.6)
).every(32, x => x.lpf(300).gain(0.18));

// 山谷回聲（展示效果鏈）
const pattern_valley_echo = fx_valley_reverb(
  stack(
    motif_yu_night.slow(2),
    motif_temple_wood
  )
);

// 廟宇儀式（莊嚴感）
const pattern_temple_ceremony = stack(
  rhythm_ceremonial,
  motif_gong_main.slow(3),
  motif_drone_valley.lpf(150)
).pipe(fx_temple_echo);

// ==============================
// 使用提示
// ==============================
//
// 1. 直接複製到你的作品中：
//    const my_melody = motif_gong_main.slow(2)
//
// 2. 使用效果鏈：
//    motif_yu_night.pipe(fx_valley_reverb)
//
// 3. 組合多個 motif：
//    stack(motif_gong_main, motif_guzheng_arp_slow, rhythm_walking_varied)
//
// 4. 動態表情：
//    note("c4").gain(expr_breathing_gain).lpf(expr_pulsing_lpf)
//
// 5. 實驗與即興：
//    pattern_zen_meditation.fast(rand.range(0.5, 2))
//
// ==============================
