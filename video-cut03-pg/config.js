// Cut-03: kenapa ramai jual emas kepada Public Gold (beli semua jenama tulen, syarat syarikat lain cerewet).
const b = (t0, t1, y, ...lines) => ({ k: 'b', t0, t1, y, lines: lines.map(([t, s, w]) => ({ t, s, w: w || (s >= 60 ? 900 : 800) })) });
const n = (t0, t1, y, o) => ({ k: 'n', t0, t1, y, ...o });
export default {
  VOICE: 69.78, TAU_N: 2093,
  THUMB: { l1: 'Jual emas jadi', big: 'SUSAH', l3: 'sebab syarat cerewet', pill: 'PUBLIC GOLD BELI SEMUA JENAMA', broll: 'Emas-goldbar-250gram', bf: 40, pose: 1500 },
  SIDES: [[0, 'L'], [19.0, 'R'], [40.2, 'L'], [54.0, 'R']],
  STAGES: [
    { type: 'hero', at: 0, l1: 'PUBLIC GOLD', l2: 'FINE GOLD  999.9' },
    { type: 'globe', at: 5.8 },
    { type: 'chart', at: 19.9, t0: 21, t1: 34, dir: 'down' },
    { type: 'coins', at: 35.7, t0: 36.3, dt: .14, n: 24 },
    { type: 'growth', at: 45.8, t0: 48.3, dt: .6, n: 6 },
    { type: 'pyramid', at: 54.6, t0: 56.0, dt: .3 },
    { type: 'hero', at: 62.4, l1: 'RM100', l2: 'APPS GAP' },
  ],
  CARDS: [
    { n: 'Selfie-Public_Gold-Menara-01', t0: .3, t1: 5.5 }, { n: 'Emas-goldbar-250gram', t0: 5.9, t1: 11.9 }, { n: 'Others-barang_kemas', t0: 12.2, t1: 18.8 },
    { n: 'Cashflow-1', t0: 20.3, t1: 26.5 }, { n: 'Emas-5gram', t0: 26.9, t1: 32.6 }, { n: 'Emas-special', t0: 33.0, t1: 35.6 }, { n: 'Emas-1000gram', t0: 35.9, t1: 40.0 },
    { n: 'Comment-1', t0: 41.5, t1: 45.5 }, { n: 'Emas-10gram', t0: 45.9, t1: 48.2 }, { n: 'Graph-1', t0: 48.5, t1: 53.8 },
    { n: 'Selfie-Public_Gold-Menara', t0: 55.2, t1: 59.0 }, { n: 'Website-Saya', t0: 59.3, t1: 62.2 }, { n: 'Apps-RM100', t0: 62.6, t1: 66.0 }, { n: 'Happy', t0: 66.3, t1: 69.7 },
  ],
  TEXT: [
    b(.2, 5.7, 92, ['Ramai yang jual emas', 56, 800], ['kepada *Public Gold', 80]), b(3.9, 5.7, 262, ['Jadi, *kenapa?', 100]),
    b(6.0, 12.1, 92, ['Public Gold beli', 56, 800]), b(7.7, 12.1, 152, ['semua *jenama emas', 90]), b(9.0, 12.1, 250, ['asalkan *tulen', 70]), b(11.0, 12.1, 326, ['harga yang *tinggi', 70]),
    b(12.3, 18.8, 92, ['Tetapi ada yang', 50]), b(13.2, 18.8, 150, ['*terpaksa jual', 90]), b(15.0, 18.8, 250, ['kerana syarikat asal', 50]), b(17.0, 18.8, 306, ['letak *syarat menyusahkan', 62]),
    b(20.1, 26.6, 92, ['Ada yang tak', 56, 800]), b(21.2, 26.6, 152, ['*bayar tunai', 100]), b(24.0, 26.6, 268, ['tapi paksa', 50]), b(24.6, 26.6, 324, ['*trade-in', 110]),
    b(26.8, 32.7, 92, ['Ada juga yang', 50]), b(27.9, 32.7, 150, ['tak terima emas kalau', 56, 800]), b(29.1, 32.7, 218, ['tiada *receipt', 100]), b(30.1, 32.7, 330, ['atau emas dah', 50]), b(30.7, 32.7, 388, ['keluar dari *kad', 80]),
    b(32.9, 35.6, 92, ['Emas yang *buruk', 86]), b(34.4, 35.6, 190, ['pun susah nak jual', 56, 800]),
    b(35.8, 40.1, 92, ['Dah kumpul banyak emas', 56, 800]), b(38.3, 40.1, 160, ['nak jual pun', 50]), b(39.2, 40.1, 215, ['*macam-macam syarat', 70]),
    b(41.4, 42.9, 92, ['Terlalu *cerewet', 100]), b(43.0, 45.8, 92, ['Sebab itu bila', 50]), b(43.7, 45.8, 150, ['*kumpul emas', 100]),
    b(45.9, 48.2, 92, ['Bukan sahaja tengok', 50]), b(46.8, 48.2, 150, ['harga *murah', 100]),
    b(48.4, 53.9, 92, ['Pastikan juga', 56, 800]), b(49.7, 53.9, 152, ['harga *jual balik', 86]), b(50.8, 53.9, 250, ['*tinggi', 120]), b(52.2, 53.9, 396, ['tanpa syarat cerewet', 56, 800]),
    b(54.7, 58.0, 92, ['Nak mudah?', 100]), b(55.9, 58.0, 210, ['Kumpul emas', 56, 800]), b(56.7, 58.0, 266, ['*Public Gold', 100]),
    b(58.0, 62.3, 92, ['*Senang beli', 100]), b(58.7, 62.3, 210, ['*senang jual', 100]), b(60.1, 62.3, 330, ['tuan puan boleh mulakan', 50]), b(60.9, 62.3, 386, ['*simpanan emas', 90]),
    b(62.5, 66.2, 92, ['walaupun dengan bajet', 50]), n(63.8, 66.2, 150, { from: 0, to: 100, c0: 64.0, c1: 64.7, fmt: 'int', pre: 'RM', s: 170 }), b(65.5, 66.3, 372, ['melalui Apps *GAP', 70]),
    b(66.4, 69.7, 92, ['Dulu *ragu,', 100]), b(67.2, 69.7, 215, ['kini *tahu', 100]), b(68.0, 69.7, 340, ['jom mulakan', 56, 800]), b(68.7, 69.7, 400, ['*simpanan emas', 100]),
  ],
  TAGS: [
    { s: 1, a: 'globe', txt: 'Semua jenama emas', sub: 'asalkan tulen', t0: 7.8, t1: 12.1, dx: 150, dy: -70 },
    { s: 2, a: 'end', txt: 'Syarat menyusahkan', sub: 'harga jual jatuh', t0: 21.0, t1: 26.4, dx: 150, dy: -80 },
    { s: 3, a: 'top', txt: 'Emas dah banyak', sub: 'tapi susah nak jual', t0: 36.6, t1: 40.0, dx: 150, dy: -70 },
    { s: 4, a: 'top', txt: 'Harga jual balik tinggi', sub: 'tanpa syarat cerewet', t0: 49.5, t1: 53.8, dx: 150, dy: -60 },
    { s: 5, a: 'top', txt: 'Senang beli, senang jual', sub: 'Public Gold', t0: 58.0, t1: 62.2, dx: 150, dy: -70 },
    { s: 6, a: 'x', txt: 'RM100', sub: 'melalui Apps GAP', t0: 64.5, t1: 69.0, dx: 160, dy: -60 },
  ],
};
