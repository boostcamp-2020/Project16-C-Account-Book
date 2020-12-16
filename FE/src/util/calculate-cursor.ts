export default function cursorInElement(cursor, element) {
  if (
    cursor.clientX <= element.x ||
    cursor.clientX >= element.x + element.width
  ) {
    return false;
  }
  if (
    cursor.clientY <= element.y ||
    cursor.clientY >= element.y + element.height
  ) {
    return false;
  }

  return true;
}
