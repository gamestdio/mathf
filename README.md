# @gamestdio/mathf

A collection of common math functions for JavaScript/TypeScript.

## Installation

```
npm install @gamestdio/mathf
```

## Usage

```typescript
import { lerpAngle, rad2Deg, deg2Rad } from "@gamestdio/mathf";

let targetAngle = Math.PI * rad2Deg;
sprite.rotation = lerpAngle(sprite.rotation * rad2Deg, targetAngle, 0.1) * deg2Rad;
```

## References
- https://github.com/likerRr/mathf-js
- https://docs.unity3d.com/ScriptReference/Mathf.html

## License

MIT
