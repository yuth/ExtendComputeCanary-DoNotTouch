import { build } from 'esbuild';
import process from 'process';

const buildOutputDir = process.argv[2] || '.amplify-hosting';

const bundle = async () => {
  await Promise.all([
    build({
      entryPoints: ['compute/index.ts'],
      outfile: `${buildOutputDir}/compute/default/index.cjs`,
      bundle: true,
      minify: true,
      platform: 'node',
      sourcemap: false,
      target: 'node18',
      sourcesContent: false,
      define: {
        'process.env.AWS_AMPLIFY_DEPLOYMENT_ID': `"${process.env.AWS_AMPLIFY_DEPLOYMENT_ID}"`,
        'process.env.BUILD_TIME': `"${new Date().toLocaleTimeString()}"`,
      }
    }),
  ]);
};

bundle().catch(console.error);