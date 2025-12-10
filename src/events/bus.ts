type EventHandler = (data: any) => void;

const listeners = new Map<string, EventHandler[]>();

export function subscribe(eventName: string, handler: EventHandler) {
  if (!listeners.has(eventName)) {
    listeners.set(eventName, []);
  }
  listeners.get(eventName)!.push(handler);
}

export function publish(eventName: string, data: any) {
  if (!listeners.has(eventName)) return;
  
  for (const handler of listeners.get(eventName)!) {
    handler(data);
  }
}
