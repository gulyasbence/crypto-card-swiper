import https from 'https';
import readline from 'readline';
import { exec } from 'child_process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Creating GitHub repository...\n');

rl.question('Enter your GitHub username: ', (username) => {
  rl.question('Enter your GitHub personal access token (or press Enter to skip): ', (token) => {
    if (!token) {
      console.log('\n❌ Personal access token is required to create repository programmatically.');
      console.log('📋 Please create the repository manually:');
      console.log('1. Go to https://github.com/new');
      console.log('2. Repository name: crypto-card-swiper');
      console.log('3. Make it Public');
      console.log('4. DO NOT initialize with README, .gitignore, or license');
      console.log('5. Click "Create repository"');
      console.log('\nThen run: git remote add origin https://github.com/' + username + '/crypto-card-swiper.git');
      console.log('git push -u origin main');
      rl.close();
      return;
    }

    const data = JSON.stringify({
      name: 'crypto-card-swiper',
      description: 'A Tinder-like crypto card swiper built with React and Framer Motion',
      private: false,
      auto_init: false
    });

    const options = {
      hostname: 'api.github.com',
      port: 443,
      path: '/user/repos',
      method: 'POST',
      headers: {
        'Authorization': 'token ' + token,
        'User-Agent': 'crypto-card-swiper-setup',
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 201) {
          console.log('✅ Repository created successfully!');
          console.log('🔗 Repository URL: https://github.com/' + username + '/crypto-card-swiper');
          console.log('\n📤 Now pushing code...');
          
                     // Execute git commands
          exec('git remote add origin https://github.com/' + username + '/crypto-card-swiper.git', (error) => {
            if (error) {
              console.log('⚠️  Remote already exists or error occurred');
            }
            exec('git push -u origin main', (error) => {
              if (error) {
                console.log('❌ Error pushing to GitHub:', error.message);
              } else {
                console.log('✅ Code pushed successfully!');
                console.log('🌐 Your app will be available at: https://' + username + '.github.io/crypto-card-swiper/');
              }
            });
          });
        } else {
          console.log('❌ Error creating repository:', responseData);
        }
        rl.close();
      });
    });

    req.on('error', (error) => {
      console.log('❌ Error:', error.message);
      rl.close();
    });

    req.write(data);
    req.end();
  });
}); 