## 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Ans:  The difference between document.getElementById(),document.getElementsByClassName() and document.querySelector() or document.querySelectorAll() is getElementById take only one unique id to select one element. and this is little bit faster than any other selector.same as getElementsByClassName take  class name to select multiple element. And querySelector() returns the first match, while querySelectorAll() returns all matching elements


## 2. How do you create and insert a new element into the DOM?

Ans: To create and insert a new element into the dom,  first create the element using document.createElement() and then insert it into an existing element by using appendChild().


## 3.What is Event Bubbling? And how does it work?

Ans: Event bubbling means when we click on a child element, the  first event happen on that element and then moves up to its parent elements step by step. For example, if I click a button inside a div, first button event run , then the div event run.

## 4. What is Event Delegation in JavaScript? Why is it useful?

Ans:Event delegation is when we add an event listener to a parent element instead of adding it to many child elements. Because of event bubbling, the parent can detect which child was clicked. It is useful because it improves performance and also works for dynamically added elements.


## 5. What is the difference between preventDefault() and stopPropagation() methods?


Ans: preventDefault() stops the default behavior of an element, like stopping a form from reloading the page. stopPropagation() stops the event from moving to parent elements like stopping event bubble.


