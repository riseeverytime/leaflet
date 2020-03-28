import { Evented, LeafletEventHandlerFnMap } from 'leaflet'
import { useEffect, useRef } from 'react'

import { LeafletElement } from './element'

export interface EventedProps {
  eventHandlers?: LeafletEventHandlerFnMap
}

export function useEventHandlers(
  element: LeafletElement<Evented> | null,
  eventHandlers: LeafletEventHandlerFnMap | null | undefined,
) {
  const eventHandlersRef = useRef<LeafletEventHandlerFnMap | null | undefined>()

  useEffect(
    function addEventHandlers() {
      if (element === null) {
        return
      }

      if (eventHandlers !== eventHandlersRef.current) {
        if (eventHandlersRef.current != null) {
          element.instance.off(eventHandlersRef.current)
        }
        if (eventHandlers != null) {
          element.instance.on(eventHandlers)
        }
        eventHandlersRef.current = eventHandlers
      }

      return function removeEventHandlers() {
        if (eventHandlersRef.current != null) {
          element.instance.off(eventHandlersRef.current)
        }
        eventHandlersRef.current = null
      }
    },
    [element, eventHandlers],
  )
}
