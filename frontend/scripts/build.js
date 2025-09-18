const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building AI Mail Agent...');

try {
  // Run the build command
  execSync('npm run build', { stdio: 'inherit' });
  
  // Check if build was successful
  const buildDir = path.join(__dirname, '..', 'build');
  if (fs.existsSync(buildDir)) {
    console.log('✅ Build completed successfully!');
    console.log('📁 Build files are in the "build" directory');
    console.log('🌐 You can serve the build directory with any static file server');
  } else {
    console.log('❌ Build failed - no build directory found');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
