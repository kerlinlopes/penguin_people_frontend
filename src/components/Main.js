import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

const Main = (props) => {
  // State to hold our list of people
  const [people, setPeople] = useState(null);

  // your deployed heroku URL
  const URL = "https://kl-penguin-people-backend.herokuapp.com/people/";

  // function to get updated list of people
  const getPeople = async () => {
    // make the api call
    const response = await fetch(URL);
    // turn the response in an object
    const data = await response.json();
    // set the state to the api data
    setPeople(data);
  };

  // function that will later be passed data from our new/create form and make the post request to create a new person
  const createPeople = async (person) => {
    // make the post request to our API
    await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    // get updated list of people
    getPeople();
  };

  // function to update a person
  const updatePeople = async (person, id) => {
    // make the put request
    await fetch(URL + id, {
        method: "put",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(person)
    })
    // update the list of people
    getPeople()
}

// create function to delete a person
const deletePeople = async (id) => {
    // make the delete request
    await fetch(URL + id, {
        method: "delete"
    })
    // update the list of people
    getPeople()
}

  // a useEffect to make a call to getPeople when page loads
  useEffect(() => {
    getPeople();
  }, []);


  return (
    <main>
      <Routes>
        <Route path="/" element={
        <Index people={people} createPeople={createPeople}/>
        } />
        <Route path="/people/:id" element={
        <Show people={people} updatePeople={updatePeople} deletePeople={deletePeople}/>} 
        />
      </Routes>
    </main>
  );
};

export default Main;
