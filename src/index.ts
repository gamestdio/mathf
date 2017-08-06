const FULL_ANGLE = 360;
const STRAIGHT_ANGLE = 180;
const GAMMA_TO_LINEAR = 2.2;
const LINEAR_TO_GAMMA = 0.45454545;
const IS_INTEGER = 0.5;

export const deg2Rad = Math.PI * 2 / FULL_ANGLE;
export const rad2Deg = FULL_ANGLE / (Math.PI * 2);

function toInt(value: number) {
  return value >> 0;
}

/**
* Compares two floating point values if they are similar
*
* @see http://docs.unity3d.com/ScriptReference/Mathf.Approximately.html
* @param f1
* @param f2
* @returns {boolean}
*/
export function approximately(f1: number, f2: number) {
  return Math.abs(f1 - f2) < Number.EPSILON;
}

/**
* Clamps a value between a minimum float and maximum float value
*
* @see http://docs.unity3d.com/ScriptReference/Mathf.Clamp.html
* @param value
* @param min
* @param max
* @returns {number}
*/
export function clamp(value: number, min: number, max: number) {
  return value < min ? min : value > max ? max : value;
}

/**
* Clamps value between 0 and 1 and returns value
*
* @see http://docs.unity3d.com/ScriptReference/Mathf.Clamp01.html
* @param value
* @returns {number}
*/
export function clamp01(value: number) {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

/**
* Returns the closest power of two value
*
* @see http://docs.unity3d.com/ScriptReference/Mathf.ClosestPowerOfTwo.html
* @param value
* @returns {number}
*/
export function closestPowerOfTwo(value: number) {
  let nextValue = nextPowerOfTwo(value);

  // if value is between nextPowerOfTwo and pre-pre nextPowerOfTwo
  if (nextValue - value > nextValue >> 2) {
    // prev power of two
    return nextValue >> 1;
  }

  return nextValue;
}

/**
* Returns the closest power of two long value (useful for more then 32 bit numbers)
*
* @see http://docs.unity3d.com/ScriptReference/Mathf.ClosestPowerOfTwo.html
* @param value
* @returns {number}
*/
export function closestPowerOfTwoLong(value: number) {
  value = toInt(value);

  if (value < 0) return 0;

  // algorithm to find next power of two for long integers
  let nextPowerOfTwo = 2 << Math.floor(Math.log2(value));

  // if value is between nextPowerOfTwo and pre-pre nextPowerOfTwo
  if (nextPowerOfTwo - value > nextPowerOfTwo >> 2) {
    // prev power of two
    return nextPowerOfTwo >> 1;
  }

  return nextPowerOfTwo;
}

/**
* Calculates the shortest difference between two given angles given in degrees
*
* @see http://docs.unity3d.com/ScriptReference/Mathf.DeltaAngle.html
* @param current
* @param target
* @returns {number}
*/
export function deltaAngle(current: number, target: number) {
  if (Math.abs(current) > FULL_ANGLE) {
    current %= FULL_ANGLE;
  }

  if (Math.abs(target) > FULL_ANGLE) {
    target %= FULL_ANGLE;
  }

  return target - current;
}

/**
* Converts the given value from gamma (sRGB) to linear color space
*
* @see http://docs.unity3d.com/ScriptReference/Mathf.GammaToLinearSpace.html
* @param value
* @returns {number}
*/
export function gammaToLinearSpace(value: number) {
  return Math.pow(value, GAMMA_TO_LINEAR);
}

/**
* Calculates the linear parameter t that produces the interpolant value within the range [a, b]
*
* @see http://docs.unity3d.com/ScriptReference/Mathf.InverseLerp.html
* @param a
* @param b
* @param value
* @returns {number}
*/
export function inverseLerp(a: number, b: number, value: number) {
  return (clamp(value, Math.min(a, b), Math.max(a, b)) - a) / (b - a);
}

/**
* Returns true if the value is power of two
*
* @see http://docs.unity3d.com/ScriptReference/Mathf.IsPowerOfTwo.html
* @link http://stackoverflow.com/a/108360
* @param value
* @returns {boolean}
*/
export function isPowerOfTwo(value: number) {
  value = toInt(value);

  return (value & (value - 1)) === 0;
}

/**
* Linearly interpolates between a and b by t
*
* @see http://docs.unity3d.com/ScriptReference/Mathf.Lerp.html
* @param a
* @param b
* @param t
* @returns {number}
*/
export function lerp(a: number, b: number, t: number) {
  return (b - a) * clamp01(t) + a;
}

/**
* Same as Lerp but makes sure the values interpolate correctly when they wrap around 360 degrees
*
* @see http://docs.unity3d.com/ScriptReference/Mathf.LerpAngle.html
* @param a
* @param b
* @param t
* @returns {number}
*/
export function lerpAngle(a: number, b: number, t: number) {
  while (a > b + STRAIGHT_ANGLE) {
    b += FULL_ANGLE;
  }

  while (b > a + STRAIGHT_ANGLE) {
    b -= FULL_ANGLE;
  }

  return lerp(a, b, t);
}

/**
* Linearly interpolates between a and b by t
*
* @see http://docs.unity3d.com/ScriptReference/Mathf.LerpUnclamped.html
* @param a
* @param b
* @param t
* @returns {number}
*/
export function lerpUnclamped(a: number, b: number, t: number) {
  if (t < 0 || t > 1) {
    return a + Math.abs(b - a) * t;
  }

  return (b - a) * clamp01(t) + a;
}

/**
* Converts the given value from linear to gamma (sRGB) color space
*
* @see http://docs.unity3d.com/ScriptReference/Mathf.LinearToGammaSpace.html
* @param value
* @returns {number}
*/
export function linearToGammaSpace(value: number) {
  return Math.pow(value, LINEAR_TO_GAMMA);
}

/**
* Moves a value current towards target
*
* @see http://docs.unity3d.com/ScriptReference/Mathf.MoveTowards.html
* @param current
* @param target
* @param maxDelta
* @returns {number}
*/
export function moveTowards(current: number, target: number, maxDelta: number) {
  if (maxDelta > 0) {
    if (target < current && current - maxDelta < target) return target;
    else if (target > current && current + maxDelta > target) return target;
  }

  if (current > target) {
    return current - maxDelta;
  }

  return current + maxDelta;
}

/**
* TODO:
* Same as MoveTowards but makes sure the values interpolate correctly when they wrap around 360 degrees
*
* @see http://docs.unity3d.com/ScriptReference/Mathf.MoveTowardsAngle.html
* @deprecated
* @param current
* @param target
* @param maxDelta
* @returns {number}
*/
function moveTowardsAngle(current: number, target: number, maxDelta: number) {}

/**
* Returns the next power of two value
*
* @see http://docs.unity3d.com/ScriptReference/Mathf.NextPowerOfTwo.html
* @param value
* @returns {number}
*/
export function nextPowerOfTwo(value: number): number {
  value = toInt(value);

  if (value < 0) return 0;

  --value;
  value |= value >> 1;
  value |= value >> 2;
  value |= value >> 4;
  value |= value >> 8;
  value |= value >> 16;
  value += 1;

  return value;
}

/**
* PingPongs the value t, so that it is never larger than length and never smaller than 0
*
* @see http://docs.unity3d.com/ScriptReference/Mathf.PingPong.html
* @param t
* @param length
* @returns {number}
*/
export function pingPong(t: number, length: number) {
  if (t < 0) t = -t;
  var mod = t % length;
  // if mod is even
  if (Math.ceil(t / length) % 2 === 0) {
    return mod === 0 ? 0 : length - mod;
  }

  return mod === 0 ? length : mod;
}

/**
* Loops the value t, so that it is never larger than length and never smaller than 0
*
* @see http://docs.unity3d.com/ScriptReference/Mathf.Repeat.html
* @param t
* @param length
* @returns {number}
*/
export function repeat(t: number, length: number) {
  if (t > 0) return t % length;

  return length + t % length;
}

/**
* Returns f rounded to the nearest integer
*
* @see http://docs.unity3d.com/ScriptReference/Mathf.Round.html
* @param f
* @returns {number}
*/
export function round(f: number) {
  let ceilVal = f + IS_INTEGER;

  if (ceilVal === Math.ceil(f)) {
    return ceilVal % 2 === 0 ? f + IS_INTEGER : f - IS_INTEGER;
  }

  return Math.round(f);
}

/**
* Returns the sign of f
*
* @see http://docs.unity3d.com/ScriptReference/Mathf.Sign.html
* @param f
* @returns {number}
*/
export function sign(f: number) {
  return f >= 0 ? 1 : -1;
}

/**
* TODO:
* Gradually changes a value towards a desired goal over time
*
* @see http://docs.unity3d.com/ScriptReference/Mathf.SmoothDamp.html
* @deprecated
* @param current
* @param target
* @param currentVelocity
* @param smoothTime
* @param maxSpeed
* @param deltaTime
* @returns {number}
*/
function smoothDamp(
  current: number,
  target: number,
  currentVelocity: number,
  smoothTime: number,
  maxSpeed: number,
  deltaTime: number
) {}

/**
* TODO:
* Gradually changes an angle given in degrees towards a desired goal angle over time
*
* @see http://docs.unity3d.com/ScriptReference/Mathf.SmoothDampAngle.html
* @deprecated
* @param current
* @param target
* @param currentVelocity
* @param smoothTime
* @param maxSpeed
* @param deltaTime
* @returns {number}
*/
function smoothDampAngle(
  current: number,
  target: number,
  currentVelocity: number,
  smoothTime: number,
  maxSpeed: number,
  deltaTime: number,
) {}

/**
* TODO:
* Interpolates between min and max with smoothing at the limits
*
* @see http://docs.unity3d.com/ScriptReference/Mathf.SmoothStep.html
* @deprecated
* @param a
* @param b
* @param t
* @returns {number}
*/
function smoothStep(a: number, b: number, t: number) {}
