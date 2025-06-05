class HypotrochoidCurve {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.time = 0;
      this.layers = [
        { radius1: 300, radius2: 120, d: 90, colorIndex: 0 },
        { radius1: 210, radius2: 90, d: 60, colorIndex: 1 },
        { radius1: 360, radius2: 150, d: 120, colorIndex: 2 },
        { radius1: 270, radius2: 180, d: 150, colorIndex: 0 },
        { radius1: 150, radius2: 60, d: 45, colorIndex: 1 }
      ];
      
      this.colors = ["#CCCCCC", "#E6E6E6", "#FFFFFF"];
      this.speed = 0.05;
      this.isSpeedBoosted = false;
  
      this.resizeCanvas();
      window.addEventListener("resize", () => this.resizeCanvas());
      this.addClickListener();
      this.animate();
    }
  
    resizeCanvas() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      console.log("Canvas size set to:", this.canvas.width, this.canvas.height);
    }
  
    addClickListener() {
      this.canvas.addEventListener("click", () => {
        if (!this.isSpeedBoosted) {
          this.isSpeedBoosted = true;
          this.speed = 0.15;
          setTimeout(() => {
            this.isSpeedBoosted = false;
            this.speed = 0.05;
          }, 5000);
        }
      });
    }
  
    drawHypotrochoid(layer) {
      const ctx = this.ctx;
      const centerX = this.canvas.width / 2;
      const centerY = this.canvas.height / 2;
      const { radius1, radius2, d, colorIndex } = layer;
  
      ctx.beginPath();
      const phase = this.time * 0.7;
      for (let t = 0; t < Math.PI * 2; t += 0.01) {
        const x =
          centerX +
          (radius1 - radius2) * Math.cos(t + phase) +
          d * Math.cos(((radius1 - radius2) / radius2) * (t + phase));
        const y =
          centerY +
          (radius1 - radius2) * Math.sin(t + phase) -
          d * Math.sin(((radius1 - radius2) / radius2) * (t + phase));
  
        if (t === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
  
      ctx.strokeStyle = this.colors[colorIndex];
      ctx.lineWidth = 2.5;
      ctx.globalAlpha = 0.4;
      ctx.stroke();
    }
  
    updateColors() {
      this.layers.forEach((layer) => {
        layer.colorIndex = (layer.colorIndex + 1) % this.colors.length;
      });
    }
  
    animate() {
      const ctx = this.ctx;
      ctx.fillStyle = "#111111";
      ctx.globalAlpha = 0.1;
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  
      this.layers.forEach((layer) => this.drawHypotrochoid(layer));
  
      this.time += this.speed;
  
      if (Math.floor(this.time * 10) % 100 === 0) {
        this.updateColors();
      }
  
      requestAnimationFrame(() => this.animate());
    }
  }
  
  window.addEventListener("load", () => {
    const canvas = document.getElementById("hypotrochoidCurveCanvas");
    if (!canvas) {
      console.error("Canvas not found!");
      return;
    }
  
    new HypotrochoidCurve(canvas);
  });
  
