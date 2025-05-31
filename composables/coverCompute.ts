import { useRuntimeConfig } from '#app'
import { useLogger } from './logger';

export function useCoverCompute() {
  const log = useLogger('useCoverCompute');
  const config = useRuntimeConfig().public;
  const backgroundStyle = computed(() => {
      if (!config.imageCover) {
        log.debug('No cover image configured');
        return {};
      } else{
        log.debug('Cover image configured:', config.imageCover);
        return {
          backgroundImage: `url('${config.imageCover}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        };
      }
  });

  return {
    backgroundStyle
  }
}