export interface CanvasSprite {
  element: {
    naturalHeight: number;
    naturalWidth: number;
  }
  centerOffsetX: number
  centerOffsetY: number
  translateX: number
  translateY: number
  degree: number
}

export function defaultCanvasSprite(element: HTMLImageElement): CanvasSprite {
  return {
    element,
    centerOffsetX: 0,
    centerOffsetY: 0,
    translateX: 0,
    translateY: 0,
    degree: 0
  }
}

export interface CanvasResult {
  left: number
  right: number
  top: number
  bottom: number
}

export function computeCanvasSprites(...canvasSprites: CanvasSprite[]): CanvasResult {
  let result: CanvasResult = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
  for (const canvasSprite of canvasSprites) {
    result = addCanvasSprite(result, canvasSprite);
  }
  return result;
}

function addCanvasSprite(canvasResult: CanvasResult, canvasSprite: CanvasSprite): CanvasResult {
  let top = canvasSprite.element.naturalHeight / 2;
  let bottom = canvasSprite.element.naturalHeight / 2;
  let left = canvasSprite.element.naturalWidth / 2;
  let right = canvasSprite.element.naturalWidth / 2;

  top -= canvasSprite.centerOffsetY;
  bottom += canvasSprite.centerOffsetY;
  left += canvasSprite.centerOffsetX;
  right -= canvasSprite.centerOffsetX;

  if (canvasSprite.degree % 360 !== 0) {
    const diagonal1 = Math.sqrt(top ** 2 + right ** 2);
    const diagonal2 = Math.sqrt(right ** 2 + bottom ** 2);
    const diagonal3 = Math.sqrt(bottom ** 2 + left ** 2);
    const diagonal4 = Math.sqrt(left ** 2 + top ** 2);
    const maxDiagonal = Math.max(diagonal1, diagonal2, diagonal3, diagonal4);
    top = maxDiagonal;
    bottom = maxDiagonal;
    left = maxDiagonal;
    right = maxDiagonal;
  }

  top += canvasSprite.translateY
  bottom -= canvasSprite.translateY
  left -= canvasSprite.translateX
  right += canvasSprite.translateX

  return {
    left: Math.max(canvasResult.left, left),
    right: Math.max(canvasResult.right, right),
    top: Math.max(canvasResult.top, top),
    bottom: Math.max(canvasResult.bottom, bottom)
  }
}
