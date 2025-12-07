export function authenticateClient(request: any): boolean {
  const url = new URL(request.url!, `http://${request.headers.host}`);
  const apiKey = url.searchParams.get("api_key");
  return apiKey === process.env.API_KEY;
}
