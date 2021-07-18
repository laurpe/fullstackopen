import React from 'react';

const Header = ({ name }: {name: string} ) => {

    return (
        <div>
            <h2>
                {name}
            </h2>
        </div>
    );
};

export default Header;