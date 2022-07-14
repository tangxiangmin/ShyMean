export const isBrowser = typeof window !== 'undefined'
export const isDev = process.env.NODE_ENV === 'development'

export function formatDate(date: string | Date) {
    if (!(date instanceof Date)) {
        date = new Date(date)
    }
    let y: string = date.getFullYear().toString()
    let m: string = (date.getMonth() + 1).toString()
    let d: string = date.getDate().toString()

    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`
}
