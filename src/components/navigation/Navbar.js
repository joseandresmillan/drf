import { connect } from "react-redux";

function Navbar(){
    return (
        <nav className="w-full py-10 shadow-md fixed">
            Navbar
        </nav>
    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps,{}) (Navbar)