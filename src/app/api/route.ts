export function GET(request: Request) {
  console.log("Request:", request);
  return Response.json({ message: "Lotus API" });
}