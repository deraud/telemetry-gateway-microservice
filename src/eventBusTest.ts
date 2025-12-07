import { subscribe, publish } from "./events/bus";

// Test handler 1.1
subscribe("hello", (data) => {
  console.log("Handler 1 received:", data);
});

// Test handler 1.2
subscribe("hello", (data) => {
  console.log("Handler 2 received:", data);
});

// Test handler 2.1
subscribe("other_event", (data) => {
  console.log("Other event handler:", data);
});

// Test handler 2.2
subscribe("other_event", (data) => {
  console.log("Other event handler:", data);
});

// Publish test event
publish("hello", { msg: "Hi there!" });

// Publish another event
publish("other_event",{ msg: "Hi Other Event!" });
