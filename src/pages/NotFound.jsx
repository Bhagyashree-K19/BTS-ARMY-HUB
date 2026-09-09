import { NavLink } from 'react-router-dom'
import Button from '../components/Button.jsx'

function NotFound() {
  return (
    <div className="page-shell text-center py-12">
      <h1 className="text-8xl text-primary mb-0">404</h1>
      <h2 className="mb-4">Page not found</h2>
      <p className="mb-6">Looks like this page wandered off during a world tour. Let's get you back home.</p>
      <NavLink to="/">
        <Button variant="primary">Back to Home</Button>
      </NavLink>
    </div>
  )
}

export default NotFound
