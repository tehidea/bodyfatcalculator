import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'

export function useCollapsibleHeader() {
  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y
    },
  })

  return { scrollY, scrollHandler } as const
}
