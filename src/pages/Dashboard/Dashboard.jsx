import { checkToken } from "../../utilities/users-service";

export default function Dashboard() {

  async function handleCheckToken() {
    const expDate = await checkToken();
    console.log(expDate);
  }

  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={ handleCheckToken }>Check When My Login Expires</button>
    </>
  );
}