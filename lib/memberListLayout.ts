export const MEMBER_LIST_ROW_SLOT_REM = 5.75;

/** Student table scroll area. */
const MEMBER_LIST_HEADER_REM = 1.9;
const MEMBER_LIST_VISIBLE_ROW_SLOTS = 10;

export function memberListTableViewportHeight(): string {
  return `calc(${MEMBER_LIST_HEADER_REM}rem + ${MEMBER_LIST_VISIBLE_ROW_SLOTS} * ${MEMBER_LIST_ROW_SLOT_REM}rem)`;
}

/** Ring graph — shorter, fixed at 10 row slots capped by viewport. */
const RING_GRAPH_ROW_SLOTS = 10;

export function ringGraphHeight(): string {
  return `min(calc(${RING_GRAPH_ROW_SLOTS} * ${MEMBER_LIST_ROW_SLOT_REM}rem), 70vh)`;
}
