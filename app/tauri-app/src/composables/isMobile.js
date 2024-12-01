import {breakpointsTailwind, useBreakpoints} from '@vueuse/core'
import {computed} from 'vue'

export const useIsMobile = () => {
    const breakpoints = useBreakpoints(breakpointsTailwind)

    const isMobile = computed(() => breakpoints.isSmaller('md'));

    return {
        isMobile
    }
}
