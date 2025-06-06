import axios from "axios";
import { HttpProxyAgent } from "http-proxy-agent";
import { HttpsProxyAgent } from "https-proxy-agent";

export function GET(request) {
  return new Response("Hello from GET");
}

export function POST(request) {
  return new Response("Hello from POST");
}

export function PUT(request) {
  return new Response("Hello from PUT");
}

export function DELETE(request) {
  return new Response("Hello from DELETE");
}
