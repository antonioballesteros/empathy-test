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

    * Inside plot component
 * Add information to d3 canvas
 * Check 
 * test view

    * cypress with visual tests? 
 * Responsive ?
 * Complete readme with steps to install / test it
  

## Discarted ideas
* fake data with loading state, and some delay to simulate real network  
* Plot component should allow more parameters to configure it, like colors, background, show labels or not, etc
* Create a real backend to return values
* Add loading spinner to d3 canvas

## Ideas implemented
* _useGetOpportunities_ Is a faked method. it simulates a delay ( 750ms ) and returns a set of faked values
* Loading spinner is a component ( the worst you can think )
* Error shows a component ( the 2nd worst you can think )
