import {useState, useEffect} from "react"
import {useParams, useNavigate} from "react-router-dom"

const Show = (props) => {
  const params = useParams()
  const navigate = useNavigate()
  const id = params.id
  const cheese = props.cheese
  // State
  const [editForm, setEditForm] = useState({})

  // useEffet to handle page refresh error when refreshing the state
  useEffect(() => {
    if(props.cheese){
  const cheeses = cheese.find((c) => c._id === id);
  setEditForm(cheeses)
    }
  }, [props.cheese])
  
 if(props.cheese){
  const cheeses = cheese.find((c) => c._id === id);
  // Handle Change
  const handleChange = (event) => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value})
  }

  // Submit
  const handleSubmit = (event) => {
    event.preventDefault()
    props.updateCheese(editForm, cheeses._id)
    // redirect
    navigate("/")
  }

  const removeCheese = () => {
    props.deleteCheese(cheeses._id);
    navigate("/");
  };

  const form = <form onSubmit={handleSubmit}>
  <input
    type="text"
    value={editForm.name}
    name="name"
    placeholder="name"
    onChange={handleChange}
  />
  <input
    type="text"
    value={editForm.countryOfOrigin}
    name="countryOfOrigin"
    placeholder="Country Of Origin"
    onChange={handleChange}
  />
  <input
    type="text"
    value={editForm.image}
    name="image"
    placeholder="image URL"
    onChange={handleChange}
  />
  <input type="submit" value="Update Cheese" className="update"/>
</form>

return (
  <div className="cheese">
    <h1>{cheeses.name}</h1>
    <h2>{cheeses.countryOfOrigin}</h2>
    <img src={cheeses.image} alt={cheeses.name} />
    {form}
    <button id="delete" onClick={removeCheese}>
      Delete
      </button>
  </div>
 )
 } else {
   return <h1>No Cheese</h1>
 }
}

export default Show;