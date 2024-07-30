import { Outlet } from 'react-router-dom';

function DeckLayout() {
    return (
        <div>
            <Outlet />
        </div>
    );
}

export default DeckLayout;