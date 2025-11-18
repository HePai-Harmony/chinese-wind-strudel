// src/experiments/sketch_rain_ambient.strudel.js
//
// 實驗主題：雨聲氛圍音樂
// 概念：用 Strudel 模擬雨聲、雷聲、雨中旋律
// 適合場景：放鬆、睡眠、專注工作背景音
//
// ──────────────────────────────────────────────

setcpm(55) // 較慢，像雨滴的節奏

// ==============================
// 雨聲層：高頻密集打擊
// ==============================

// 主雨聲（密集 hi-hat）
const rain_main = s("hh*16")
  .gain(perlin.range(0.12, 0.28))  // 音量隨機（模擬雨勢變化）
  .hpf(perlin.range(5000, 8000))   // 高通濾波（只留高頻）
  .pan(perlin.range(0, 1))         // Pan 隨機（雨聲環繞）
  .room(0.8);

// 雨滴（較稀疏的點綴）
const rain_drops = s("~ hh ~ hh*2 ~ hh ~ hh*3")
  .gain(perlin.range(0.18, 0.32))
  .hpf(6000)
  .pan(rand.range(0, 1))  // 用 rand 更跳躍
  .room(0.75)
  .sometimes(x => x.fast(2));  // 偶爾雨勢增強

// 雨聲組合
const rain_texture = stack(
  rain_main,
  rain_drops.gain(0.85)  // 雨滴稍小聲
);

// ==============================
// 遠雷：低頻隆隆聲
// ==============================

// 遠方的雷聲（很慢、很低）
const thunder_distant = s("bd ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~")
  .gain(0.24)
  .lpf(50)   // 極低濾波
  .room(0.98) // 極大空間
  .slow(4)
  .degradeBy(0.8);  // 80% 機率不響（很偶爾）

// 雷聲隆隆（用 noise）
const thunder_rumble = note("c1")
  .sound("sawtooth")
  .lpf(perlin.range(40, 100).slow(32))
  .gain(perlin.range(0.08, 0.18).slow(24))
  .room(0.95)
  .slow(8)
  .degradeBy(0.9);  // 極偶爾出現

// ==============================
// 雨中旋律：簫／笛子
// ==============================

// 雨中的簫聲（羽調式，帶憂鬱）
const rain_flute = n("0 2 3 4 3 2 0 4")
  .scale("A2:minor:pentatonic")
  .sound("sine")
  .lpf(sine.range(900, 1400).slow(8))  // 濾波緩慢變化
  .gain(0.26)
  .room(0.85)
  .slow(3)
  .degradeBy(0.4)  // 時斷時續
  .sometimes(x => x.add(7));  // 偶爾高八度

// 簫聲回聲
const rain_flute_echo = rain_flute
  .late(2)
  .gain(0.18)
  .lpf(800)
  .room(0.92);

// ==============================
// 雨滴琴聲：古箏式點狀音符
// ==============================

// 模擬雨滴打在古箏弦上
const rain_guzheng_drops = n(rand.range(0, 8).segment(16))
  .scale("D:minor:pentatonic")
  .sound("triangle")
  .lpf(perlin.range(1600, 2200))
  .gain(perlin.range(0.18, 0.28))
  .room(0.75)
  .release(0.15)  // 短促
  .pan(rand.range(0.2, 0.8))
  .degradeBy(0.6);  // 很稀疏

// ==============================
// Drone：雨聲背景持續音
// ==============================

// 低頻 drone（模擬遠方的風聲）
const rain_drone_wind = note("f2*8")
  .sound("sine")
  .lpf(perlin.range(180, 350).slow(16))
  .gain(perlin.range(0.14, 0.20).slow(12))
  .room(0.95)
  .slow(6);

// 中頻 drone（雨聲的背景和聲）
const rain_drone_wash = note("a2*6 c3*6")
  .sound("sine")
  .lpf(perlin.range(400, 700).slow(14))
  .gain(perlin.range(0.12, 0.18).slow(10))
  .room(0.90)
  .slow(8);

// ==============================
// 完整雨聲場景
// ==============================

const rain_full_scene = stack(
  // 雨聲層
  rain_texture,

  // 雷聲層
  thunder_distant,
  thunder_rumble,

  // 旋律層
  rain_flute,
  rain_flute_echo,

  // 點綴層
  rain_guzheng_drops,

  // Drone 層
  rain_drone_wind,
  rain_drone_wash
)
  .every(32, x => x.lpf(perlin.range(300, 800)))  // 偶爾變悶（雨勢變大）
  .every(64, x => x.gain(0.85));  // 偶爾變小聲（雨勢減弱）

// ==============================
// 變化版本：只有雨聲（無旋律）
// ==============================

const rain_pure_ambient = stack(
  rain_texture,
  thunder_distant,
  rain_drone_wind.gain(0.10),  // 極小
  rain_guzheng_drops.degradeBy(0.8)  // 極稀疏
);

// ==============================
// 變化版本：雨後初霽
// ==============================

// 雨勢漸小、陽光出現（宮調式）
const rain_clearing = stack(
  // 稀疏的雨聲
  rain_main.degradeBy(0.7).gain(0.85),

  // 明亮的旋律（宮調式）
  n("0 1 2 3 4 3 2 1")
    .scale("C:major:pentatonic")
    .sound("triangle")
    .lpf(2000)
    .gain(0.28)
    .room(0.7)
    .slow(2),

  // 溫暖的 drone
  note("c3*8")
    .sound("sine")
    .lpf(500)
    .gain(0.16)
    .room(0.85)
);

// ==============================
// 變化版本：暴雨
// ==============================

const rain_heavy_storm = stack(
  // 極密集雨聲
  s("hh*32")
    .gain(perlin.range(0.28, 0.42))
    .hpf(7000)
    .pan(perlin.range(0, 1))
    .room(0.7),

  // 頻繁的雷聲
  thunder_distant.degradeBy(0.3)  // 降低省略機率（更常出現）
    .gain(0.35),

  // 風聲（快速 drone 變化）
  rain_drone_wind
    .lpf(perlin.range(200, 600).fast(4))  // 快速變化
    .gain(perlin.range(0.20, 0.32).fast(2))
);

// ==============================
// 動態雨聲：雨勢循環變化
// ==============================

// 從小雨 → 中雨 → 大雨 → 小雨
const rain_dynamic_cycle = stack(
  rain_texture
    .gain(sine.range(0.15, 0.35).slow(64)),  // 音量週期變化

  rain_flute
    .degradeBy(sine.range(0.2, 0.8).slow(48)),  // 稀疏度週期變化

  thunder_distant
    .degradeBy(sine.range(0.6, 0.95).slow(32)),  // 雷聲機率變化

  rain_drone_wind
);

// ==============================
// 播放建議
// ==============================
//
// 建議播放：
//   rain_full_scene      // 完整場景（推薦）
//   rain_pure_ambient    // 純雨聲（睡眠用）
//   rain_clearing        // 雨後初霽（明亮）
//   rain_heavy_storm     // 暴雨（強烈）
//   rain_dynamic_cycle   // 動態循環（永不重複）
//
// 實驗建議：
// - 調整 setcpm（40-70）模擬不同雨勢節奏
// - 增加 hh*32 做更密集的雨聲
// - 移除旋律層，只保留雨聲 + drone
// - 加入更多 thunder_distant 做雷雨版本
//
// 參數調整：
// - rain_main 的 gain：控制雨勢大小
//   - perlin.range(0.08, 0.18)：小雨
//   - perlin.range(0.12, 0.28)：中雨（預設）
//   - perlin.range(0.25, 0.45)：大雨
//
// - hpf 數值：控制雨聲音色
//   - hpf(4000)：較低沉的雨
//   - hpf(6000)：自然雨聲（預設）
//   - hpf(8000)：尖銳的雨聲
//
// 使用情境：
// - 睡眠：rain_pure_ambient + 極慢 cpm(40)
// - 工作：rain_full_scene + 適中 cpm(55)
// - 冥想：rain_clearing + 慢速 cpm(45)
//
// ──────────────────────────────────────────────
