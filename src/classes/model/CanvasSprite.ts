export interface Element {
  naturalHeight: number;
  naturalWidth: number;
}

export interface SpriteCanvas {
  canvas: OffscreenCanvas
  left: number
  top: number
}

export interface CanvasSprite {
  element: HTMLImageElement | Element
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

export interface CanvasContext {
  ctx: OffscreenCanvasRenderingContext2D,
  centerPointLeft: number,
  centerPointTop: number,
}

export function drawImage(ctx: CanvasContext, img: HTMLImageElement | OffscreenCanvas, imgCenterLeft: number, imgCenterTop: number, translateRight: number = 0, translateTop: number = 0, angle: number = 0) {
  const centerPointLeft = ctx.centerPointLeft - imgCenterLeft;
  const centerPointTop = ctx.centerPointTop - imgCenterTop;
  let realAngle = angle % 360;
  if (realAngle !== 0) {
    realAngle = 360 - realAngle;
    const rotateImageCanvas = rotateImage(img, imgCenterLeft, imgCenterTop, realAngle);
    ctx.ctx.drawImage(rotateImageCanvas.canvas, ctx.centerPointLeft - rotateImageCanvas.left + translateRight, ctx.centerPointTop - rotateImageCanvas.top - translateTop);
  } else {
    ctx.ctx.drawImage(img, centerPointLeft + translateRight, centerPointTop - translateTop);
  }
}

function rotateImage(img: HTMLImageElement | OffscreenCanvas, imgCenterLeft: number, imgCenterTop: number, angle: number): SpriteCanvas {
  const top = imgCenterTop;
  const bottom = img.height - imgCenterTop;
  const left = imgCenterLeft;
  const right = img.width - imgCenterLeft;
  const diagonal1 = Math.sqrt(top ** 2 + right ** 2);
  const diagonal2 = Math.sqrt(right ** 2 + bottom ** 2);
  const diagonal3 = Math.sqrt(bottom ** 2 + left ** 2);
  const diagonal4 = Math.sqrt(left ** 2 + top ** 2);
  const diagonal = Math.max(diagonal1, diagonal2, diagonal3, diagonal4);
  const offscreenCanvas = new OffscreenCanvas(diagonal * 2, diagonal * 2);
  const ctx = offscreenCanvas.getContext('2d');
  if (ctx) {
    ctx.imageSmoothingEnabled = false;
    ctx.translate(offscreenCanvas.width / 2, offscreenCanvas.height / 2);
    ctx.rotate(angle * Math.PI / 180);
    ctx.drawImage(img, -imgCenterLeft, -imgCenterTop);
  }
  return {
    canvas: offscreenCanvas,
    left: offscreenCanvas.width / 2,
    top: offscreenCanvas.height / 2
  };
}

export function computeWeaponCanvasSprites(underSpriteImg: HTMLImageElement | undefined, gunSpriteImg: HTMLImageElement | undefined, weaponSpriteImg: HTMLImageElement, projSpriteImg: HTMLImageElement | undefined, offsetPairs?: [number, number][]) {
  const canvasSprites: CanvasSprite[] = [];
  if (underSpriteImg) { canvasSprites.push(defaultCanvasSprite(underSpriteImg)); }
  if (gunSpriteImg) {
    canvasSprites.push(defaultCanvasSprite(gunSpriteImg));
  }
  canvasSprites.push(defaultCanvasSprite(weaponSpriteImg));
  if (offsetPairs && offsetPairs.length > 0 && projSpriteImg) {
    for (const offsetPair of offsetPairs) {
      canvasSprites.push({
        element: projSpriteImg,
        centerOffsetX: 0,
        centerOffsetY: 0,
        translateX: offsetPair[1],
        translateY: offsetPair[0],
        degree: 0
      });
    }
  }
  return computeCanvasSprites(...canvasSprites);
}

export function drawWeapon(underSpriteImg: HTMLImageElement | undefined, gunSpriteImg: HTMLImageElement | undefined, weaponSpriteImg: HTMLImageElement, projSpriteImg: HTMLImageElement | undefined, offsetPairs: [number, number][] | undefined, myCtx: CanvasContext) {
  if (underSpriteImg) { drawImage(myCtx, underSpriteImg, underSpriteImg.width / 2, underSpriteImg.height / 2); }
  if (gunSpriteImg) { drawImage(myCtx, gunSpriteImg, gunSpriteImg.width / 2, gunSpriteImg.height / 2); }
  drawImage(myCtx, weaponSpriteImg, weaponSpriteImg.width / 2, weaponSpriteImg.height / 2);
  if (offsetPairs && offsetPairs.length > 0 && projSpriteImg) {
    for (const offsetPair of offsetPairs) {
      drawImage(myCtx, projSpriteImg, projSpriteImg.width / 2, projSpriteImg.height / 2, offsetPair[1], offsetPair[0]);
    }
  }
}
