import { useState } from "react";
import { Link } from "react-router-dom";

const Index = (props) => {
  // state to hold form data
  const [newForm, setNewForm] = useState({
    name: "",
    image: "",
    title: "",
  });
  //handleChange function to sync input with state
  const handleChange = (event) => {
    // make a copy of state
    const newState = { ...newForm };
    // update the newState
    newState[event.target.name] = event.target.value;
    // update the state
    setNewForm(newState);
  };
  // handleSubmit function for when form is submitted
  const handleSubmit = (event) => {
    // prevent the page from refreshing
    event.preventDefault();
    // pass the form data to createPeople function
    props.createPeople(newForm);
    // reset the form to empty
    setNewForm({
      name: "",
      image: "",
      title: "",
    });
  };
  const form = (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newForm.name}
        name="name"
        placeholder="name"
        onChange={handleChange}
      />
      <input
        type="text"
        value={newForm.image}
        name="image"
        placeholder="Image URL"
        onChange={handleChange}
      />
      <input
        type="text"
        value={newForm.title}
        name="title"
        placeholder="title"
        onChange={handleChange}
      />
      <input type="submit" value="Create Person" />
    </form>
  );

  if (props.people) {
    return (
      <section>
        {form}
        {props.people.map((person) => {
          return (
            <div key={person._id} className="person">
              <Link to={`/people/${person._id}`}>
                <h1>{person.name}</h1>
              </Link>
              <img src={person.image} alt={person.name} />
              <h3>{person.title}</h3>
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
