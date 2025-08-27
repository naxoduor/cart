import './navbarthree.css'
import { useNavigate } from 'react-router-dom'
import { fetchCategoriesByDepartment, fetchProductsByCategoryName } from '../../action/requestActions'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { event } from 'jquery'


const navigateToHomePage = (navigate) => {
    navigate("/")
}


function Navbar(props) {
    const navigate = useNavigate()
    const [catalogueOne, setCatalogueOne] = (useState([]))
    const [catalogueTwo, setCatalogueTwo] = useState([])
    const [catalogueThree, setCatalogueThree] = useState([])
    const [searchText, setSearchText] = useState('')
    const [error, setError] = useState([])

    const fetchByCategoryName = async (name) => {
        props.fetchProductsByCategoryName(name)
    }

    const handleSearchClicked = (event) => {
        event.preventDefault()
        props.fetchProductsByCategoryName(searchText)
    }


    const handleChange = async (event) => {
        setSearchText(event.target.value)
    }

    const handleShoppingCartClicked = (event) => {
    event.preventDefault()
    navigate('/cart')
}

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                setCatalogueOne((await fetchCategoriesByDepartment(1)).data);
                setCatalogueTwo((await fetchCategoriesByDepartment(2)).data);
                setCatalogueThree((await fetchCategoriesByDepartment(3)).data);
            }
            catch (err) {
                setError(err)
            }
        }
        fetchData();

    }, [])

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                    {/* <a class="navbar-brand" href="#">
                        <img src="https://mdbootstrap.com/img/Marketing/mdb-press-pack/mdb-dark.jpg" alt="" width="50"
                            height="30" />Navbar
                    </a> */}
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-targer="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => navigateToHomePage(navigate)}>
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <a class="nav-link" href="#">Link</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">Products</a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li>
                                        <hr class="dropdown-divider" />
                                    </li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                        </ul>
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleChange} />
                            <button class="btn btn-outline-success" type="submit" onClick={handleSearchClicked}>Search</button>
                            <button class="btn btn-outline-success m-2" onClick={handleShoppingCartClicked}><i class="bi bi-cart"></i></button>
                        </form>
                    </div>
                </div>
            </nav>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel">
                <div class="modal-dialog w-full">
                    <div class="modal-content w-full">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Catalogue</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col">
                                    {/* <h6 class="dropdown-header">Category 1</h6> */}
                                    {catalogueOne.map((item) => (<a class="dropdown-item" href="#" data-bs-dismiss="modal" onClick={() => fetchByCategoryName(item.name)}>{item.name}</a>))}

                                </div>
                                <div class="col">
                                    {/* <h6 class="dropdown-header">Category 2</h6> */}
                                    {catalogueTwo.map((item) => (<a class="dropdown-item" href="#" data-bs-dismiss="modal" onClick={() => fetchByCategoryName(item.name)}>{item.name}</a>))}
                                </div>
                                <div class="col">
                                    {/* <h6 class="dropdown-header">Category 3</h6> */}
                                    {catalogueThree.map((item) => (<a class="dropdown-item" href="#" data-bs-dismiss="modal" onClick={() => fetchByCategoryName(item.name)}>{item.name}</a>))}
                                </div>
                            </div>
                        </div>
                        {/* <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}



const mapDispatchToProps = (dispatch) => {
    return {
        fetchProductsByCategoryName: (name) => dispatch(fetchProductsByCategoryName(name))
    }
}

export default connect(null, mapDispatchToProps)(Navbar)
