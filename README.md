# Empathy test 
Antonio 04.06.2022

## Steps plan
 * Create and install app 

    * Vite
    * Configure eslint 
 * Build components structure
    
    * Avoid router to simplify app
    * create basic DDD structure

       * app
       * data provider
       * Opportunities component
       * plot component

 * Build faked backend or module to simulate load information logic

    * Create some sets of data to check chart
 * test ?

    * Create tests to validate load method
 * Install d3 
 * Build d3 canvas without information

    * Insert plot component to page
 * Add information to d3 canvas
 * Check 
 * test view

    * cypress with visual tests? 
 * Responsive ?
 * Complete readme with steps to install / test it
  

## Discarted ideas
* Plot component should allow more parameters to configure it, like colors, background, show labels or not, etc
* Create a real backend to return values
* Insert loading spinner into d3 canvas, not as a component out of d3 
* Add cypress with visual tests


## Ideas implemented
* _useGetOpportunities_ Is a faked method. it simulates a delay ( 750ms ) and returns a set of faked values
* Loading spinner is a component ( the worst you can think )
* Error shows a component ( the 2nd worst you can think )
* Create the component responsive.

   * The Plot component will adapt to the size of parent, being responsive if parent is
* Added labels to explain the meaning of green / red circles and blue line
* Radius from Cirles show the best opportunities. Bigger are better 

## Nice ideas I could implement
* Detect event resize windows and redraw component
* Instead to build the d3, use ScatterplotMatrix and be happy


# How to install and test it

 ## Install
   `yarn` 

 ## Run it
   `yarn dev`

 ## test
   `yarn test`

