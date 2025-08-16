// scripts/serve-react-counter.js
// Clean example dist, build the project, copy dist to the example, and start a server.

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const rootDist = path.join(repoRoot, 'dist');
const exampleDir = path.join(repoRoot, 'examples', 'react-counter');
const exampleDist = path.join(exampleDir, 'dist');
const PORT = process.env.PORT || '5173';

function log(step, extra = '') {
  // eslint-disable-next-line no-console
  console.log(`\n[EI] ${step}${extra ? ' ' + extra : ''}`);
}

function rmDirIfExists(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function copyRecursive(src, dest) {
  fs.cpSync(src, dest, { recursive: true });
}

try {
  log('1/4 Removing example dist if it exists:', exampleDist);
  rmDirIfExists(exampleDist);

  log('2/4 Building library (npm run build)');
  execSync('npm run build', { cwd: repoRoot, stdio: 'inherit' });

  if (!fs.existsSync(rootDist)) {
    throw new Error('dist folder not found at the repo root after build.');
  }

  log('3/4 Copying dist to the example:', `${rootDist} -> ${exampleDist}`);
  copyRecursive(rootDist, exampleDist);

  log('4/4 Starting static server:', `http://localhost:${PORT}`);
  const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const child = spawn(npxCmd, ['serve', exampleDir, '-l', PORT], {
    stdio: 'inherit',
    cwd: repoRoot,
  });

  child.on('exit', (code) => {
    process.exit(code ?? 0);
  });
} catch (err) {
  // eslint-disable-next-line no-console
  console.error('[EI] Error:', err.message || err);
  process.exit(1);
}
