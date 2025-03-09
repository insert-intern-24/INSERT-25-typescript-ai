export default function generateUniqueId() {
  return 'unique-' + Math.random().toString(36).substr(2, 9);
}