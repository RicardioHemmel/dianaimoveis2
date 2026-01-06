export default interface ServerActionResponse {
  success: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]> | undefined;
}
