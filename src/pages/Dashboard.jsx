import React from "react";
import { useAppState } from "../AppState.jsx";
import { Route, Link } from "react-router-dom";
import Form from "../components/Form.jsx";

const Dashboard = (props) => {
  const { state, dispatch } = useAppState();
  const { token, url, notes, username } = state;

  const getNotes = async () => {
    const response = await fetch(url + "/notes/", {
      method: "get",
      headers: {
        Authorization: "bearer " + token,
      },
    });
    const fetchedNotes = await response.json();
    dispatch({ type: "getNotes", payload: fetchedNotes });
  };

  React.useEffect(() => {
    getNotes();
  }, []);

  const loaded = () => {
    return (
      <div className="dashboard">
        <h1>{username}'s Notes</h1>
        <Link to="/dashboard/new">
          <button>New Note</button>
        </Link>
        <Route
          path="/dashboard/:action"
          render={(rp) => <Form {...rp} getNotes={getNotes} />}
        />
        <ul>
          {state.notes.map((note) => (
            <div className="note" key={note.id}>
              <h2>{note.title}</h2>
              <h4>{note.body}</h4>
              <button
                onClick={() => {
                  dispatch({ type: "select", payload: note });
                  props.history.push("/dashboard/edit");
                }}
              >
                Edit Note
              </button>
              <button
                onClick={() => {
                  fetch(url + "/notes/" + note.id, {
                    method: "delete",
                    headers: {
                      Authorization: "bearer " + token,
                    },
                  }).then(() => getNotes());
                }}
              >
                Delete Note
              </button>
            </div>
          ))}
        </ul>
      </div>
    );
  };

  return notes ? loaded() : <h1>Loading...</h1>;
};

export default Dashboard;
