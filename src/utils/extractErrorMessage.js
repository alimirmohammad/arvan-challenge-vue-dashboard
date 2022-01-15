export default function extractErrorMessage(error) {
  try {
    if (error.data.message) return error.data.message;
    const [key, value] = Object.entries(error.data.errors)[0];
    return `${key.charAt(0).toUpperCase()}${key.slice(1)} ${value}`;
  } catch (error) {
    return "Something went wrong";
  }
}
