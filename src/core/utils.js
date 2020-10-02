export function getEventName(event) {
    return `on${event[0].toUpperCase()}${event.slice(1)}`
}

