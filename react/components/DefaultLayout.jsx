import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {useEffect} from "react";
import axiosClient from "../src/axios-client.js";

export default function DefaultLayout() {
   const {user, token, notification, setUser, setToken} = useStateContext()

  const onLogout = (ev) => {
     ev.preventDefault()

    axiosClient.post('/logout')
      .then(()=> {
        setUser({})
        setToken(null)
      })
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data)
      })
  }, [])

    if(!token) {
      return <Navigate to="/login" />
    }

    return  (
        <div id="defaultLayout">
          <aside>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/users">Users</Link>
          </aside>

          <div className="content">
            <header>
              <div>
                Header
              </div>

              <div>
                {user.name} &nbsp; &nbsp;
                <a onClick={onLogout} className="btn-logout" href="#">Logout</a>
              </div>
            </header>

            <main>
              <Outlet/>
            </main>
          </div>
          { notification &&
            <div className="notification">
              {notification}
            </div>
          }
        </div>
    )
}
