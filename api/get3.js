export default async function handler(request) {
  return new Response(request.method + ": " + request.url);
}
