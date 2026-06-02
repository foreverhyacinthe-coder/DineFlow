export function health(_request, response) {
  response.json({
    service: "DineFlow API",
    status: "ok",
    timestamp: new Date().toISOString(),
  });
}
