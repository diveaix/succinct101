const imageStrip = document.getElementById('imageStrip');
const startBtn = document.getElementById('startBtn');
const resultDiv = document.getElementById('result');

const images = imageStrip.querySelectorAll('img');
const imageWidth = images[0].clientWidth;
const totalImages = images.length;

startBtn.addEventListener('click', () => {
  resultDiv.innerHTML = ''; // Clear previous result
  imageStrip.style.transition = 'none';

  let position = 0;
  let speed = 20;
  let duration = 3000;

  const loop = setInterval(() => {
    position -= speed;
    if (Math.abs(position) >= imageWidth * totalImages) {
      position = 0;
    }
    imageStrip.style.transform = `translateX(${position}px)`;
  }, 16); // ~60fps

  setTimeout(() => {
    clearInterval(loop);

    const randomIndex = Math.floor(Math.random() * totalImages);
    const finalPosition = -randomIndex * imageWidth;

    imageStrip.style.transition = 'transform 0.8s ease-out';
    imageStrip.style.transform = `translateX(${finalPosition}px)`;

    // Define option names if you want them more descriptive than "Option 1", etc.
    const optionNames = [
      'Blue Blaster',
      'Green Gang',
      'Orange Ops',
      'Pink Phantoms',
      'Purple Pulse'
    ];
    const selectedName = optionNames[randomIndex] || `Option ${randomIndex + 1}`;

    // Create result message
    const resultMessage = `🎉 Selected: ${selectedName}`;

    // Create share URL
    const shareText = encodeURIComponent(`I just got ${selectedName} in the SUCCINCT ARMY RANDOMIZER! Try your luck:`);
    const shareURL = `https://x.com/intent/tweet?text=${shareText} https://succinct-army.vercel.app`;

    // Create Share button
    const shareButton = document.createElement('a');
    shareButton.href = shareURL;
    shareButton.target = '_blank';
    shareButton.innerText = 'Share on X';
    shareButton.style.display = 'inline-block';
    shareButton.style.marginTop = '12px';
    shareButton.style.padding = '10px 20px';
    shareButton.style.backgroundColor = '#1da1f2';
    shareButton.style.color = '#fff';
    shareButton.style.borderRadius = '6px';
    shareButton.style.textDecoration = 'none';
    shareButton.style.fontWeight = 'bold';

    // Display result and share button
    resultDiv.innerHTML = resultMessage + '<br>';
    resultDiv.appendChild(shareButton);
  }, duration);
});
