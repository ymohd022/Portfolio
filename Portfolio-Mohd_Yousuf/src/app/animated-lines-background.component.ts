import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Point {
  x: number;
  y: number;
}

class AnimatedLine {
  private startPoint: Point;
  private endPoint: Point;
  private progress: number = 0;
  private speed: number;
  private opacity: number;
  private length: number;

  constructor(width: number, height: number) {
    // Generate random start point
    this.startPoint = {
      x: Math.random() * width,
      y: Math.random() * height
    };
    
    // Create end point with increased length
    const angle = Math.random() * Math.PI * 2;
    this.length = 60 + Math.random() * 20; // Lines between 60-80 pixels
    this.endPoint = {
      x: this.startPoint.x + Math.cos(angle) * this.length,
      y: this.startPoint.y + Math.sin(angle) * this.length
    };
    
    this.speed = 0.005 + Math.random() * 0.008; // Keep same slow speed
    this.opacity = 0.4 + Math.random() * 0.3; // Slightly increased opacity range (0.4-0.7)
  }

  update() {
    this.progress += this.speed;
    if (this.progress >= 1) {
      return true; // Line completed
    }
    return false;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const currentX = this.startPoint.x + (this.endPoint.x - this.startPoint.x) * this.progress;
    const currentY = this.startPoint.y + (this.endPoint.y - this.startPoint.y) * this.progress;

    ctx.beginPath();
    ctx.strokeStyle = `rgba(0, 153, 255, ${this.opacity})`;
    ctx.lineWidth = 0.5; // Keep thin lines
    ctx.moveTo(this.startPoint.x, this.startPoint.y);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
  }
}

@Component({
  selector: 'app-animated-lines-background',
  template: '<canvas #canvas></canvas>',
  styles: [`
    canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: 0.8;
    }
  `]
})
export class AnimatedLinesBackgroundComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private lines: AnimatedLine[] = [];
  private animationFrameId: number | null = null;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.initCanvas();
      // Start with fewer lines
      for (let i = 0; i < 10; i++) {
        this.addNewLine();
      }
    }
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.animate();
    }
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    const updateCanvasSize = () => {
      if (this.isBrowser) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    updateCanvasSize();

    if (this.isBrowser) {
      window.addEventListener('resize', updateCanvasSize);
    }
  }

  private addNewLine() {
    if (this.ctx) {
      this.lines.push(new AnimatedLine(this.ctx.canvas.width, this.ctx.canvas.height));
    }
  }

  private animate() {
    if (!this.ctx || !this.isBrowser) return;

    // Slightly less transparent clear for better visibility
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    // Update and draw existing lines
    this.lines = this.lines.filter(line => {
      const isDone = line.update();
      line.draw(this.ctx);
      return !isDone;
    });

    // Maintain fewer lines
    if (this.lines.length < 10 && Math.random() < 0.1) {
      this.addNewLine();
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }
      window.removeEventListener('resize', () => this.initCanvas());
    }
  }
}