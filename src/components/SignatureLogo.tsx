import React from 'react';

export interface SignatureLogoProps {
  variant?: 'forest' | 'ivory' | 'monochrome';
  className?: string;
  includeSelectableText?: boolean;
  ariaLabel?: string;
}

export function SignatureLogo({
  variant = 'forest',
  className = 'brand-signature-svg',
  includeSelectableText = true,
  ariaLabel = 'Ibrahima Traore',
}: SignatureLogoProps) {
  const strokeColor =
    variant === 'ivory'
      ? '#F7F5EF'
      : variant === 'monochrome'
      ? '#172522'
      : '#173B38';

  const flourishColor =
    variant === 'ivory'
      ? '#A17D43'
      : variant === 'monochrome'
      ? '#172522'
      : '#173B38';

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 560 130"
        fill="none"
        className={className}
        role="img"
        aria-label={ariaLabel}
      >
        <title>{ariaLabel}</title>
        {/* Distinctive Capital 'I' */}
        <path
          d="M 28 44 C 24 27, 45 15, 62 19 C 70 21, 67 31, 56 33 C 49 52, 40 78, 32 95 C 27 104, 16 104, 14 96 C 12 89, 22 83, 36 84 C 52 85, 67 80, 79 72"
          stroke={strokeColor}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Cursive 'brahima' */}
        <path
          d="M 79 72 C 88 54, 98 30, 102 22 C 105 16, 97 18, 93 29 C 87 46, 80 72, 82 82 C 84 90, 96 89, 102 80 C 107 72, 104 64, 97 66 C 92 67, 94 75, 104 75 C 112 75, 117 67, 121 63 C 125 60, 130 62, 128 69 C 126 76, 125 83, 131 84 C 138 85, 146 76, 152 68 C 156 63, 147 61, 141 66 C 134 72, 133 82, 140 84 C 146 86, 153 77, 157 68 C 155 76, 155 83, 162 84 C 170 85, 180 65, 188 44 C 194 28, 198 18, 194 17 C 189 16, 182 34, 176 56 C 171 73, 169 84, 171 84 C 174 84, 181 69, 187 66 C 193 63, 195 72, 194 79 C 193 85, 200 86, 206 79 C 211 73, 214 66, 215 64 C 213 73, 213 82, 219 83 C 225 84, 232 74, 237 66 C 240 62, 243 66, 241 74 C 239 80, 238 83, 241 83 C 245 83, 251 71, 256 66 C 261 62, 264 67, 262 75 C 260 81, 259 84, 263 84 C 268 84, 276 72, 282 66 C 287 61, 290 66, 287 75 C 285 81, 287 85, 294 84 C 302 83, 312 75, 318 67 C 322 62, 314 60, 307 66 C 300 72, 299 82, 306 84 C 313 85, 320 77, 324 68 C 322 76, 323 83, 331 84 C 339 85, 348 78, 355 71"
          stroke={strokeColor}
          strokeWidth="2.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Dot on 'i' */}
        <circle cx="218" cy="50" r="2.3" fill={strokeColor} />
        {/* Distinctive Capital 'T' */}
        <path
          d="M 358 34 C 378 26, 424 18, 468 20 C 496 21, 520 25, 536 22"
          stroke={strokeColor}
          strokeWidth="3.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 412 22 C 403 44, 391 74, 381 94 C 376 103, 367 104, 364 97 C 361 91, 369 83, 380 82"
          stroke={strokeColor}
          strokeWidth="3.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Cursive 'raore' */}
        <path
          d="M 392 78 C 398 70, 404 62, 408 61 C 413 60, 416 63, 414 70 C 412 77, 412 83, 418 84 C 425 85, 434 76, 440 67 C 444 62, 436 60, 429 66 C 422 72, 421 82, 428 84 C 434 85, 441 77, 445 68 C 443 76, 444 83, 451 84 C 458 85, 467 76, 472 67 C 476 61, 468 59, 461 65 C 455 71, 455 82, 463 84 C 471 86, 478 78, 480 69 C 481 63, 476 60, 472 63 C 469 66, 473 71, 481 70 C 488 69, 493 63, 497 61 C 501 59, 505 63, 502 71 C 500 78, 500 83, 506 84 C 513 85, 522 78, 527 70 C 531 64, 526 59, 520 63 C 513 68, 512 79, 520 83 C 529 87, 543 82, 552 74"
          stroke={strokeColor}
          strokeWidth="2.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Restrained Executive Baseline Flourish */}
        <path
          d="M 88 106 C 185 100, 340 97, 498 102 C 514 103, 528 101, 536 98"
          stroke={flourishColor}
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity={variant === 'ivory' ? 0.9 : 0.72}
        />
      </svg>
      {includeSelectableText && <span className="sr-only">Ibrahima Traore</span>}
    </span>
  );
}
