export function jsonResponse(data, status = 200) {
  return Response.json(data, { status });
}

export async function readJsonBody(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}
