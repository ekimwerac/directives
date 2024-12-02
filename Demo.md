
## **Angular Demo: Custom Attribute Directive with Standalone Mode**

This demo will walk you through creating and using a custom directive in Angular. The directive dynamically changes the background color of elements using **Angular Dependency Injection (DI)** and supports **static and dynamic values**.

---

### **Step 1: Set Up a New Angular Project**

1. Open a terminal and run the following command to create a new Angular project:

```bash
npx -p @angular/cli ng new highlighted-demo --standalone --skip-tests
```

- **`highlighted-demo`**: The name of your Angular project.
- **`--standalone`**: Generates a project using standalone components (no NgModules).
- **`--skip-tests`**: Skips test file generation for simplicity.

2. Navigate into your project directory:
```bash
cd highlighted-demo
```

3. Start the development server:
```bash
ng serve
```

This sets up the project and opens a default Angular app in your browser at `http://localhost:4200`.

---

### **Step 2: Generate the Directive**

Use the Angular CLI to generate the directive:

```bash
ng generate directive highlighted
```

This creates:
- `src/app/highlighted.directive.ts`: Directive logic.
- `src/app/highlighted.directive.spec.ts`: Test file (optional).

---

### **Step 3: Implement the Directive**

Open the `highlighted.directive.ts` file and modify it as follows:

#### **Code: `highlighted.directive.ts`**
```typescript
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlighted]', // Matches elements with [appHighlighted] attribute
  standalone: true // Enables standalone usage without NgModule
})
export class HighlightedDirective implements OnInit {
  @Input() appHighlighted: string | undefined; // Accepts static or dynamic background color

  constructor(private el: ElementRef) {} // DI injects the DOM element

  ngOnInit() {
    // Apply the background color dynamically or default to 'yellow'
    const backgroundColor = this.appHighlighted ?? 'yellow';
    this.el.nativeElement.style.backgroundColor = backgroundColor;
  }
}
```

#### **How It Works:**
1. **Selector**:
   - `[appHighlighted]` allows the directive to be used as an attribute.
   - Supports both static (`appHighlighted="blue"`) and dynamic (`[appHighlighted]="color"`) bindings.

2. **Standalone Mode**:
   - `standalone: true` makes the directive reusable in standalone components without needing a module declaration.

3. **DI with `ElementRef`**:
   - Accesses the DOM element directly and manipulates its `style.backgroundColor`.

4. **Dynamic Logic**:
   - The `@Input()` property accepts a background color value.
   - Defaults to `"yellow"` if no value is provided.

---

### **Step 4: Update the Root Component**

Modify `src/app/app.component.ts` to include the directive:

#### **Code: `app.component.ts`**
```typescript
import { Component } from '@angular/core';
import { HighlightedDirective } from './highlighted.directive'; // Import the directive

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HighlightedDirective], // Include the directive in standalone mode
  template: `
    <h1 appHighlighted="red">Static Red Background</h1>
    <h1 [appHighlighted]="'blue'">Dynamic Blue Background</h1>
    <h1 [appHighlighted]="dynamicColor">Bound Dynamic Color</h1>
    <button (click)="changeColor()">Change Color to Green</button>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dynamicColor: string = 'purple'; // Initial color value

  // Changes the dynamic color
  changeColor() {
    this.dynamicColor = 'green';
  }
}
```

#### **How It Works:**
1. **Template**:
   - `<h1 appHighlighted="red">`: Static value without `[]`.
   - `<h1 [appHighlighted]="'blue'">`: Dynamic literal value with `[]`.
   - `<h1 [appHighlighted]="dynamicColor">`: Bound to a component variable.

2. **Dynamic Interaction**:
   - Clicking the button changes the `dynamicColor` property, updating the background color dynamically.

---

### **Step 5: Verify the Output**

1. Run the Angular development server if it’s not already running:
   ```bash
   ng serve
   ```

2. Open your browser and navigate to `http://localhost:4200`.

3. **Expected Results**:
   - The first `<h1>` has a static red background.
   - The second `<h1>` has a dynamic blue background.
   - The third `<h1>` starts with a purple background but changes to green when the button is clicked.

---

### **Step 6: Optional Styling**

You can add optional styles to `src/app/app.component.css` to enhance the presentation:

#### **Code: `app.component.css`**
```css
h1 {
  color: white;
  text-align: center;
  padding: 10px;
  margin: 10px 0;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
}
```

---

### **Complete Workflow Recap**

1. **Setup Project**:
   - `npx -p @angular/cli ng new highlighted-demo --standalone --skip-tests`

2. **Generate Directive**:
   - `ng generate directive highlighted`

3. **Implement Directive**:
   - Update `highlighted.directive.ts`.

4. **Update Root Component**:
   - Modify `app.component.ts` to include the directive and dynamic interactions.

5. **Run and Test**:
   - `ng serve` to view the output.

---

### **Next Steps**

1. **Extend the Directive**:
   - Add support for multiple styles (e.g., font color, border).
2. **Write Unit Tests**:
   - Test directive behavior using the `highlighted.directive.spec.ts` file.
3. **Explore Advanced DI**:
   - Inject additional services to make the directive even more powerful.

---
