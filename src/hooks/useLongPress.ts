import { useRef, useCallback } from 'react';

interface LongPressOptions {
    shouldPreventDefault?: boolean;
    delay?: number;
}

export const useLongPress = (
    onLongPress: (e: React.MouseEvent | React.TouchEvent) => void,
    onClick: (e: React.MouseEvent | React.TouchEvent) => void,
    { shouldPreventDefault = true, delay = 500 }: LongPressOptions = {}
) => {
    const timeout = useRef<number>();
    const target = useRef<EventTarget>();

    // Track if long press happened to avoid firing click
    const isLongPress = useRef(false);

    const start = useCallback(
        (e: React.MouseEvent | React.TouchEvent) => {
            if (shouldPreventDefault && e.target) {
                e.target.addEventListener('touchend', preventDefault, { passive: false });
                target.current = e.target;
            }

            isLongPress.current = false;
            timeout.current = window.setTimeout(() => {
                onLongPress(e);
                isLongPress.current = true;
            }, delay);
        },
        [onLongPress, delay, shouldPreventDefault]
    );

    const clear = useCallback(
        (e: React.MouseEvent | React.TouchEvent, shouldTriggerClick = true) => {
            if (timeout.current) clearTimeout(timeout.current);

            if (shouldTriggerClick && !isLongPress.current) {
                onClick(e);
            }

            if (shouldPreventDefault && target.current) {
                target.current.removeEventListener('touchend', preventDefault);
            }
        },
        [shouldPreventDefault, onClick]
    );

    const preventDefault = (e: Event) => {
        if (!isTouch(e)) return;
        if (e.touches.length < 2 && e.preventDefault) {
            e.preventDefault();
        }
    };

    const isTouch = (e: Event): e is TouchEvent => {
        return 'touches' in e;
    };

    return {
        onMouseDown: (e: React.MouseEvent) => start(e),
        onTouchStart: (e: React.TouchEvent) => start(e),
        onMouseUp: (e: React.MouseEvent) => clear(e),
        onMouseLeave: (e: React.MouseEvent) => clear(e, false),
        onTouchEnd: (e: React.TouchEvent) => clear(e)
    };
};
