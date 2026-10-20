import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    // 모든 .module.scss에서 @use 'mixins' as *; 로 토큰/믹스인을 바로 쓸 수 있어요.
    includePaths: [path.join(dirname, 'styles')],
  },
};

export default nextConfig;
