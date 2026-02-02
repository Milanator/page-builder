export const debounce = (fn: (...args: any[]) => void, delay = 300) => {
    let t: number

    return (...args: any[]) => {
        clearTimeout(t)
        t = window.setTimeout(() => fn(...args), delay)
    }
}