const fs = require('fs');
const https = require('https');
const path = require('path');

const fieldIds = [
  'af1a56b9-1907-44cb-bdac-ef9037cba97a',
  'daa83822-2505-484d-a3ac-a45a02ceaa94',
  'e076e564-b91d-40d6-b2d5-4273f0837400',
  '5effa860-3529-4ac2-824d-f3cfd1242798',
  '4797e914-08a2-4c56-be52-d85401b5cb66',
  'fe5341f7-2e06-4d58-912f-75ffb41433ec',
  '1715289c-2ae1-4d34-a390-64082c2acba5',
  'aed228e8-5932-445c-8a27-3ae4d63d65cc'
];

const imageUrls = [
  'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800', // Soccer field 1
  'https://images.unsplash.com/photo-1536122985607-4fe00b283652?w=800', // Soccer field 2
  'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800', // Soccer field 3
  'https://images.unsplash.com/photo-1550881111-7cfde14d0de0?w=800', // Soccer field 4
  'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=800', // Soccer field 5
  'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=800', // Soccer field 6
  'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800', // Soccer field 7
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800'  // Soccer field 8
];

const targetDir = path.join(__dirname, '../public/assets/images/fields');

// Create the directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Download images
fieldIds.forEach((fieldId, index) => {
  const imageUrl = imageUrls[index];
  const fileName = `${fieldId}.jpg`;
  const filePath = path.join(targetDir, fileName);

  https.get(imageUrl, (response) => {
    const fileStream = fs.createWriteStream(filePath);
    response.pipe(fileStream);

    fileStream.on('finish', () => {
      console.log(`Downloaded ${fileName}`);
      fileStream.close();
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${fileName}:`, err.message);
  });
}); 