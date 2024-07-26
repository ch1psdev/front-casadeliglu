import { Inventario } from "../modules/mantenedor/components/Inventario"
import { Mantenedor } from "../modules/mantenedor/views/Mantenedor"

export const PanelRoutes = () => {
  return (
    <>
        {/* <Routes> */}
            <Route path='/panel2' element={<Mantenedor />}>
                <Route path='/inventario' element={<Inventario />}/>
            </Route>
        {/* </Routes> */}
    </>
  )
}
