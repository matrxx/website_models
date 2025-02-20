import React, { useEffect, useRef } from 'react';

export default function PlanetsAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Ajuster la taille du canvas
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Créer les images
    const earthImage = new Image();
    const moonImage = new Image();
    
    // Position initiale
    let angle = 0;
    
    function draw() {
      // Effacer le canvas
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Centre du canvas
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Dessiner la Terre
      ctx.drawImage(earthImage, centerX - 100, centerY - 100, 200, 200);
      
      // Dessiner la Lune en orbite
      const radius = 250; // Rayon de l'orbite
      const moonX = centerX + Math.cos(angle) * radius - 50;
      const moonY = centerY + Math.sin(angle) * radius - 50;
      ctx.drawImage(moonImage, moonX, moonY, 100, 100);
      
      // Mettre à jour l'angle pour l'animation
      angle += 0.01;
      
      requestAnimationFrame(draw);
    }

    // Charger les images
    earthImage.onload = () => {
      moonImage.onload = () => {
        draw();
      };
      moonImage.src = 'C:/Users/lucas/OneDrive/Desktop/Projet/games website/Bomboclatt/moon.png';
    };
    earthImage.src = 'C:/Users/lucas/OneDrive/Desktop/Projet/games website/Bomboclatt/earth.png';

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="w-full h-screen bg-black"
    />
  );
}