/**
 * Cloudflare Worker — Edge Middleware
 *
 * Lightweight proxy / middleware layer. This worker:
 *  - Proxies /api/* requests to the external backend
 *  - Adds CORS headers
 *  - Validates auth tokens (optional)
 *  - Applies caching for GET requests
 *
 * Deploy with: npx wrangler deploy --config workers/edge-proxy/wrangler.toml
 *
 * This worker must NOT contain core backend logic.
 */

export interface Env {
  BACKEND_API_URL: string; // e.g. "https://api.vytreon.com"
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Only proxy paths starting with /api/
    if (!url.pathname.startsWith("/api/")) {
      return new Response("Not Found", { status: 404 });
    }

    // Build upstream URL — strip the /api prefix
    const backendUrl = (env.BACKEND_API_URL || "https://api.vytreon.com") +
      url.pathname.replace(/^\/api/, "") +
      url.search;

    // Forward the request
    const headers = new Headers(request.headers);
    headers.set("X-Forwarded-For", request.headers.get("cf-connecting-ip") || "");

    const upstreamResponse = await fetch(backendUrl, {
      method: request.method,
      headers,
      body: request.method !== "GET" && request.method !== "HEAD"
        ? request.body
        : undefined,
    });

    // Clone response and add CORS + cache headers
    const response = new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: upstreamResponse.headers,
    });

    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Cache GET responses at the edge for 60s
    if (request.method === "GET" && upstreamResponse.ok) {
      response.headers.set("Cache-Control", "public, s-maxage=60");
    }

    return response;
  },
};
