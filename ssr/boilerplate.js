import { html } from 'lit-html';

export default function withBoilerplate (component) {
  return html`
    <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="preconnect" href="https://fonts.gstatic.com">
          <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,600;0,900;1,400;1,900&display=swap" rel="stylesheet">
          <link href="https://fonts.googleapis.com/css2?family=Lato:ital@0;1&display=swap" rel="stylesheet">  
          <style>
            body { 
              font-family: 'Bodoni Moda', serif; 
            }
            canvas {
              position: fixed;
              top: 0; left: 0;
              width: 100%; height: 100%;
            }
          </style>
          <title>James Madden</title>
        </head>
        <body>
          <canvas alt="Plasma Background"></canvas>
          ${component}
          <!-- lit builds static, but rehydrate the components for SPA functionality -->
          <script src="./src/background/background.js" type="module"></script>
          <script src="./src/script.js" type="module"></script>
        </body>
      </html>
  `;
}