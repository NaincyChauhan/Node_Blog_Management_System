import { useSelector } from 'react-redux';

export default function Dashboard() {
    const user = useSelector((state) => state.user);

    return (
        <div>
            <h3>User dashboard is here</h3>
            <h4>Hello! {user.data ? user.data.fullname : ""}</h4>
        </div>
    )
}