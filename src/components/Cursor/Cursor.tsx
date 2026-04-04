// The RAF loop in useSpringLoop writes to #cursor via direct DOM manipulation.
// React owns the element's lifetime; the hook owns its position and classes.
export function Cursor() {
  return <div id="cursor" aria-hidden="true" />;
}
