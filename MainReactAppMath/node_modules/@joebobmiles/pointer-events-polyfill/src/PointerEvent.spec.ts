import { createEvent, fireEvent, } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

import PointerEvent from "./PointerEvent";

if (!global.PointerEvent) global.PointerEvent = PointerEvent as any;

describe("PointerEvent", () =>
{
  const createPointerEvent = (
    eventName = "pointerDown",
    eventInit: PointerEventInit = {},
    target?: Element
  ): PointerEvent =>
  {
    target = target ?? document.createElement("div");
    return createEvent(eventName, target, eventInit) as PointerEvent;
  };

  describe.each([
    [ "pointerover" ],
    [ "pointerenter" ],
    [ "pointerleave" ],
    [ "pointerdown" ],
    [ "pointerup" ],
    [ "pointermove" ],
    [ "pointercancel" ],
    [ "pointerout" ],
    [ "gotpointercapture" ],
    [ "lostpointercapture" ]
  ])("When event is fired", (eventName) =>
  {
    describe(`When event is ${eventName}`, () =>
    {
      it(`Has type ${eventName}.`, () =>
      {
        expect(createPointerEvent(eventName).type).toBe(eventName);
      });

      it(`Invokes ${eventName} callback.`, () =>
      {
        const target = document.createElement("div");
        const callback = jest.fn();

        target.addEventListener(eventName, callback);
        fireEvent(target, createEvent(eventName, target));

        expect(callback).toBeCalledTimes(1);
      });
    });
  });

  describe.each([
    [
      "pointerId",
      {
        "given": 2,
        "default": 0,
      }
    ],
    [
      "width",
      {
        "given": 10,
        "default": 1,
      }
    ],
    [
      "height",
      {
        "given": 10,
        "default": 1,
      }
    ],
    [
      "pressure",
      {
        "given": 1200,
        "default": 0,
      }
    ],
    [
      "tangentialPressure",
      {
        "given": 100,
        "default": 0,
      }
    ],
    [
      "tiltX",
      {
        "given": 5,
        "default": 0,
      }
    ],
    [
      "tiltY",
      {
        "given": 5,
        "default": 0,
      }
    ],
    [
      "twist",
      {
        "given": 12,
        "default": 0,
      }
    ],
    [
      "pointerType",
      {
        "given": "touch",
        "default": "",
      }
    ],
    [
      "isPrimary",
      {
        "given": true,
        "default": false,
      }
    ]
  ])("When given an options object", (key, values) =>
  {
    describe(`When options.${key} is set`, () =>
    {
      it(`Has given value.`, () =>
      {
        const options: any = {};
        options[key] = values.given;

        const target = document.createElement("div");
        const pointerEvent: any =
          createEvent.pointerDown(target, options);

        expect(pointerEvent[key]).toBe(values.given);
      });
    });

    describe(`When options.${key} is not set`, () =>
    {
      it(`Has default value.`, () =>
      {
        const target = document.createElement("div");
        const pointerEvent: any = createEvent.pointerDown(target, {});

        expect(pointerEvent[key]).toBe(values.default);
      });
    });
  });
});
