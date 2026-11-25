import React from 'react';

// Dimensioned plan view of an L-shaped bracket with a bolt hole.
// Scale: 5 px per mm. Outline draws itself once on load, then the dimensions appear.
export default function Bracket() {
  return (
    <svg
      className="bracket"
      viewBox="0 0 500 440"
      role="img"
      aria-label="Dimensioned drawing of an L-shaped bracket with one bolt hole"
    >
      <path className="b-fill" d="M110 70 H210 V270 H410 V370 H110 Z" />
      <path className="b-outline" pathLength="1" d="M110 70 H210 V270 H410 V370 H110 Z" />
      <circle className="b-outline b-hole" pathLength="1" cx="360" cy="320" r="15" />

      <g className="b-dims">
        <path className="b-center" d="M332 320 H388 M360 292 V348" />

        <path className="b-dim" d="M110 405 H410 M110 380 V412 M410 380 V412" />
        <text x="260" y="428" textAnchor="middle">60</text>

        <path className="b-dim" d="M75 70 V370 M45 70 H102 M45 370 H102" />
        <text x="62" y="225" textAnchor="middle" transform="rotate(-90 62 225)">60</text>

        <path className="b-dim" d="M110 40 H210 M110 32 V70 M210 32 V70" />
        <text x="160" y="28" textAnchor="middle">20</text>

        <path className="b-dim" d="M442 270 V370 M410 270 H450 M410 370 H450" />
        <text x="462" y="326" textAnchor="start">20</text>

        <path className="b-dim" d="M371 309 L404 244 H452" />
        <text x="404" y="236" textAnchor="start">Ø6 thru</text>
      </g>
    </svg>
  );
}
