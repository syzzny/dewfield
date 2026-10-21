import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    // 모든 .module.scss에서 @use 'mixins' as *; 로 토큰/믹스인을 바로 쓸 수 있어요.
    includePaths: [path.join(dirname, 'styles')],
  },
  images: {
    // 브라우저가 지원하면 WebP로 내려줘요 (JPG보다 가볍고, AVIF보다 변환이 빨라 첫 로딩이 느려지지 않아요)
    formats: ['image/webp'],
  },
};

export default nextConfig;
