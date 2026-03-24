/** Kept in sync with `SearchableMemberList` scroll viewport — reuse for `RingGraph` height. */

export const MEMBER_LIST_HEADER_REM = 3.5;
export const MEMBER_LIST_ROW_SLOT_REM = 5.75;
export const MEMBER_LIST_VISIBLE_ROW_SLOTS = 10;

/** Same CSS as the table’s `maxHeight` (sticky header + ~N visible rows, capped by viewport). */
export function memberListTableViewportHeight(): string {
  return `min(calc(${MEMBER_LIST_HEADER_REM}rem + ${MEMBER_LIST_VISIBLE_ROW_SLOTS} * ${MEMBER_LIST_ROW_SLOT_REM}rem), 92vh)`;
}
