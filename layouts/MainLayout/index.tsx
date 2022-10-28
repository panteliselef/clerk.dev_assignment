import React, { PropsWithChildren } from 'react';
import AppHeader from '@components/AppHeader';

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => (
    <>
        <AppHeader />
        <main>{children}</main>
    </>
);

export default MainLayout;
