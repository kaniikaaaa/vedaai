# VedaAI — Design Specification

Reference: 8 screenshots in `/design/` (4 pages x desktop + mobile).

---

## Shared Components

### [S] Sidebar — Desktop Only (240px fixed left)

```
┌────────────────────────────┐
│  [S1] 🔥 VedaAI            │  ← Logo row: gradient icon + bold text
│                            │
│  [S2] ┌──────────────────┐ │
│       │ + Create Assign. │ │  ← Orange button, full-width, has border
│       └──────────────────┘ │
│                            │
│  [S3]  🏠 Home             │  ← Nav items, 14px, gray-500
│        👥 My Groups        │
│        📄 Assignments  ⓾  │  ← Active: bg gray-100, bold, orange badge
│        ✨ AI Teacher's..   │
│        📚 My Library   ②  │  ← Sometimes has orange badge too
│                            │
│        ~~ flex spacer ~~   │
│                            │
│  [S4]  ⚙ Settings          │  ← Bottom-pinned
│                            │
│  [S5] ┌──────────────────┐ │
│       │ (img) Delhi Pub. │ │  ← School card with circular portrait image
│       │       Bokaro S.C.│ │
│       └──────────────────┘ │
└────────────────────────────┘
 ↑ white bg, right border gray-200
 ↑ full viewport height, position fixed
 ↑ hidden completely on mobile (lg:hidden)
```

**[S1] Logo**
- Icon: 32x32 rounded-lg square, **gradient** from dark maroon (#7C2D12) top-left to burnt orange (#C2410C) bottom-right. White flame silhouette inside.
- Text: "VedaAI" — 20px, font-weight 700, text-gray-900.
- Gap: 8px between icon and text. Row: px-5 py-5.
- This is NOT a plain solid-color box — the gradient is essential for brand identity.

**[S2] Create Assignment Button**
- Full width (within px-4 padding), orange bg #F97316, white text, 14px font-weight 500.
- Left icon: "+" (Plus), 16px.
- Rounded-lg (~8px). py-2.5.
- **Has a subtle 1px darker border** — ring-1 ring-orange-600 or border border-orange-600. This gives it a slight outlined depth — not flat.
- Hover: bg #EA580C.

**[S3] Nav Items**
- 5 items, each: flex row, gap-3, px-3 py-2.5, rounded-lg.
- Icon: 20px, from lucide or similar line-icon set.
- Text: 14px.
- **Inactive**: text-gray-500, no bg. Hover: bg-gray-50, text-gray-700.
- **Active** ("Assignments" on list page): bg-gray-100, text-gray-900, font-weight 600.
- **Badge**: orange circle, 20px diameter, white text 11px inside, ml-auto. Shows count like "10".

**[S4] Settings**
- Same styling as inactive nav item. Sits above school card, pinned to bottom via flex spacer.

**[S5] School Card**
- Container: mx-4 mb-4, p-3, bg-gray-50, rounded-xl, border border-gray-100.
- Left: **circular image** 40x40px with a classical Indian painting/portrait (NOT an emoji). Use a real image file `/public/school-avatar.png`.
- Right column: "Delhi Public School" — 14px semi-bold. "Bokaro Steel City" — 12px text-gray-500.
- Flex row, items-center, gap-3.

---

### [T] TopBar — Desktop

```
┌──────────────────────────────────────────────────────┐
│  [T1] ←  [T2] ⊞ Assignment       [T3] 🔔  [T4] 👤 John Doe ∨  │
└──────────────────────────────────────────────────────┘
  ↑ white bg, h-14, border-b border-gray-200
  ↑ sticky top-0, spans full width of content area (right of sidebar)
```

**[T1] Back Arrow**: `ArrowLeft` icon, 20px, text-gray-600. p-1.5, hover:bg-gray-100 rounded-lg.

**[T2] Breadcrumb**: `LayoutGrid` icon 16px text-gray-400 + "Assignment" text 14px text-gray-500. gap-2.

**[T3] Bell**: `Bell` icon, 20px, text-gray-600. p-2, hover:bg-gray-100.

**[T4] User Profile**:
- Avatar: 32px circle with a **real photo image** (warm-toned portrait). Use `/public/user-avatar.png`. NOT initials in a circle.
- "John Doe" — 14px, font-weight 500, text-gray-700. Hidden on small screens (sm:block).
- **Chevron**: `ChevronDown` icon, 16px, text-gray-400 — sits right after the name.
- Flex row, items-center, gap-2.

---

### [MT] TopBar — Mobile (completely different from desktop)

```
┌──────────────────────────────────────────┐
│  [MT1] 🔥 VedaAI          [MT2] ≡ ⊞ 🔔  │
└──────────────────────────────────────────┘
  ↑ white bg, h-12, border-b border-gray-200
  ↑ shown only on mobile (lg:hidden)
```

**[MT1]**: Same logo as sidebar — gradient icon + "VedaAI" text 18px bold.

**[MT2]**: Three icon buttons right-aligned: hamburger menu (≡) `Menu`, grid `LayoutGrid`, bell `Bell`. Each 20px, text-gray-600, gap-2.

**Key difference**: Desktop topbar shows back arrow + breadcrumb. Mobile topbar shows VedaAI logo + action icons. These are TWO DIFFERENT components, not the same one responsive.

---

### [BN] Bottom Nav — Mobile Only

```
┌─────────────────────────────────────────────┐
│  [BN1]🏠   [BN2]👥     [BN3]📚   [BN4]✨   │
│  Home    My Groups    Library   AI Toolkit   │
└─────────────────────────────────────────────┘
  ↑ white bg, fixed bottom-0, border-t border-gray-200
  ↑ h-16, shown only below lg breakpoint
  ↑ z-30 (above content, below modals)
```

- 4 tabs, justify-around, py-2.
- Each tab: flex-col, items-center, gap-1.
- Icon: 20px. Label: 11px.
- **Active**: text-gray-900. **Inactive**: text-gray-400.
- Hidden on desktop (lg:hidden).

---

## Page 1: Empty State

> Screenshots: `2.40.23 PM.png` (desktop), `2.40.42 PM.png` (mobile)

### Desktop Layout

```
┌───────────┬──────────────────────────────────────────┐
│           │ [T] TopBar                               │
│           ├──────────────────────────────────────────┤
│           │                                          │
│   [S]     │                                          │
│  Sidebar  │            [E1] ┌──────────┐             │
│           │                 │ 📄 🔍 ❌  │             │
│           │                 │  ✒️  ✨    │             │
│           │                 └──────────┘             │
│           │                                          │
│           │         [E2] No assignments yet          │
│           │                                          │
│           │    [E3] Create your first assignment     │
│           │         to start collecting and...       │
│           │                                          │
│           │      [E4] [+ Create Your First Assign.]  │
│           │                                          │
│           │              ↑ content is vertically     │
│           │                centered in the area      │
└───────────┴──────────────────────────────────────────┘
  ↑ page bg: #F3F4F6 (light gray)
```

### Mobile Layout

```
┌──────────────────────────┐
│ [MT] Mobile TopBar       │
├──────────────────────────┤
│                          │
│      [E1] Illustration   │
│        📄 🔍 ❌ ✨        │
│                          │
│  [E2] No assignments yet │
│                          │
│  [E3] description text   │
│       centered, wraps    │
│                          │
│  [E4] [+ Create First..] │
│                          │
├──────────────────────────┤
│ [BN] Bottom Nav          │
└──────────────────────────┘
```

**[E1] Empty State Illustration**
- This is a **custom SVG illustration**, NOT composed from lucide icons.
- Central element: a large **magnifying glass** with a **red X** (#EF4444) inside the lens.
- Background elements: overlapping document/paper shapes (gray-200 fill, gray-300 stroke), a fountain pen nib (dark), sparkle/diamond decorations (✦ small, gray-400).
- Small blue dots scattered as decorative accents.
- Circular frame/ring behind the magnifying glass (gray-200).
- Overall bounding box: ~200x180px.
- Color scheme: muted grays + red X accent. No orange in the illustration.
- Must be an inline SVG or a static `/public/empty-illustration.svg` file.

**[E2] Title**: "No assignments yet" — 20px, font-weight 600, text-gray-900. mt-6.

**[E3] Description**: "Create your first assignment to start collecting and grading student submissions. You can set up rubrics, define marking criteria, and let AI assist with grading." — 14px, text-gray-500, text-center, max-w-md (~448px), leading-relaxed.

**[E4] CTA Button**: "+ Create Your First Assignment"
- bg-gray-900 (#1F2937), text-white, 14px font-weight 500.
- `Plus` icon 16px on left.
- py-3 px-6, rounded-lg.
- Hover: bg-gray-800.
- Not orange — this is a **dark/charcoal** button.

---

## Page 2: Assignments List

> Screenshots: `2.40.55 PM.png` (desktop), `2.41.13 PM.png` (mobile)

### Desktop Layout

```
┌───────────┬──────────────────────────────────────────┐
│           │ [T] TopBar                               │
│           ├──────────────────────────────────────────┤
│   [S]     │                                          │
│  Sidebar  │  [L1] ● Assignments                     │
│           │       Manage and create assignments...   │
│           │                                          │
│ Assign.   │  [L2] 🔽 Filter by      🔍 Search Assign│
│ has badge │                                          │
│ "10"      │  [L3] ┌────────────┐  ┌────────────┐    │
│           │       │ Quiz on    ⋮│  │ Quiz on    ⋮│   │
│           │       │ Electricity │  │ Electricity │   │
│           │       │Asgn:20-06  │  │Asgn:20-06  │    │
│           │       │Due:21-06   │  │Due:21-06   │    │
│           │       └────────────┘  └────────────┘    │
│           │       ┌────────────┐  ┌────────────┐    │
│           │       │ Quiz on    ⋮│  │ Quiz on    ⋮│   │
│           │       │ Electricity │  │ Electricity │   │
│           │       │Asgn:20-06  │  │Asgn:20-06  │    │
│           │       └────────────┘  └────────────┘    │
│           │                                          │
│           │          [L4] [+ Create Assignment]      │
│           │             ↑ floating pill, bottom      │
└───────────┴──────────────────────────────────────────┘
```

### Mobile Layout

```
┌──────────────────────────┐
│ [MT] Mobile TopBar       │
├──────────────────────────┤
│ [L1] Assignments         │
│      Filter / Search     │
├──────────────────────────┤
│ ┌──────────────────────┐ │
│ │ Quiz on Electricity ⋮│ │  ← single column, full width
│ │ Asgn: 20-06-2025     │ │
│ │ Due: 21-06-2025      │ │
│ └──────────────────────┘ │
│ ┌──────────────────────┐ │
│ │ Quiz on Electricity ⋮│ │
│ │ ...                   │ │
│ └──────────────────────┘ │
│ ... more cards ...       │
│                          │
│   [L4] floating button   │
├──────────────────────────┤
│ [BN] Bottom Nav          │
└──────────────────────────┘
```

**[L1] Page Header**
- Row: green dot `●` (w-2.5 h-2.5, bg-green-500, rounded-full) + "Assignments" (20px, font-weight 700, text-gray-900). gap-2, items-center.
- Below: "Manage and create assignments for your classes." — 14px, text-gray-500. Indented with ml-5 to align with text past the dot.

**[L2] Toolbar Row**
- Flex between, items-center, mb-6.
- **Filter button** (left):
  - `Filter` icon 16px + "Filter by" text 14px + `ChevronDown` 12px.
  - Border border-gray-200, bg-white, text-gray-600, rounded-lg, px-3 py-2.
- **Search input** (right):
  - `Search` icon inside left (absolute positioned), 16px, text-gray-400.
  - Placeholder: "Search Assignment" — 14px, text-gray-400.
  - Border border-gray-200, rounded-lg, pl-9 pr-4 py-2.
  - Width: max-w-xs (~280px) on desktop, full width on mobile.
  - Focus: ring-2 ring-orange-500, border-transparent.

**[L3] Assignment Cards**
- Grid: 2 columns on md+, 1 column on mobile. gap-4.
- Each card:
  - bg-white, rounded-xl (12px), border border-gray-100.
  - p-5 (20px all sides).
  - **No shadow** default. **Hover**: shadow-md transition.
  - **Title**: "Quiz on Electricity" — 16px, font-weight 600, text-gray-900. Clickable → navigates to detail page. Hover: text-orange-600.
  - **3-dot menu** (⋮): top-right, `MoreVertical` icon, 20px, text-gray-400. p-1, hover:bg-gray-100 rounded.
  - **Date row** (bottom, mt-4):
    - "Assigned on: 20-06-2025" — 13px, text-gray-500.
    - Separator space.
    - "Due: 21-06-2025" — 13px, text-gray-500.
    - Flex row, gap-4.
    - **Date format**: DD-MM-YYYY always.

**[L3a] 3-Dot Dropdown Menu** (when ⋮ clicked)
- Absolute positioned, right-0, top of icon + 8px.
- bg-white, border border-gray-200, rounded-lg, shadow-lg, py-1, min-w-[140px].
- "View Assignment" — px-4 py-2, 14px, text-gray-700, hover:bg-gray-50.
- "Delete" — px-4 py-2, 14px, text-red-600, hover:bg-red-50.
- The parent card gets a subtle **yellow/cream highlight** tint when menu is open (bg-amber-50 or similar).

**[L4] Floating Create Button**
- Position: fixed or sticky, bottom-6 (desktop), bottom-20 (mobile, above bottom nav).
- Centered horizontally.
- bg-gray-900, text-white, 14px font-weight 500.
- `Plus` icon 16px + "Create Assignment" text.
- **rounded-full** (pill shape, NOT rounded-lg).
- px-6 py-3, shadow-lg.
- Visible on **BOTH** desktop and mobile.

---

## Page 3: Create Assignment

> Screenshots: `2.41.22 PM.png` (desktop), `2.41.36 PM.png` (mobile)

### Desktop Layout

```
┌───────────┬──────────────────────────────────────────────┐
│           │ [T] TopBar                                   │
│           ├──────────────────────────────────────────────┤
│   [S]     │                                              │
│  Sidebar  │  [C1] ● Create Assignment                   │
│           │       Set up a new assignment...             │
│           │                                              │
│           │  [C2] ████████████████████████████  progress  │
│           │                                              │
│           │  ┌──────────────────────────────────────┐    │
│           │  │ [C3] Assignment Details               │    │
│           │  │      Basic information about...       │    │
│           │  │                                       │    │
│           │  │  [C4] ┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐    │    │
│           │  │       │  ☁ Choose a file or     │    │    │
│           │  │       │    drag & drop here     │    │    │
│           │  │       │  PDF, PNG, JPG, DOCX    │    │    │
│           │  │       │    [Browse Files]       │    │    │
│           │  │       └─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘    │    │
│           │  │   Upload images of your preferred...  │    │
│           │  │                                       │    │
│           │  │  [C5] Due Date                        │    │
│           │  │       ┌─────────────────────── 📅─┐   │    │
│           │  │       │ Choose a date/time         │   │    │
│           │  │       └───────────────────────────┘   │    │
│           │  │                                       │    │
│           │  │  [C6] Question Type    No.of Q  Marks │    │
│           │  │       ┌──────────┐ ✕  ┌──┐  ┌──┐     │    │
│           │  │       │ MCQ    ∨ │    │ 4│  │ 1│     │    │
│           │  │       ├──────────┤ ✕  ├──┤  ├──┤     │    │
│           │  │       │ Short  ∨ │    │ 3│  │ 2│     │    │
│           │  │       ├──────────┤ ✕  ├──┤  ├──┤     │    │
│           │  │       │ Diagram∨ │    │ 5│  │ 5│     │    │
│           │  │       ├──────────┤ ✕  ├──┤  ├──┤     │    │
│           │  │       │Numeric ∨ │    │ 5│  │ 5│     │    │
│           │  │       └──────────┘    └──┘  └──┘     │    │
│           │  │       ⊕ Add Question Type             │    │
│           │  │                   Total Questions: 25 │    │
│           │  │                   Total Marks: 60     │    │
│           │  │                                       │    │
│           │  │  [C7] Additional Information           │    │
│           │  │       ┌───────────────────────────┐   │    │
│           │  │       │ e.g. Generate a question  │   │    │
│           │  │       │ paper for 3 hour exam..🎤 │   │    │
│           │  │       └───────────────────────────┘   │    │
│           │  └──────────────────────────────────────┘    │
│           │                                              │
│           │  [C8] [← Previous]              [Next →]     │
│           │                                              │
└───────────┴──────────────────────────────────────────────┘
```

### Mobile Layout

```
┌──────────────────────────┐
│ [MT] Mobile TopBar       │
├──────────────────────────┤
│ [C1] Assignment Details  │
│      Basic information.. │
│                          │
│ [C4] ┌─ ─ ─ ─ ─ ─ ─ ┐  │
│      │ ☁ Choose file  │  │
│      │   drag & drop  │  │
│      │ [Browse Files] │  │
│      └─ ─ ─ ─ ─ ─ ─ ┘  │
│                          │
│ [C5] Due Date            │
│ ┌────────────────── 📅┐  │
│ └─────────────────────┘  │
│                          │
│ [C6] Question Type table │
│ MCQ        ✕   4    1   │
│ Short      ✕   3    2   │
│ ...                      │
│ ⊕ Add Question Type     │
│        Total Q: 25       │
│        Total M: 60       │
│                          │
│ [C7] Additional Info     │
│ ┌─────────────────── 🎤┐ │
│ └─────────────────────┘  │
│                          │
│ [C8] [← Prev]  [Next →] │
├──────────────────────────┤
│ [BN] Bottom Nav          │
└──────────────────────────┘
```

**[C1] Page Header**
- Same pattern as assignments page: green dot ● + title + subtitle.
- "Create Assignment" — 20px bold.
- "Set up a new assignment for your students." — 14px text-gray-500.

**[C2] Progress Bar**
- Full width of content area, mb-8.
- Track: h-1.5, bg-gray-200, rounded-full.
- Fill: h-1.5, bg-gray-900 (#1F2937), rounded-full.
- In the screenshot, it appears **fully filled** (100% width). Could be single step or final step indicator.

**[C3] Form Card Container**
- bg-white, rounded-xl (12px), border border-gray-200.
- p-6 on mobile, p-8 on desktop (lg:p-8).
- "Assignment Details" — 18px, font-weight 600, text-gray-900.
- "Basic information about your assignment." — 14px, text-gray-500, mb-6.

**[C4] File Upload Dropzone**
- Border: 2px dashed, border-gray-300 (slightly darker than typical borders), rounded-xl.
- Inner padding: p-8 (generous), text-center.
- Height: natural/auto, roughly ~180px from content.
- Contents (centered, stacked):
  1. Upload cloud icon (`Upload`): 32px, text-gray-400. mb-3.
  2. "Choose a file or drag & drop it here" — 14px, text-gray-600. mb-1.
  3. "PDF, PNG, JPG, DOCX" — 12px, text-gray-400. mb-3.
  4. "Browse Files" — 14px, text-gray-600, inline button with border border-gray-300, rounded-lg, px-4 py-1.5. Looks like a secondary button, not a link.
- **Below** the dashed box (outside it): "Upload images of your preferred document/image" — 12px, text-gray-400, mt-2, text-center.
- **Drag active state**: border-orange-400, bg-orange-50.
- **File selected state**: replaces entire dropzone with a file info row (icon + name + size + remove X).

**[C5] Due Date**
- Label: "Due Date" — 14px, font-weight 500, text-gray-900, mb-2.
- Input: w-full, border border-gray-200, rounded-lg, py-2.5 px-3, text-14px.
- Placeholder: "Choose a date/time" — text-gray-400.
- Calendar icon (`CalendarDays`): absolute right-3, 16px, text-gray-400, pointer-events-none.
- The input uses `type="date"` native picker.

**[C6] Question Types Table**
- **Header row** (flex between, mb-3):
  - Left: "Question Type" — 14px font-weight 500 text-gray-900.
  - Right: "No. of Questions" and "Marks" — 14px font-weight 500 text-gray-900, spaced ~48px apart.
- **Each row** (flex, items-center, gap-3, space-y-3):
  - Select dropdown: flex-1 (~55-60% width), px-3 py-2.5, border border-gray-200, rounded-lg, bg-white, 14px. Has native chevron or custom chevron.
  - Remove button (✕): `X` icon, 16px, text-gray-400, p-1. hover:text-red-500.
  - Count input: w-16 (64px), text-center, py-2.5, border border-gray-200, rounded-lg, 14px. type=number min=1.
  - Marks input: w-16 (64px), text-center, py-2.5, border border-gray-200, rounded-lg, 14px. type=number min=1.
- **Default 4 rows**:
  1. Multiple Choice Questions — ✕ — 4 — 1
  2. Short Questions — ✕ — 3 — 2
  3. Diagram/Graph-Based Questions — ✕ — 5 — 5
  4. Numerical Problems — ✕ — 5 — 5
- **Add button** (mt-4, left-aligned):
  - Circle: w-6 h-6, border border-gray-300, rounded-full, flex center. `Plus` icon 14px inside.
  - "Add Question Type" — 14px, text-gray-600.
  - Flex row, items-center, gap-2. hover:text-gray-900.
- **Totals** (mt-4, flex-col items-end, text-14px):
  - "Total Questions: **XX**" — text-gray-600, number is font-weight 700.
  - "Total Marks: **XX**" — text-gray-600, number is font-weight 700.

**[C7] Additional Information**
- Label: "Additional Information (For better output)" — 14px font-weight 500 text-gray-900, mb-2.
- Textarea: w-full, rows=3, border border-gray-200, rounded-lg, py-2.5 px-3, 14px, resize-none.
- Placeholder: "e.g. Generate a question paper for 3 hour exam duration..." — text-gray-400.
- **Microphone icon** (`Mic`): absolute positioned, bottom-3 right-3 INSIDE the textarea, 16px, text-gray-400. Decorative (not functional).

**[C8] Navigation Buttons**
- Below form card, mt-6, flex between.
- **Previous** (left):
  - `ArrowLeft` icon 16px + "Previous" text 14px.
  - bg-white, border border-gray-200, text-gray-700, rounded-lg, px-5 py-2.5.
  - Hover: bg-gray-50.
- **Next** (right):
  - "Next" text 14px + `ArrowRight` icon 16px.
  - bg-gray-900, text-white, rounded-lg, px-5 py-2.5.
  - Hover: bg-gray-800.
  - On submit: shows "Creating..." disabled state.

---

## Page 4: Generated Paper View

> Screenshots: `2.41.49 PM.png` (desktop), `2.42.04 PM.png` (mobile)

### Desktop Layout

```
┌───────────────────────────────────────────────────────────┐
│                                                           │
│ ┌──────────────────┬─────────────────────────────────────┐│
│ │ [G1] DARK PANEL  │ [G2] PAPER PANEL                   ││
│ │                  │                                     ││
│ │ 🔥 VedaAI        │  ┌─────────────────────────────┐   ││
│ │                  │  │ Delhi Public School,         │   ││
│ │ [G1a] AI says:   │  │ Sector-4, Bokaro            │   ││
│ │ "Certainly,      │  │                              │   ││
│ │ Listed here are  │  │ Subject: English             │   ││
│ │ customized Q.    │  │ Class: 5th                   │   ││
│ │ Paper for your   │  │                              │   ││
│ │ CBSE Grade 8     │  │ Time: 45 min    Max Marks:35 │   ││
│ │ Science classes  │  │                              │   ││
│ │ on the NCERT     │  │ Instructions...              │   ││
│ │ chapters."       │  │ Roll No:___ Date:___         │   ││
│ │                  │  │                              │   ││
│ │                  │  │ ── Section A ──              │   ││
│ │                  │  │ Short Answer Questions       │   ││
│ │                  │  │ Each carries 2 marks         │   ││
│ │                  │  │                              │   ││
│ │ [G1b]            │  │ 1. Question text [2 Marks]   │   ││
│ │ [🔄 Regenerate]  │  │ 2. Question text [2 Marks]   │   ││
│ │ [📥 Download PDF]│  │ ...                          │   ││
│ │                  │  │                              │   ││
│ │                  │  │ ── End of Question Paper ──  │   ││
│ │                  │  │                              │   ││
│ │                  │  │ ── Answer Key ──             │   ││
│ │                  │  │ 1. Answer...                 │   ││
│ │                  │  └─────────────────────────────┘   ││
│ └──────────────────┴─────────────────────────────────────┘│
└───────────────────────────────────────────────────────────┘

  ↑ NO sidebar on this page — the dark panel REPLACES the sidebar
  ↑ NO standard topbar on this page — full-bleed two-panel layout
```

### Mobile Layout

```
┌──────────────────────────┐
│ [MT] VedaAI    ≡ ⊞ 🔔    │
├──────────────────────────┤
│ [G1] DARK PANEL (compact)│
│ "Certainly, Listed here  │
│ are customized Question  │
│ Paper for your CBSE..."  │
│ chapters                 │
├──────────────────────────┤
│ [G2] PAPER (scrollable)  │
│                          │
│ Delhi Public School,     │
│    Sector-4, Bokaro      │
│                          │
│ Subject: English         │
│ Class: 5th               │
│                          │
│ Time: 45 min             │
│ Maximum Marks: 35        │
│                          │
│ Instructions...          │
│                          │
│ ── Section A ──          │
│ 1. Question... [2 Marks] │
│ 2. Question... [2 Marks] │
│ ...                      │
│                          │
│ End of Question Paper    │
│                          │
│ Answer Key               │
│ 1. Answer text           │
│                          │
├──────────────────────────┤
│ [BN] Bottom Nav          │
└──────────────────────────┘
```

**[G1] Dark Left Panel (Desktop)**
- Width: w-80 (320px) on lg, xl:w-96 (384px) on xl. flex-shrink-0.
- bg-gray-900 (#1F2937), text-white.
- p-6 all sides.
- Full height of viewport (min-h-screen or min-h-[calc(100vh-3.5rem)]).

**[G1-logo] VedaAI Logo in Dark Panel**
- Same gradient icon as sidebar, but text is **WHITE** instead of black.
- Positioned at top of panel, mb-6.
- This logo MUST be present — it replaces the sidebar on this page.

**[G1a] AI Message**
- Flex row: AI icon (left) + message text (right).
- AI icon: 32px square, bg-orange-500, rounded-lg, `Sparkles` icon 16px white inside. flex-shrink-0.
- Message: 14px, text-gray-300 (#D1D5DB), leading-relaxed (line-height 1.625).
- Example: "Certainly, Listed here are customized Question Paper for your CBSE Grade 8 Science classes on the NCERT chapters."
- gap-3 between icon and text. items-start (icon aligns to top).

**[G1b] Action Buttons**
- Stacked vertically, mt-8, space-y-3.
- **Regenerate**: full width, border border-gray-600, text-white, rounded-lg, py-2.5, 14px font-weight 500. `RefreshCw` icon 16px + "Regenerate" text. Hover: bg-gray-800.
- **Download PDF**: full width, bg-white, text-gray-900, rounded-lg, py-2.5, 14px font-weight 500. `Download` icon 16px + "Download PDF" text. Hover: bg-gray-100.

**[G1] Dark Panel (Mobile)**
- Full width, py-6 px-4.
- Same bg-gray-900, same AI message layout.
- Shorter — shows message + buttons, doesn't take half the screen.
- Buttons could be horizontal (flex row) on mobile to save space.

**[G2] Paper Panel (Right Side)**
- Desktop: flex-1, overflow-y-auto, p-8, bg-gray-50 (#F9FAFB or #F3F4F6).
- The paper itself is a white card: bg-white, rounded-xl, border border-gray-200, p-6 lg:p-8, max-w-3xl.

**[G2] Paper Content Structure**
- **School Name**: text-center, 20px, font-weight 700, text-gray-900, mb-1. e.g. "Delhi Public School, Sector-4, Bokaro"
- **Subject/Class** (centered below name):
  - "Subject: English" — 14px, text-gray-700.
  - "Class: 5th" — 14px, text-gray-700.
  - border-b-2 border-gray-800 below this header block, pb-4 mb-6.
- **Meta row** (flex between, 14px, text-gray-700, mb-4):
  - Left: "Time Allowed: 45 minutes"
  - Right: "Maximum Marks: 35"
- **Instructions block**:
  - bg-gray-50, border-l-3 border-gray-800, p-3, mb-6.
  - "All questions are compulsory, unless stated otherwise." — italic, 13px, text-gray-600.
  - Additional metadata lines: "Roll Number: ___", "Date: ___/___/___", "Total No. of Questions: XX"
- **Section Header**: 16px, font-weight 700, text-gray-900, pb-1, border-b border-gray-300, mb-1.
  - e.g. "Section A"
- **Section Instruction**: italic, 13px, text-gray-500, mb-4.
  - e.g. "Short Answer Questions: Each question carries 2 marks"
- **Questions**: 14px, text-gray-800, space-y-4, mb-8.
  - Format: "**1.** Question text here **[2 Marks]**"
  - Number: font-weight 700. Marks: text-gray-400, 12px.
  - MCQ options: 2-column grid (grid-cols-2), gap-x-5 gap-y-1, ml-5, mt-2, 13px, text-gray-600.
    - Format: "(a) Option text"
- **End Divider**: text-center, 13px, font-weight 700, text-gray-500, my-6, pt-4, border-t border-gray-300.
  - "--- End of Question Paper ---"
- **Answer Key Section**:
  - Starts with border-t-2 border-gray-800, pt-6, mt-6.
  - "Answer Key" — 18px, font-weight 700, text-center, mb-4.
  - Each answer: 13px, text-gray-700, space-y-2.
  - Format: "**1.** Answer text here"

---

## Important Layout Note

The generated paper page (Page 4) has a **DIFFERENT layout** from all other pages:
- **No sidebar visible** (the dark panel takes its place on desktop)
- The **topbar may or may not be present** — in the desktop screenshot, the two panels appear to fill the entire viewport. On mobile, the VedaAI mobile topbar IS visible.
- The overall feel on desktop is a full-bleed two-panel layout — almost like a chat interface with the paper as the response.

---

## Color Palette Reference

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Orange | #F97316 | orange-500 | Create btn, badges, accents |
| Orange Dark | #EA580C | orange-600 | Button hover, btn border |
| Orange Gradient Start | #7C2D12 | orange-950 | Logo gradient dark end |
| Orange Gradient End | #C2410C | orange-700 | Logo gradient light end |
| Dark Text | #111827 | gray-900 | Headings, titles |
| Body Text | #374151 | gray-700 | Labels, body text |
| Secondary Text | #4B5563 | gray-600 | Descriptions |
| Muted Text | #6B7280 | gray-500 | Subtitles, meta |
| Placeholder | #9CA3AF | gray-400 | Input placeholders |
| White | #FFFFFF | white | Cards, panels, sidebar |
| Page BG | #F3F4F6 | gray-100 | Main background |
| Card Border | #E5E7EB | gray-200 | Borders, dividers |
| Hover BG | #F9FAFB | gray-50 | Nav hover, school card bg |
| Active Nav BG | #F3F4F6 | gray-100 | Active nav item |
| Charcoal | #1F2937 | gray-800 | CTA buttons, dark panel, progress bar |
| Green Dot | #22C55E | green-500 | Page title status dot |
| Red | #EF4444 | red-500 | Delete text, error, X in illustration |

## Typography Reference

| Element | Size | Weight | Color | Tailwind |
|---------|------|--------|-------|----------|
| Page title | 20px | 700 | gray-900 | text-xl font-bold |
| Section title | 18px | 600 | gray-900 | text-lg font-semibold |
| Card title | 16px | 600 | gray-900 | text-base font-semibold |
| Body / Labels | 14px | 500 | gray-700 | text-sm font-medium |
| Description | 14px | 400 | gray-500 | text-sm text-gray-500 |
| Meta / Dates | 13px | 400 | gray-500 | text-[13px] text-gray-500 |
| Tiny / Badge | 12px | 500 | white | text-xs font-medium |
| Helper text | 12px | 400 | gray-400 | text-xs text-gray-400 |
