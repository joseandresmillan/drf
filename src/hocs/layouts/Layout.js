import { connect  } from "react-redux"; /*Conexion con redux  */

function Layout({children}){
    return(
        <div>
            {children}
        </div>
    )
}
const mapStateToProps =  state => ({
 // Aquí se conectan los estados del store al componente Layout  //
})

export default connect (mapStateToProps, {})(Layout)