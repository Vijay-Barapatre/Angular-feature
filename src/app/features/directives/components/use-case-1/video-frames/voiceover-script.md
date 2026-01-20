# Angular Directives Voiceover Script

**Total Duration:** ~2 min 50 sec
**Frames:** 22
**Average Frame Time:** ~7 sec

---

## Frame 1 — Title

**Visual:** Title "Angular Attribute Directives". Subtitle "The Power of Behavior". Glowing "Badge" icon.
**Timing:** 0:00 – 0:07 (7s)

**Voiceover:**
"Angular Attribute Directives.
The secret to adding superpowers to your elements — without changing their structure."

---

## Frame 2 — Core Problem

**Visual:** Split screen. Left: 5 different components (Card, Button, Menu) all trying to implement "Highlight on Hover" logic separately. Messy code lines connecting them.
**Timing:** 0:07 – 0:15 (8s)

**Voiceover:**
"Imagine you want to highlight different elements when you hover over them.
Buttons, cards, menu items...
Copying the same logic into every component is a nightmare."

---

## Frame 3 — The Solution (High Level)

**Visual:** A single "Directive" block floating above the components. Beams of light connecting it to the components.
**Timing:** 0:15 – 0:22 (7s)

**Voiceover:**
"The solution? We will build a reusable `HighlightDirective`.
Write the logic once.
Then attach it anywhere."

---

## Frame 4 — The Analogy (Conference Badge)

**Visual:** A person (labeled "Host Element") standing normally. Then, a Sticky Name Tag (labeled "Directive") is slapped onto their chest. The person suddenly glows (behavior added).
**Timing:** 0:22 – 0:30 (8s)

**Voiceover:**
"Think of a directive like a sticky name tag at a conference.
The person wearing it doesn't change who they are.
But the tag gives them new status or behavior."

---

## Frame 5 — The Concrete Plan

**Visual:** Text Overlay: "The Mission". Below it: 1. Create `[appHighlight]`. 2. On Hover -> Background Yellow. 3. On Leave -> Reset.
**Timing:** 0:30 – 0:38 (8s)

**Voiceover:**
"So here is our concrete plan.
We are going to build a directive called `appHighlight`.
When you hover over any element, it will turn yellow. When you leave, it resets."

---

## Frame 6 — The Target Output (Visual Demo)

**Visual:** Animation. An arrow moves over a plain text element. As it hovers, the background instantly snaps to yellow. The arrow leaves, it fades back. Text: "Goal State".
**Timing:** 0:38 – 0:45 (7s)

**Voiceover:**
"This is what it will look like.
Hover on. Yellow.
Hover off. Gone.
Simple, right? Now let's build it step by step."

---

## Frame 7 — Implementation Step 1: The Selector

**Visual:** Code snippet focusing on the selector line: `selector: '[appHighlight]'`. The brackets `[]` are glowing neon. Text: "Step 1: Define Selector".
**Timing:** 0:45 – 0:53 (8s)

**Voiceover:**
"Step one: The Selector.
We name it `appHighlight` inside square brackets.
This tells Angular: 'I am an attribute, not an element.' usage will be `[appHighlight]`."

---

## Frame 8 — Implementation Step 2: Injecting Dependencies

**Visual:** `private el = inject(ElementRef)`. Identify `el` as "The Person" (pointing finger icon). Text: "Step 2: Access the Element".
**Timing:** 0:53 – 1:00 (7s)

**Voiceover:**
"Step two: Access the element.
We inject `ElementRef`.
This gives us a direct reference to the host element we are attached to.
It's like pointing your finger at the person wearing the badge."

---

## Frame 9 — Implementation Step 3: Safe Tools

**Visual:** `private renderer = inject(Renderer2)`. Icon of a gloved hand or a safety pen. Text: "Safe Manipulation".
**Timing:** 1:00 – 1:08 (8s)

**Voiceover:**
"But we don't touch the DOM directly. That's dangerous.
We inject `Renderer2`.
It's our safety glove for making changes that work everywhere, even on servers."

---

## Frame 10 — Implementation Step 4: Logic (ngOnInit)

**Visual:** Code inside `ngOnInit`. `renderer.setStyle(...)`. The element on the right side turns yellow. Text: "Step 4: Apply Logic".
**Timing:** 1:08 – 1:15 (7s)

**Voiceover:**
"Step three: Apply the styles.
In `ngOnInit`, we use the renderer to set the background color to yellow.
Immediate visual feedback."

---

## Frame 11 — Implementation Step 5: Handling Events

**Visual:** Code: `@HostListener('mouseenter')`. An animated mouse cursor hovers over the element, and it lights up. Text: "Step 5: React to Events".
**Timing:** 1:15 – 1:23 (8s)

**Voiceover:**
"But we want it dynamic.
We use `@HostListener('mouseenter')`.
This tells the directive: 'When the mouse enters the host element, run this code'."

---

## Frame 12 — Implementation Step 6: Cleanup

**Visual:** Code: `@HostListener('mouseleave')`. Mouse leaves, element goes back to normal.
**Timing:** 1:23 – 1:30 (7s)

**Voiceover:**
"And `@HostListener('mouseleave')` to revert it.
When the mouse leaves, we define what happens.
The behavior is now completely self-contained."

---

## Frame 13 — The Result: Reusability

**Visual:** HTML Template showing `<p appHighlight>`, `<div appHighlight>`, `<button appHighlight>`. All three elements on right are highlighting.
**Timing:** 1:30 – 1:38 (8s)

**Voiceover:**
"Now look at our template.
Paragraphs, divs, buttons.
Different elements. Same `[appHighlight]` attribute.
Zero duplicated code."

---

## Frame 14 — Enhancing: Passing Inputs

**Visual:** Code: `@Input() appHighlight = ''`. Template: `[appHighlight]="'red'"`. Element turns red instead of yellow. Text: "Enhancement: Configuration".
**Timing:** 1:38 – 1:46 (8s)

**Voiceover:**
"Want more control?
We can add an `@Input`.
Now we can pass a specific color, like 'red', directly in the HTML. The directive becomes configurable."

---

## Frame 15 — Architecture (Smart vs Dumb)

**Visual:** Diagram. "Smart Component" (Logic) -> "Dumb Component" (UI) -> "Directive" (Behavior).
**Timing:** 1:46 – 1:54 (8s)

**Voiceover:**
"This fits perfectly into the Smart vs. Dumb architecture.
Your components handle business logic.
Your directives handle UI behavior."

---

## Frame 16 — Common Pitfall (Direct DOM)

**Visual:** Code snippet with a big red X: `el.nativeElement.style`. Text: "Danger: XSS / No SSR".
**Timing:** 1:54 – 2:02 (8s)

**Voiceover:**
"A quick warning.
Never modify `nativeElement` directly.
It breaks Server-Side Rendering and can be insecure.
Always stick to the Renderer."

---

## Frame 17 — Performance

**Visual:** Speedometer icon. Text: "O(1) Styling". "Tree Shakeable".
**Timing:** 2:02 – 2:09 (7s)

**Voiceover:**
"Performance? It's lightning fast.
Angular optimizes these updates, and if you don't use a directive, it gets tree-shaken out of your bundle."

---

## Frame 18 — Advanced Use Case (Tooltip)

**Visual:** A complex directive example: `[appTooltip]`. A tooltip pops up over a button.
**Timing:** 2:09 – 2:17 (8s)

**Voiceover:**
"It's not just for colors.
Tooltips, permission checks, drag-and-drop...
Any behavior you can imagine, you can package as a directive."

---

## Frame 19 — Signals? (Future Proof)

**Visual:** Code snippet showing `input()` signal in a directive (Angular 17+). Text: "Signals Ready".
**Timing:** 2:17 – 2:24 (7s)

**Voiceover:**
"And yes, modern Directives support Signals too.
Inputs can be signals, making your behavior even more reactive."

---

## Frame 20 — Summary (Mental Model)

**Visual:** The "Conference Badge" icon again. Key terms listed: Selector [], ElementRef, Renderer2, HostListener.
**Timing:** 2:24 – 2:32 (8s)

**Voiceover:**
"To summarize:
Remember the conference badge.
Selector in brackets.
Grab with ElementRef.
Paint with Renderer2.
Listen with HostListener."

---

## Frame 21 — Final Code View

**Visual:** Clean compilation of the entire Directive code on one screen. Satisfying aesthetic.
**Timing:** 2:32 – 2:39 (7s)

**Voiceover:**
"Clean, reusable, safe.
That is the power of Angular Attribute Directives."

---

## Frame 22 — Closing

**Visual:** Angular Logo. Text: "Happy Coding".
**Timing:** 2:39 – 2:45 (6s)

**Voiceover:**
"Go give your elements some superpowers.
Happy coding."
