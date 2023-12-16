Problem:
it's annoying to adjust heights, paddings and margins of elements exactly like in figma design files.

Idea:
create script (as excersize) to manipulate graphically those 3 sizes, then save result to additional css file ./adjust.css and additional html file ./index-adjusted.html, which is same as my original index.html, but with added inline classes to html elements

I can then try new html and see how it goes

################################

Description of interface:

after i add link to this script to the html that i am currently working on,
I get 4 buttons appear:

1. Height Adjustment mode
2. Padding Adjustment mode
3. Margin Adjustment mode
4. Finish adjustments and save

After clicking btns 1-3 I enter respective mode and there I can click on DOM elements and they get highlighted and become active for adjustments like that:

IN HEIGHT ADJUSTMENT MODE:
-you also get vertical line spanning the height of selected element
-and you get small input window where you can enter number of px from figma spec (even though it will be saved as rem under the hood)
-and you get 2 small triangles pointing up and down at the border-bottom indicating that you can drag&drop the border.

IN PADDING AGJUSTMENT MODE:
-you also get 2 triangles on each border to drag&drop and small input nearby to enter number of px
-also paddings if exist are highlighted

IN MARGIN AGJUSTMENT MODE:
-you also get 2 triangles on each border to drag&drop and small input nearby to enter number of px
-also margins if exist are highlighted

---

## what about media queries? leave it for later

HOW DO I DO THAT?

the plan:

script adds 1 event listener to the whole body or window, let's see

let MODE="none";
let CLICKED;

global event handler:
changes global var CLICKED to event.target

---

if (MODE == 'none') and btn 1-3 clicked,then it
changes global var MODE to reflect it and calls specific handler

if mode was none and 4 btn clicked then it saves work,hides btns,removes event listener,removes script link(?).

## otherwise retuns

specific handler-common part:

1. removes global event listener
2. removes buttons
3. adds save button
4. adds his event listener with attached event handler depending on the MODE

heightAdjustmentHandler:
if event.target is save-btn saveClicked(){ it changes MODE to none, it removes specific handler event listener, it hides save btn, it brings back 4 btns to be visible it adds global event listener again}

if event.target is another html el, then as described it highlights it, ads vert line, small input and adds bottom border and 2 triangles.

if event.target is triangles'-box then drag&drop and saveNewHeightValue()

if event.target is our input, then listen to changes and
saveNewHeightValue(){save value and add class to the element and add value to css to that class}

---

paddingAdjustmentHandler:
if event.target is save-btn saveClicked(){ it changes MODE to none, it removes specific handler event listener, it hides save btn, it brings back 4 btns to be visible it adds global event listener again}

if event.target is another html el, then as described it highlights it, highlights existing paddings, adds triangles on each border and small inputs

if event.target is triangles'-box then drag&drop and saveNewPaddingValue(whichSidePad,val)

if event.target is our input, then listen to changes and
saveNewPaddingValue(whichSidePad,val){save value and add class to the element and add value to css to that class}

---

marginAdjustmentHandler:
if event.target is save-btn saveClicked(){ it changes MODE to none, it removes specific handler event listener, it hides save btn, it brings back 4 btns to be visible it adds global event listener again}

if event.target is another html el, then as described it highlights it, highlights existing margins, adds triangles on each border and small inputs

if event.target is triangles'-box then drag&drop and saveNewMarginValue(whichSideMargin,val)

if event.target is our input, then listen to changes and
saveNewMarginValue(whichSidePad,val){save value and add class to the element and add value to css to that class}

UPDATE:

thinking again on UI architecture it's better to have 1 mode with ability to change size, padding and margin because it's less clicking and walking back-forth.

So new idea of controls is:
pressing SHIFT+ARROW lets adjust height and width of element using arrows
pressing Ctrl+ARROWx lets adjust padding-x with arrows
pressing Alt+ARROWx lets adjust margin-x with arrows

this way i can just quickly do all adjustments for the element and click next one.

Also my CONSOLE should be like grid of rectangles showing (DASHBOARD):
1.element we working on (tagName)
1.5 elements id and classes
2.what's 'display'(?) property of it (for example if it's flex or grid item then adjusting it wouldn't be smart)
3.calculated height,width,padding and margin 4. explaining of keystrokes

HOW DO I DO THAT?
i can have global eventListener which detects click on save&exit and shift,alt or ctrl modifiers pressed and also clicks on any elements of the page and Arrow keys.

Maybe to keep track i need to use LAST_CHOSEN_PROPERTY that would have recorded 'height','width','paddingLeft', 'paddingRight','paddingTop','paddingBottom','marginLeft', 'marginRight','marginTop','marginBottom'. Once you press ctrl or alt or shift + some arrow then evrything new value of LAST_CHOSEN_PROPERTY is set. If just arrow is pressed then the LAST_CHOSEN_PROPERTY will be passed to the function which modifies values.
That function can tell if element is not selected or property is not selected and also it can change those properties.

so in short:
LAST_CLICKED_EL is modified by clicking on elements. after new element is clicked the LAST_CHOSEN_PROPERTY stays from the last time. this way i can quickly for example set heights of all elements, then set another property of all elements etc
LAST_CHOSEN_PROPERTY is modified by pressing ctrl,alt,shift and arrows.
the modifier function uses global parameters to change LAST_CHOSEN_PROPERTY of LAST_CLICKED_EL +/-1px . It is called every time arrow is pressed.
