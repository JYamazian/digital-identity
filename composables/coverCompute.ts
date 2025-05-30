import { useRuntimeConfig } from '#app'

export function useCoverCompute() {
    const config = useRuntimeConfig().public;
    const backgroundStyle = computed(() => {
        if (config.imageCover) return {
            backgroundImage: `url('${config.imageCover}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        };
    });

  return {
    backgroundStyle
  }
}