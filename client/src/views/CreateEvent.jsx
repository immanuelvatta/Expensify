import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../services/eventService";

const initialEvent = {
  eventName: "",
  description: "",
  eventDate: "",
  userId : 1,
};

function CreateEvent() {
  const [event, setEvent] = useState(initialEvent);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("eventName", event.eventName);
    formData.append("description", event.description);
    formData.append("eventDate", event.eventDate);
    formData.append("userId", event.userId);
    createEvent(formData)
      .then(() => navigate("/home"))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="card shadow">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Event Name:
              </label>
              <input
                type="text"
                name="eventName"
                id="eventName"
                className="form-control"
                value={event.eventName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Event Description:
              </label>
              <textarea
                name="description"
                id="description"
                className="form-control"
                value={event.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="language" className="form-label">
                Event Date
              </label>
              <input
                type="date"
                name="eventDate"
                id="eventDate"
                className="form-control"
                value={event.eventDate}
                onChange={handleChange}
              />
            </div>
            <div className="text-end">
              <button type="submit" className="btn btn-primary">
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
