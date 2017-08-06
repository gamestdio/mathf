# @gamestdio/mathf

A collection of common math functions for JavaScript/TypeScript.

## Installation

```
npm install @gamestdio/mathf
```

## Usage

```typescript
import { lerpAngle, rad2Deg } from "@gamestdio/mathf";

let targetAngle = Math.PI * rad2Deg;
sprite.rotation = lerpAngle(sprite.rotation, targetAngle, 0.1);
```

## References
- https://github.com/likerRr/mathf-js
- https://docs.unity3d.com/ScriptReference/Mathf.html

## License

MIT
