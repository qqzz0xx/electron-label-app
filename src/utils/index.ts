type AnyF = (...args: any[]) => any

/*
防抖--适用于需要在短时间内大量触发事件，但只需要最后一次触发的结果的场景, 如 输入框搜索联想、窗口大小调整
使用示例
const debouncedFn = debounce(() => {
  console.log("Hello, world!");
}, 1000);

debouncedFn();
*/

export function debounce(fn: AnyF, delay: number) {
  let timerId: any = null

  return function (...args: any[]) {
    if (timerId) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(() => {
      fn(args)
      timerId = null
    }, delay)
  }
}

/*
节流--适用于需要在一定时间间隔内重复触发事件，但只需要控制触发频率的场景， 如 滚动事件、鼠标移动事件 
*/
export function throttle(fn: AnyF, delay: number) {
  let timerId: any = null
  let lastTime = 0

  return function (...args: any[]) {
    const now = Date.now()

    if (now - lastTime >= delay) {
      fn(...args)
      lastTime = now
    } else {
      clearTimeout(timerId)

      timerId = setTimeout(() => {
        fn(...args)
        lastTime = Date.now()
      }, delay - (now - lastTime))
    }
  }
}
