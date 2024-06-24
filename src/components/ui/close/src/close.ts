export interface CloseProps {
  ariaLabel?: string;
  tabindex?: Numberish;
  id?: string;
}

export interface CloseEmits {
  (type: 'click', event: PointerEvent): void;
  (type: 'enter', event: KeyboardEvent): void;
}
