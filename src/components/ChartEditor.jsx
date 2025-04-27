import React, { useState } from "react";

/* ---------- 記号定義 ---------- */
const SYMBOLS = [
  { key: "k",     label: "表編み", src: "https://raw.githubusercontent.com/marnen/knitting_symbols/master/svg/knit.svg" },
  { key: "p",     label: "裏編み", src: "https://raw.githubusercontent.com/marnen/knitting_symbols/master/svg/purl.svg" },
  { key: "k2tog", label: "2目一度", src: "https://raw.githubusercontent.com/marnen/knitting_symbols/master/svg/k2tog.svg" },
  { key: "yo",    label: "掛け目", src: "https://raw.githubusercontent.com/marnen/knitting_symbols/master/svg/yo.svg" },
];

/* ---------- 定数 ---------- */
const CELL = 32;          // 1マスのピクセル数
const COLS = 20;          // 列数
const ROWS = 40;          // 行数

export default function ChartEditor() {
  /* 選択中の記号キー */
  const [selected, setSelected] = useState(null);

  /* chart[row][col] = 記号キー or null */
  const [chart, setChart] = useState(
    () => Array.from({ length: ROWS }, () => Array(COLS).fill(null))
  );

  /* ---------- セルをクリックした時 ---------- */
  const handleClick = (r, c) => {
    if (!selected) return;           // 記号が選ばれていない場合は無視
    setChart(prev => {
      const next = prev.map(row => [...row]); // deep clone
      next[r][c] = selected;
      return next;
    });
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* ===== パレット ===== */}
      <div className="flex gap-2 flex-wrap">
        {SYMBOLS.map(sym => (
          <button
            key={sym.key}
            onClick={() => setSelected(sym.key)}
            className={`border rounded-lg p-1 hover:shadow ${
              selected === sym.key ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <img src={sym.src} alt={sym.label} className="w-8 h-8" />
            <span className="block text-xs">{sym.label}</span>
          </button>
        ))}
      </div>

      {/* ===== グリッド ===== */}
      <div
        className="border shadow-inner"
        style={{
          width: COLS * CELL,
          height: ROWS * CELL,
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
        }}
      >
        {chart.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              onClick={() => handleClick(r, c)}
              className="border border-gray-200 flex items-center justify-center"
              style={{ width: CELL, height: CELL }}
            >
              {cell && (
                <img
                  src={SYMBOLS.find(s => s.key === cell).src}
                  alt={cell}
                  className="w-6 h-6"
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
