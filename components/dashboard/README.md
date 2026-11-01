# Dashboard demo components

These dependency-free web components recreate the desktop dashboard for website previews. They do not connect to the desktop app or backend.

Include the shared files once on a page:

```html
<link rel="stylesheet" href="/components/dashboard/dashboard.css">
<link rel="stylesheet" href="/components/dashboard/dashboard-social.css">
<link rel="stylesheet" href="/components/dashboard/dashboard-progress.css">
<script type="module" src="/components/dashboard/dashboard.js"></script>
<fokasu-dashboard></fokasu-dashboard>
```

`fokasu-dashboard` includes a decorative animated timer and sample tasks. `fokasu-demo-sidebar` and `fokasu-demo-header` are separate reusable components. To compose another demo screen, use the same shell:

```html
<div class="dash-layout">
  <fokasu-demo-sidebar></fokasu-demo-sidebar>
  <div class="dash-main">
    <fokasu-demo-header></fokasu-demo-header>
    <!-- Screen content -->
  </div>
</div>
```

The dashboard's app controls and task menus are illustrative, non-focusable spans.
A real progress-bar-mode button below play/pause is the exception: a bouncing
permissions-style arrow points to the desktop's hollow progress-mode icon.
Clicking it replaces the dashboard with a simplified Chrome new-tab screen and an animated
vertical progress bar along the left edge. The demo stays inside the preview;
the explanation describes the desktop app's native always-on-top behavior.

The guide uses the exact vector paths and palette from `FocusGuardMascot.java`
and `settings/blocking-tutorial.css`, bundled as `focus-guard.svg`. It explains
the mode and asks visitors to tap the bar to return. Clicking the bar or pressing
Escape restores the dashboard and focus to the mode button. Hidden dashboard
controls become inert while the workspace is shown. The progress fill uses the
existing timer's one-second updates, accelerated from 18% to 90% over a minute;
reduced-motion users see a still bar. No additional timers or animation library
are needed. Include `dashboard-progress.css` when embedding the dashboard.
In this mode the surrounding title bar switches to New Tab — Google Chrome and drops the
Fokasu logo. Returning (or removing the component) restores the original title
and logo. The bar is slightly thicker, with the same bouncing arrow pointing at
its filled portion; reduced-motion users see a stationary arrow.

A floating **Scroll Down / Scroll Up** button switches between the timer/tasks and
the Study Together/Activity view while the sidebar and header stay fixed. The
button and arrow bounce together and are centered in the main area, excluding the
sidebar. It adds no footer space. Wheel/touch gestures scroll the webpage.

`dashboard-social.js` supplies the sample study-room cards, shared-goal SVG path,
and activity grid with a small recent cluster; earlier weeks remain empty. Sample handles include joi_boi, sleepyhead, priyanshu, and chaiBiscuit. The
timer, transitions, and floating control respect reduced-motion preferences.
Nothing is stored or sent to a server. Timer intervals and motion listeners are
cleaned up on removal; elapsed time is calculated from a deadline so background-tab
throttling does not slow the countdown.

Preview `/` using a static server rooted at `fokasu-website`.

## Desktop icons

`desktop-icons.js` reuses the exact SVG geometry from `fokasu-frontend/src/main/resources/org/project/fokasu/`:

- `sidebar/sidebar.fxml` and `sidebar/streak-fire.fxml`: navigation, account, settings, break indicator, and streak flame.
- `header/app-header.fxml` and `header/app-header.css`: hourglass, notification, search, and lock.
- `dashboard/timer/dashboard-timer.css` and `dashboard/dashboard.css`: timer rail and play icons.

Paths are copied into the website so it has no runtime dependency on the desktop project. The flame also retains the desktop's `#f97316` fill.

## Desktop typography

The preview self-hosts `NotoSans-Regular-latin.woff2` and `PlusJakartaSans-Bold-latin.woff2` under `fonts/`. The original desktop TTF files and their OFL licenses remain there as build inputs. Noto Sans is the base face for navigation, task text, and timer digits. Plus Jakarta Sans is used for the brand, total hours, header text, and task section heading. The end-of-list message stays monospace. Font names are scoped to this preview so the marketing page's typography is unaffected.

Regenerate with `python components/dashboard/fonts/build-subsets.py` using Python with `fonttools==4.68.0` and `brotli==1.2.1` installed. The script retains Latin letters, numbers, combining accents, general punctuation, and literal characters from all shared preview JS/CSS and the homepage, YPT alternative page, and best-study-app page that load them. Rebuild after introducing new characters or adding a consuming page, and update the font URLs and stylesheet version when generated files change. User-entered characters outside the subset use the existing system sans-serif fallback. Original hinting and applicable layout features (including tabular figures) are retained; the script validates coverage, vertical metrics, and digit widths after reopening each WOFF2. Keep `font-display: swap` and the license files with the fonts.

The initial subsets total 84,184 bytes, compared with 698,196 bytes for the original TTF pair (87.9% smaller). These are file-size measurements, not browser loading benchmarks.

## Stats preview

Include `dashboard.css` and `stats.css`, then load `stats.js` as a module and add
`<fokasu-stats></fokasu-stats>`. The stats module imports the dashboard module, so
it also registers the shared sidebar and header and the dashboard preview.
Use a single dashboard module URL per page to avoid registering components twice.

The stats preview on `/` appears below the dashboard. It
recreates the daily tag breakdown, sample tasks, weekly SVG chart, and summary
with illustrative data. Fonts and icons are shared with the dashboard. The sidebar
accepts `selected="Stats"`; its default remains Dashboard.

The only interactive element is the centered **Scroll Down / Scroll Up** text button,
floating over the bottom of the preview with a gently bouncing arrow. It is
absolutely positioned, so it adds no footer bar, caption, or extra space below the canvas.
It translates the content track between two positions while the sidebar and header
stay fixed. There is no internal wheel/touch scrolling; normal gestures scroll
the containing webpage. The transition respects reduced-motion preferences, the
button supports keyboard activation and its accessible label describes the target view.
Clipped daily/summary sections are inert when outside the current view. Other
app controls are decorative. No backend calls, chart libraries, or additional
fonts are required. Each instance has its own SVG gradient and viewport IDs.

The daily doughnut draws clockwise once over 800ms when at least 35% of the chart
enters the viewport, then fades in its total over 240ms. Each segment keeps its
original color and final geometry. IntersectionObserver disconnects as soon as
the reveal starts; animation and motion-preference listeners are released on
completion or component removal. Reduced-motion users and browsers without
IntersectionObserver see the finished chart immediately. Returning from the
weekly view does not replay the animation.

## Leaderboard preview

Include `dashboard.css` and `leaderboard.css`, load `leaderboard.js` as a module,
and add `<fokasu-leaderboard></fokasu-leaderboard>`. Use the same dashboard module
URL as `stats.js` when loading both on one page.

The leaderboard reuses the shared sidebar, header, fonts, and fixed desktop canvas.
Its three podium places and four ranked rows show seven sample usernames, in
descending order of focused minutes. Colors, crown, and podium geometry follow
the desktop leaderboard resources. Spacing and row heights follow the reference;
all seven entries fit in the fixed canvas. Tabs, period selector, and date arrows
are illustrative. There is no internal scrolling, floating scroll control, or
Tab stop inside this preview. The
sidebar marks Leaderboard as selected.

The podium names and focus times drop in once when 35% of the podium enters view:
second place, first place, then third place, spaced 120ms apart. Only the three
information groups animate (transform and opacity); the podium stays still.
Reduced-motion users and browsers without IntersectionObserver see all names
immediately. The observer disconnects at the trigger; listeners are released on
completion or removal, and returning to the section does not replay the effect.

## Clan preview

Include `dashboard.css` and `clan.css`, load `clan.js` as a module, and add
`<fokasu-clan></fokasu-clan>`. Its dashboard module URL matches the other previews.
The Focus Together profile reuses the desktop crest and quest SVGs under
`clan-assets/` and uses a solid background without a map image. Profile text,
level badge, details, member rows, and icons are built with HTML/CSS/SVG.

The clan has ten sample members; only the four complete member rows that fit in
the canvas are rendered, with weekly focused time and roles. The preview has no
internal scrolling, floating scroll control, or Tab stop. Clan actions are decorative
and make no backend requests. The sidebar marks Clan as selected.

## Block preview

Include `dashboard.css` and `blocks.css`, load `blocks.js` as a module, and add
`<fokasu-blocks></fokasu-blocks>`. Its dashboard module URL matches the other previews.
The Block screen uses the same frame, shared header, sidebar, fonts, and lock
proportions. It shows the inactive blocking status, four tabs, URL entry field,
add icon, and four blocked websites with the desktop's trash icon geometry.

The screen is presentation-only: the field and controls are non-focusable spans,
and the content is clipped to the fixed canvas without internal scrolling or a
floating scroll control. There are no backend calls, new fonts, or image assets.
An upward-pointing arrow beneath this preview's header lock reuses the permissions
page's SVG shape, color, shadow, and 1.6-second bounce. It scales with the preview,
has no pointer or focus target, and stays still for reduced-motion users.
