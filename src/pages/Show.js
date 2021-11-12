import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Show = (props) => {
  // grab the navigate function
  const navigate = useNavigate();
  // get the params object
  const params = useParams();
  // grab the id from params
  const id = params.id;
  // grab people from props
  const people = props.people;
  // create state for form
  const [editForm, setEditForm] = useState({});
  // useEffect to set state to the existing person, when the data is available
  useEffect(() => {
    if (props.people) {
      const person = people.find((p) => p._id === id);
      setEditForm(person);
    }
  }, [props.people]);

  if (props.people) {
    // grab the target person from the people array
    const person = people.find((p) => p._id === id);

    // handleChange function for form
    const handleChange = (event) => {
      // create a copy of the state
      const newState = { ...editForm };
      // update the newState
      newState[event.target.name] = event.target.value;
      // update the state
      setEditForm(newState);
    };

    // handleSubmit for form
    const handleSubmit = (event) => {
      // prevent the refresh
      event.preventDefault();
      // pass the form data to updatePeople
      props.updatePeople(editForm, person._id);
      // redirect people back to index
      navigate("/");
    };

    const removePerson = () => {
      props.deletePeople(person._id);
      navigate("/");
    };

    const form = (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.image}
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.title}
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input type="submit" value="Update Person" />
      </form>
    );

    return (
      <div className="person">
        <h1>{person.name}</h1>
        <h2>{person.title}</h2>
        <img src={person.image} alt={person.name} />
        {form}
        <button onClick={removePerson}>DELETE PERSON</button>
      </div>
    );
  } else {
    return <h1>No Person</h1>;
  }
};

export default Show;
