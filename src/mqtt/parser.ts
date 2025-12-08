export function parseDeviceId(topic: string): string {
  const parts = topic.split("/");
  const id = parts[1]!
  return id;
}
