export const MEMBER_LIST_ROW_SLOT_REM = 5.75;

/** Student table scroll area (desktop). Capped with dvh for short viewports / mobile browser chrome. */
const MEMBER_LIST_HEADER_REM = 1.9;
const MEMBER_LIST_VISIBLE_ROW_SLOTS = 10;

export function memberListTableViewportHeight(): string {
  const content = `calc(${MEMBER_LIST_HEADER_REM}rem + ${MEMBER_LIST_VISIBLE_ROW_SLOTS} * ${MEMBER_LIST_ROW_SLOT_REM}rem)`;
  return `min(${content}, min(90dvh, 92vh))`;
}

/** Stacked member cards on small screens — scrolls inside a bounded area. */
export function memberListMobileMaxHeight(): string {
  return "min(78dvh, 36rem)";
}

/** Ring graph — row-based size, never taller than most viewports. */
const RING_GRAPH_ROW_SLOTS = 10;

export function ringGraphHeight(): string {
  const content = `calc(${RING_GRAPH_ROW_SLOTS} * ${MEMBER_LIST_ROW_SLOT_REM}rem)`;
  return `min(${content}, min(62dvh, 70vh))`;
}
