import { Component } from '@angular/core';

@Component({
    selector: 'app-component-testing',
    standalone: true,
    template: `
    <div class="demo-container">
      <h2>🧩 Component Testing with Playwright</h2>
      
      <div class="section">
        <h3>Mounting Components</h3>
        <pre>{{ componentExample }}</pre>
      </div>

      <div class="benefits">
        <div class="benefit">Fast execution</div>
        <div class="benefit">Isolated testing</div>
        <div class="benefit">Real browser</div>
      </div>
    </div>
  `,
    styles: [`
    .demo-container { padding: 2rem; max-width: 900px; }
    h2 { color: #667eea; }
    .section { margin: 2rem 0; background: white; padding: 1.5rem; border-radius: 8px; }
    pre { background: #1e293b; color: #e2e8f0; padding: 1rem; border-radius: 4px; overflow-x: auto; }
    .benefits { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 2rem; }
    .benefit { padding: 1rem; background: #e0e7ff; border-radius: 4px; text-align: center; font-weight: 600; }
  `]
})
export class ComponentTestingComponent {
    componentExample = `import { test, expect } from '@playwright/experimental-ct-angular';
import { ButtonComponent } from './button.component';

test('button emits click event', async ({ mount }) => {
  let clicked = false;

  const component = await mount(ButtonComponent, {
    props: {
      label: 'Click me',
      onClick: () => { clicked = true; }
    }
  });

  await component.getByRole('button').click();
  expect(clicked).toBeTruthy();
});`;
}
