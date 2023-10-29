import { Box, Heading, Link } from "@chakra-ui/react";

const NotFound = () => {
  //i get it now !!

  // //this Object Storm is a constructor function with no properties yet
  // var Storm = function () {};
  // //we use prototype to add a new prop "precip" to the Storm constructor
  // Storm.prototype.precip = 'rain';
  // //we then make a new Object WinterStorm with no predefined props 
  // var WinterStorm = function () {};
  // // then WinterStorm inherits the prop precip with the value 'rain' from Storm
  // WinterStorm.prototype = new Storm();
  // //we then change the precip prop in WinterStorm from value 'rain' to 'snow'
  // WinterStorm.prototype.precip = 'snow';
  // var bob = new WinterStorm();
  // var todd = new Storm();
  // console.log("WinterStorm is: "+ bob.precip); // 'snow'
  // console.log("Storm is: " +todd.precip); // 'rain'

  // example of an IIFE (Immediatly Invoked Function Expression)
  //could be actually useful if i have any process in this project that only need to be executed once
  // (function() {
  //   var x = 20;
  //   var y = 20;
  //   var answer = x + y;
  //   console.log(answer);
  //   })();

  //currying example from LinkedIn
 /*  function makeAdder(x) {
    return function (y) {
      return x + y;
    };
  }
  
  var addFive = makeAdder(5);
  console.log(addFive(3));
   */
  
  // let animals = [{ type: 'lion' }, 'tiger'];
  // let clones = animals.slice();

  // clones[0].type = 'bear';
  // clones[1] = 'sheep';

  // console.log(animals, clones);

  // console.log(animals[0].type, clones[0].type);
  // console.log(animals[1], clones[1]);
  
  let obj = {a:1, b:2, c:3, d:4}
  let {c, ...rest} = obj
  
  console.log("third prop", c)
  console.log("rest of the props", rest)
  
  return ( 
      <Box>
      <a id="top"/>
      <Heading>Page Not Found</Heading>
      

      <Link href="/">Back to Homepage</Link>
      <br />

      <p>x&lt;y&z&gt;w</p>

      <a href="https://www.google.com/webhp?hl=en&sa=X&ved=0ahUKEwibkaOArLSBAxVIS0EAHUY7BywQPAgJ">
        <p>Additional Information</p>
      </a>

      
      <br />

      <details>
        <h4>Parmesan Deviled Eggs</h4>
        <p>
          These delectable little bites are made with organic eggs, fresh Parmesan, and chopped pine nuts.
        </p>
      </details>

      <br />
      
      <form action="/choices" disabled>
        <fieldset>
          <legend>choices</legend>
          <label>Choice 1 <input type="radio" name="choice" value="choice1" /></label>
          <label>Choice 2 <input type="radio" name="choice" value="choice1" /></label>
          <label>Choice 3 <input type="radio" name="choice" value="choice1" /></label>
          <label>Choice 4 <input type="radio" name="choice" value="choice1" /></label>
          <button>Choose!</button>
        </fieldset>
      </form>
      <br />

      <form action="/choices" disabled>
        <fieldset>
          <legend>Choices</legend>
          <label>Choice 1 <input type="radio" name="choice" value="choice1" /></label>
          <label>Choice 2 <input type="radio" name="choice" value="choice2" /></label>
          <label>Choice 3 <input type="radio" name="choice" value="choice3" /></label>
          <label>Choice 4 <input type="radio" name="choice" value="choice4" /></label>
          <button>Choose!</button>
        </fieldset>
      </form>

      <label htmlFor="example">Make a choice:</label>
      <input list="choices" id="example" name="example" style={{border: "2px solid black"}}/>

      <datalist id="choices">
        <option value="Choice 1" />
        <option value="Choice 2" />
        <option value="Choice 3" />
        <option value="help me" />
      </datalist>

      <section itemScope itemType="http://schema.org/Restaurant">
        <h1 itemProp="name">Nadia's Garden</h1>
        <p itemScope itemProp="Aggregate Rating" itemType="http://schema.org/AggregateRating">
          <span itemProp="ratingValue">4.5</span> stars - based on
          <span itemProp="reviewCount"> 120</span> reviews
        </p>
      </section>
      
      <nav>
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
      </nav>

      

      <div>
        Lorem ipsum <dfn>dolor</dfn> sit amet consectetur adipisicing elit. Repudiandae ducimus nulla neque illum debitis eaque 
        nobis tenetur animi. Laudantium, dolorum ipsam. Animi architectoutghjdfgjd<wbr />hgjdghjdfgfjdghjdfreiciendis quibusdam, iste assumenda officiis ipsum.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam optio at distinctio dolore repellendus quae tempore, ut 
        voluptate labore corporis corrupti, alias officia, eum fuga in ullam modi consequatur a!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor animi, facilis in aut fugiat, adipisci laborum modi velit 
        suscipit ab blanditiis possimus necessitatibus? Mollitia amet, perferendis magni sit possimus debitis?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat incidunt eaque, iusto adipisci sequi quisquam vel! Inventore
        reiciendis adipisci perspiciatis doloremque est quasi eaque autem eius, officiis ipsum dicta fuga.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit temporibus et unde in aperiam facere ipsa repellat! Ratione 
        quibusdam nesciunt, beatae sint accusamus quia hic maiores, eius, voluptatem quis libero.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, soluta ducimus beatae, facilis magni sed illum corporis 
        voluptate autem quam necessitatibus excepturi quibusdam repellat placeat vitae qui? Molestias, minima repellendus!
      </div>

      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ducimus nulla neque illum debitis architecto ut eaque 
        nobis tenetur animi. Laudantium, dolorum ipsam. Animi reiciendis quibusdam, iste assumenda officiis ipsum.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam optio at distinctio dolore repellendus quae tempore, ut 
        voluptate labore corporis corrupti, alias officia, eum fuga in ullam modi consequatur a!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor animi, facilis in aut fugiat, adipisci laborum modi velit 
        suscipit ab blanditiis possimus necessitatibus? Mollitia amet, perferendis magni sit possimus debitis?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat incidunt eaque, iusto adipisci sequi quisquam vel! Inventore
        reiciendis adipisci perspiciatis doloremque est quasi eaque autem eius, officiis ipsum dicta fuga.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit temporibus et unde in aperiam facere ipsa repellat! Ratione 
        quibusdam nesciunt, beatae sint accusamus quia hic maiores, eius, voluptatem quis libero.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, soluta ducimus beatae, facilis magni sed illum corporis 
        voluptate autem quam necessitatibus excepturi quibusdam repellat placeat vitae qui? Molestias, minima repellendus!
      </div>

      <br />

      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ducimus nulla neque illum debitis architecto ut eaque 
        nobis tenetur animi. Laudantium, dolorum ipsam. Animi reiciendis quibusdam, iste assumenda officiis ipsum.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam optio at distinctio dolore repellendus quae tempore, ut 
        voluptate labore corporis corrupti, alias officia, eum fuga in ullam modi consequatur a!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor animi, facilis in aut fugiat, adipisci laborum modi velit 
        suscipit ab blanditiis possimus necessitatibus? Mollitia amet, perferendis magni sit possimus debitis?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat incidunt eaque, iusto adipisci sequi quisquam vel! Inventore
        reiciendis adipisci perspiciatis doloremque est quasi eaque autem eius, officiis ipsum dicta fuga.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit temporibus et unde in aperiam facere ipsa repellat! Ratione 
        quibusdam nesciunt, beatae sint accusamus quia hic maiores, eius, voluptatem quis libero.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, soluta ducimus beatae, facilis magni sed illum corporis 
        voluptate autem quam necessitatibus excepturi quibusdam repellat placeat vitae qui? Molestias, minima repellendus!
      </div>

      <br />

      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ducimus nulla neque illum debitis architecto ut eaque 
        nobis tenetur animi. Laudantium, dolorum ipsam. Animi reiciendis quibusdam, iste assumenda officiis ipsum.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam optio at distinctio dolore repellendus quae tempore, ut 
        voluptate labore corporis corrupti, alias officia, eum fuga in ullam modi consequatur a!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor animi, facilis in aut fugiat, adipisci laborum modi velit 
        suscipit ab blanditiis possimus necessitatibus? Mollitia amet, perferendis magni sit possimus debitis?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat incidunt eaque, iusto adipisci sequi quisquam vel! Inventore
        reiciendis adipisci perspiciatis doloremque est quasi eaque autem eius, officiis ipsum dicta fuga.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit temporibus et unde in aperiam facere ipsa repellat! Ratione 
        quibusdam nesciunt, beatae sint accusamus quia hic maiores, eius, voluptatem quis libero.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, soluta ducimus beatae, facilis magni sed illum corporis 
        voluptate autem quam necessitatibus excepturi quibusdam repellat placeat vitae qui? Molestias, minima repellendus!
      </div>

      <br />



      <a href="#top">back to top</a>
      

      </Box> 
    );
}
 
export default NotFound;