/**
 * The PointerEvent interface as described by W3C:
 * https://www.w3.org/TR/pointerevents/#pointerevent-interface
 */
interface IPointerEvent
{
  pointerId: number;

  width: number;
  height: number;

  pressure: number;
  tangentialPressure: number;

  tiltX: number;
  tiltY: number;

  twist: number;

  pointerType: string;

  isPrimary: boolean;
}

export default class PointerEvent extends MouseEvent implements IPointerEvent
{
  public pointerId: number;

  public width: number;
  public height: number;

  public pressure: number;
  public tangentialPressure: number;

  public tiltX: number;
  public tiltY: number;

  public twist: number;

  public pointerType: string;

  public isPrimary: boolean;

  constructor(type: string, options?: PointerEventInit)
  {
    super(type, options);

    this.pointerId = options?.pointerId ?? 0;

    this.width = options?.width ?? 1;
    this.height = options?.height ?? 1;

    this.pressure = options?.pressure ?? 0;
    this.tangentialPressure = options?.tangentialPressure ?? 0;

    this.tiltX = options?.tiltX ?? 0;
    this.tiltY = options?.tiltY ?? 0;

    this.twist = options?.twist ?? 0;

    this.pointerType = options?.pointerType ?? "";

    this.isPrimary = options?.isPrimary ?? false;
  }
}
