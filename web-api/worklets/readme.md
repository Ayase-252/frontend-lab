# Worklet API

[Worklet API](https://www.w3.org/TR/worklets-1/) is
designed to run scripts in stages of rendering pipeline
independent of the main javascript execution environment. It's a
fundamental infrastructure for [CSS Houdini](https://developer.mozilla.org/en-US/docs/Web/Houdini),
which proposes to expose parts of the CSS engine to developers and
gives developers more power to extend the CSS.

Worklet API is fundamental, because other APIs in CSS Houdini are built
upon Worklet API.

## What is Worklet?

By the [specification](https://www.w3.org/TR/worklets-1/), worklet is
defined as an infrastructure to allow extension points in rendering engines,
while keeping guarantees which rendering engines rely currently on. Basically,
it means we can hook some logic into rendering engine with worklet, while keep
current rendering engine free from major change.

This seems a win-win solution,where we, as developer,
get powerful magic to handle rendering process at our will,
and vendors saved tons of money by reusing current rendering engine. However,
the harmony does not come without cost. By reusing the rendering engine,
the new worklet must comply the manner of current rendering technology to
ensure smooth UX, such as:

- Worklet must be fast: Worklet may be called when rendering every frame.
  The large amount calls requires worklet
  must be fast to ensure rendering can be done in reasonable interval.
- Worklet must be idempotent: To be idempotent, it means worklet must
  produce the exactly same outcome with same input. This is because the
  rendering engine may accelerate the rendering process by using parallelism,
  where the same worklet may be initialized to many instances.
  Also, it may create or destroy a worklet at any time. Therefore, to the
  outcome predictable, worklet must be idempotent.

Idempotency poses a relatively strong constraint on worklet. If we treat
a worklet as a function, it means the worklet should be a
[pure function](https://en.wikipedia.org/wiki/Pure_function).
No side effect is allowed in worklet. For example, you cannot do a
I/O related action, refer a global object which may have effects on other
worklet instances or use a time-dependent object.
