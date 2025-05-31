type LogLevel = 'debug' | 'info' | 'warn' | 'error'

const LEVELS: LogLevel[] = ['debug', 'info', 'warn', 'error']

export function useLogger(componentName = 'App') {
  const config = useRuntimeConfig().public
  const logLevel = (config.logLevel || 'info') as LogLevel
  const logFormat = config.logFormat || 'text' // 'text' or 'json'

  // Only include build info if both exist and are truthy
  const buildInfo = (config.buildFlavor && config.buildVersion)
    ? `${config.buildFlavor}-${config.buildVersion}`
    : ''

  const shouldLog = (level: LogLevel) =>
    LEVELS.indexOf(level) >= LEVELS.indexOf(logLevel)

  const log = (level: LogLevel, ...args: any[]) => {
    if (!shouldLog(level)) return

    const timestamp = new Date().toISOString()

    if (logFormat === 'json') {
      const entry: Record<string, any> = {
        timestamp,
        level: level.toUpperCase(),
        component: componentName,
        message: args.map(arg => {
          try {
            return typeof arg === 'object'
              ? JSON.stringify(arg)
              : String(arg)
          } catch {
            return '[Unserializable Object]'
          }
        }).join(' ')
      }

      if (buildInfo) {
        entry.build = buildInfo
      }

      console[level](JSON.stringify(entry))
    } else {
      // Plain text output with no colors
      const prefix = `[${timestamp}] [${componentName}] [${level.toUpperCase()}]`
      const buildStr = buildInfo ? `[Build: ${buildInfo}]` : ''
      console[level](prefix, buildStr, ...args)
    }
  }

  return {
    debug: (...args: any[]) => log('debug', ...args),
    info:  (...args: any[]) => log('info',  ...args),
    warn:  (...args: any[]) => log('warn',  ...args),
    error: (...args: any[]) => log('error', ...args)
  }
}
