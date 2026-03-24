export const MEMBER_LIST_HEADER_REM = 3.5;
export const MEMBER_LIST_ROW_SLOT_REM = 5.75;
export const MEMBER_LIST_VISIBLE_ROW_SLOTS = 10;

/** Table scroll area and `RingGraph` height — keep in sync so the two panels match. */
export function memberListTableViewportHeight(): string {
  return `min(calc(${MEMBER_LIST_HEADER_REM}rem + ${MEMBER_LIST_VISIBLE_ROW_SLOTS} * ${MEMBER_LIST_ROW_SLOT_REM}rem), 92vh)`;
}
