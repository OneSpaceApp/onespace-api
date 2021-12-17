export function infoMessage(message?: string, ...optionalParams: string[]) {
    console.log('\x1b[32m%s\x1b[0m', '[INFO]', message, ...optionalParams)
}

export function warningMessage(message?: string, ...optionalParams: string[]) {
    console.warn('\x1b[33m%s\x1b[0m', '[WARNING]', message, ...optionalParams)
}

export function errorMessage(message?: string, ...optionalParams: string[]) {
    console.error('\x1b[31m%s\x1b[0m', '[ERROR]', message, ...optionalParams)
}

export function requestMessage(message?: string, ...optionalParams: string[]) {
    console.log(
        '\x1b[36m%s\x1b[0m \x1b[1m%s\x1b[0m',
        '[REQUEST]',
        message,
        ...optionalParams
    )
}
