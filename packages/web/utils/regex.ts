/**
 * 检查 URL 是否没有带查询参数。
 * @param url 要检查的 URL 字符串。
 * @returns 返回 true 如果 URL 没有带查询参数，否则返回 false。
 */
export function checkURLHasNoQuery(url: string): boolean {
  return !/\?/.test(url) // 正则表达式来检查 URL 中是否不包含 '?' 符号
}

/**
 * 檢查 URL 是否包含 .svg 或 .ico 擴展名。
 * @param url 要檢查的 URL 字符串。
 * @returns 返回 true 如果 URL 包含 .svg .ico .vue  擴展名，否則返回 false。
 */
export function checkURLForExtensions(url: string): boolean {
  const pattern = /\.(svg|ico|vue)$/i // 正則表達式來檢查 URL 結尾部分是否包含 .svg .ico .vue
  return pattern.test(url)
}

/**
 * 檢查 URL 是否包含 `_nuxt`。
 * @param url 要檢查的 URL 字符串。
 * @returns 返回 true 如果 URL 包含 `_nuxt`，否則返回 false。
 */
export function checkURLForNuxt(url: string): boolean {
  const pattern = /_nuxt/ // 正則表達式來檢查 URL 是否包含 `_nuxt`
  return pattern.test(url)
}

/**
 * 檢查 URL 是否包含 'localhost'。
 * @param url 要檢查的 URL 字符串。
 * @returns 返回 true 如果 URL 包含 'localhost'，否則返回 false。
 */
export function checkURLForLocalhost(url: string): boolean {
  const pattern = /localhost/ // 正則表達式來檢查 URL 是否包含 'localhost'
  return pattern.test(url)
}

/**
 * 檢查一個字符串是否為有效的 Base64 編碼數據。
 * @param str 要檢查的字符串。
 * @returns 返回 true 如果字符串是有效的 Base64 編碼數據，否則返回 false。
 */
export function isValidBase64<T = string>(str: T): boolean {
  if (typeof str !== 'string')
    return false

  // 正則表達式匹配有效的 Base64 編碼數據
  const regex = /^[A-Za-z0-9+/]+={0,2}$/
  return regex.test(str)
}

/**
 * 檢查一個字符串是否包含 "image" 或 "img"。
 * @param str 要檢查的字符串。
 * @returns 返回 true 如果字符串包含 "image" 或 "img"，否則返回 false。
 */
export function containsImageOrImg<T = string>(str: T): boolean {
  if (typeof str !== 'string')
    return false

  // 正則表達式匹配 "image" 或 "img"
  const regex = /\b(img|image)\b/i
  return regex.test(str)
}
