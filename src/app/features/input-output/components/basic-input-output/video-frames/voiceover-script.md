# Angular Input/Output Voiceover Script

**Total Duration:** ~3 min 30 sec
**Frames:** 23
**Average Frame Time:** ~9 sec

---

## Frame 1 — Title

**Image:** `frame_01_title_intro_1767513683238.png`
**Timing:** 0:00 – 0:05 (5s)

**Voiceover:**
"Angular Input and Output.
Concept and code explained together — the easy way."

---

## Frame 2 — Why This Matters

**Image:** `frame_02_why_matters_1767513703411.png`
**Timing:** 0:05 – 0:11 (6s)

**Voiceover:**
"If you understand this pattern,
you understand how Angular components talk — cleanly, safely, and predictably."

---

## Frame 3 — Core Problem

**Image:** `frame_03_core_problem_isolation_1767513726511.png`
**Timing:** 0:11 – 0:17 (6s)

**Voiceover:**
"Imagine two components — a parent and a child.
By default, they are completely isolated."

---

## Frame 4 — Child Can’t See Data

**Image:** `frame_04_child_cant_see_data_1767513755618.png`
**Timing:** 0:17 – 0:22 (5s)

**Voiceover:**
"The parent has data, like a user name.
But the child cannot see it."

---

## Frame 5 — Parent Can’t See Actions

**Image:** `frame_05_parent_cant_see_child_actions_1767513776859.png`
**Timing:** 0:22 – 0:27 (5s)

**Voiceover:**
"And when the child does something,
the parent doesn’t even know it happened."

---

## Frame 6 — Need a Bridge

**Image:** `frame_06_need_a_bridge_1767513793300.png`
**Timing:** 0:27 – 0:31 (4s)

**Voiceover:**
"So right now, they’re disconnected.
We need a bridge."

---

## Frame 7 — Golden Rule

**Image:** `frame_07_golden_rule_1767513831413.png`
**Timing:** 0:31 – 0:39 (8s)

**Voiceover:** (slow & clear)
"Angular gives us that bridge with one simple rule.
Data goes down using Input.
Events go up using Output."

---

## Frame 8 — Step 1: Child Contract

**Image:** `frame_08_child_defines_contract_1767513854357.png`
**Timing:** 0:39 – 0:46 (7s)

**Voiceover:**
"Step one — the child component defines the contract.
What data it expects, and what events it can send."

---

## Frame 9 — Code Slide (All Files)

**Image:** `frame_09_master_code_slide_1767552133403.png`
**Timing:** 0:46 – 1:16 (30s)

**Voiceover:**
"Let's look at a real example: a User Profile Dashboard.
The **Parent Component** acts as the smart container. It fetches and holds the user's data, like `userName` and `userAge`.
The **Child Component** is just a dumb specific display. It doesn't know *who* the user is, it just knows how to show *a* user.
We connect them in the template: passing the parent's data down into the child's inputs.
This separation allows us to reuse the child component anywhere!"

---

## Frame 10 — Input Explained

**Image:** `frame_10_input_explained_1767552167091.png`
**Timing:** 1:16 – 1:28 (12s)

**Voiceover:**
"In the child component typescript, look for the `@Input()` decorator.
This marks properties like `userName` and `age` as public doorways.
They are waiting for data to flow down from the parent."

---

## Frame 11 — Output Explained

**Image:** `frame_11_output_explained_1767552185582.png`
**Timing:** 1:28 – 1:39 (11s)

**Voiceover:**
"For events going up, we use the `@Output()` decorator with `EventEmitter`.
Here, `greetingClick` and `colorClick` are the specialized channels the child uses to talk back to the parent."

---

## Frame 12 — Parent Owns Data

**Image:** `frame_12_parent_owns_data_1767552205314.png`
**Timing:** 1:39 – 1:50 (11s)

**Voiceover:**
"Back in the Parent Component, notice the properties `userName` and `favoriteColors`.
These are normal class properties.
The parent owns them, modifies them, and is the single source of truth."

---

## Frame 13 — Parent Handles Event

**Image:** `frame_13_parent_handles_event_1767552222952.png`
**Timing:** 1:50 – 2:01 (11s)

**Voiceover:**
"The parent also defines handler methods like `onGreetingClick`.
These methods receive the `$event` data payload—in this case, a simple string message—and decide how to update the state."

---

## Frame 14 — HTML Binding

**Image:** `frame_14_html_binding_1767552259355.png`
**Timing:** 2:01 – 2:15 (14s)

**Voiceover:**
"The magic happens in the HTML template.
We wrap `[userName]` in square brackets to bind the parent's data to the child's input.
We wrap `(greetingClick)` in parentheses to bind the child's event to the parent's handler."

---

## Frame 15 — Memory Trick

**Image:** `frame_15_memory_trick_1767552277797.png`
**Timing:** 2:15 – 2:24 (9s)

**Voiceover:** (emphasized)
"Here is the rule to memorize:
**Square brackets [ ]** are for Data going **Down**.
**Parentheses ( )** are for Events going **Up**."

---

## Frame 16 — Data Flow Down

**Image:** `frame_16_data_flow_down_1767552297915.png`
**Timing:** 2:24 – 2:36 (12s)

**Voiceover:**
"When the parent calls `changeName()`, it updates its local `userName` property.
Angular's change detection sees this and instantly pushes the new string down through the `[userName]` binding to the child."

---

## Frame 17 — User Interaction

**Image:** `frame_17_user_interaction_1767552331758.png`
**Timing:** 2:36 – 2:44 (8s)

**Voiceover:**
"Now, imagine the user clicks the greeting in the child component.
The child's `onGreetingClick()` method runs and calls `this.greetingClick.emit(message)`."

---

## Frame 18 — Event Flow Up

**Image:** `frame_18_event_flow_up_1767552350307.png`
**Timing:** 2:44 – 2:53 (9s)

**Voiceover:**
"That `emit()` function fires the event upwards.
The parent catches it in `onGreetingClick($event)`, logs the message, and the cycle is complete."

---

## Frame 19 — Unidirectional Flow

**Image:** `frame_19_unidirectional_flow_1767552369479.png`
**Timing:** 2:53 – 3:04 (11s)

**Voiceover:**
"Data flows down via properties.
Events flow up via emitters.
This one-way circle is called **Unidirectional Data Flow**.
It keeps your application logic predictable and easy to debug."

---

## Frame 20 — Critical Rule

**Image:** `frame_20_critical_rule_1767552404337.png`
**Timing:** 3:04 – 3:09 (5s)

**Voiceover:**
"Never change input data inside the child.
The parent owns it — always."

---

## Frame 21 — Signals Version

**Image:** `frame_21_signals_version_1767552424778.png`
**Timing:** 3:09 – 3:15 (6s)

**Voiceover:**
"In modern Angular, we use Signals.
Cleaner syntax, better performance —
but the same exact idea."

---

## Frame 22 — Final Mental Model

**Image:** `frame_22_final_mental_model_1767552444349.png`
**Timing:** 3:15 – 3:20 (5s)

**Voiceover:**
"Parent owns data.
Child receives data.
Child emits events.
Parent reacts."

---

## Frame 23 — Closing

**Image:** `frame_23_closing_1767552461893.png`
**Timing:** 3:20 – 3:26 (6s)

**Voiceover:**
"If you remember this flow,
Angular communication will never confuse you again.
Happy coding."
