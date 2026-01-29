export function HoneypotInput() {
  return (
    <input
      type="text"
      name="company"
      tabIndex={-1}
      autoComplete="off"
      className="hidden"
    />
  );
}
