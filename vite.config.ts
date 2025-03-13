import { defineConfig } from 'vite';
import { resolve } from 'path';
import { execSync } from 'child_process';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'state-signal',
      fileName: 'index',
      formats: ['es', 'umd'],
    },
    sourcemap: true,
    minify: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        entryFileNames: '[name].[format].js',
        chunkFileNames: '[name]-[hash].[format].js',
      },
    },
  },
  // Use a hook to run TypeScript after the build
  plugins: [
    {
      name: 'generate-types',
      closeBundle() {
        execSync(
          'tsc --jsx react-jsx --emitDeclarationOnly --declarationDir ./dist',
          {
            stdio: 'inherit',
          }
        );
      },
    },
    {
      name: 'cleanup-assets',
      closeBundle() {
        // Remove any non-essential files from dist
        execSync('rm -f ./dist/*.svg ./dist/*.map', { stdio: 'inherit' });
      },
    },
  ],
});
