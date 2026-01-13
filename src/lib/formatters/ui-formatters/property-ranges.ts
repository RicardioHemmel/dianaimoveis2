export function detailRange(
  pluralFieldName: string,
  min?: number,
  max?: number
) {
  if (!min && !max) return;
  if (min === max && min === 1) {
    const singularFieldName = pluralFieldName.endsWith("s")
      ? pluralFieldName.slice(-1)[0]
      : "m²";
    return `${min}  ${singularFieldName}`;
  } else if (min === max) {
    return `${min}  ${pluralFieldName}`;
  } else {
    return `${min} a ${max} ${pluralFieldName}`;
  }
}
