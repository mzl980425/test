export default function handler(request) {
  // 根据请求方法 (request.method) 执行不同逻辑
  switch (request.method) {
    case "GET":
      // 处理 GET 请求
      return new Response("Hello from a GET request!");

    case "POST":
      // 处理 POST 请求
      // const body = await request.json(); // 如果需要，可以读取请求体
      return new Response("Hello from a POST request!");

    case "PUT":
      // 处理 PUT 请求
      return new Response("Hello from a PUT request!");

    case "DELETE":
      // 处理 DELETE 请求
      return new Response("Hello from a DELETE request!");

    // ...可以添加其他方法如 PATCH, OPTIONS, HEAD

    default:
      // 如果是不支持的方法，可以返回一个错误
      return new Response(`Method ${request.method} Not Allowed`, {
        status: 405,
        headers: {
          Allow: "GET, POST, PUT, DELETE",
        },
      });
  }
}

// 告诉 Vercel 这个函数在 Edge Runtime 上运行
export const runtime = "edge";
