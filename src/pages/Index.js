import { useState } from "react";
import { Link } from "react-router-dom";

const Index = (props) => {
  // state to hold formData
  const [newForm, setNewForm] = useState({
    name: "",
    countryOfOrigin: "",
    image: "",
  });

  // Handle Change Function to sync input with state
  const handleChange = (event) => {
    //make a copy of state
    const newState = {...newForm}
    // update the newState
    newState[event.target.name] = event.target.value
    // update the state 
    setNewForm(newState)
}

  // handle submit function for form
  const handleSubmit = (event) => {
    event.preventDefault();
    props.createCheese(newForm)
    setNewForm({
      name: "",
      countryOfOrigin: "",
      image: "",
    });
  };

  const form = <form onSubmit={handleSubmit}>
  <input 
  type="text" 
  value={newForm.name}
  name="name" 
  placeholder="name" 
  onChange={handleChange}
  />
   <input
  type="text"
  value={newForm.countryOfOrigin}
  name="countryOfOrigin"
  placeholder="Country Of Origin"
  onChange={handleChange}
  />
  <input
  type="text"
  value={newForm.image}
  name="image"
  placeholder="Image URL"
  onChange={handleChange}
  />
  <input type="submit" value="Create Cheese" />
  </form>

if (props.cheese) {
return (
<section>
  {form}
  {props.cheese.map((cheese) => {
    return (
      <div key={cheese._id} className="cheese">
        <Link to={`/cheese/${cheese._id}`}>
          <h1>{cheese.name}</h1>
        </Link>
        <h3>{cheese.countryOfOrigin}</h3>
        <img src={cheese.image} alt={cheese.name} />
      </div>
    );
  })}
</section>
);
} else {
return (
<section>
  {form}
  <h1>Loading...</h1>
</section>
);
}
};

export default Index;