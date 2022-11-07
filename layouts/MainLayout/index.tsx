import React, { PropsWithChildren } from 'react';
import AppHeader from '@components/AppHeader';

/*
 * This is the main layout for the app
 */
const MainLayout: React.FC<PropsWithChildren> = ({ children }) => (
    <>
        <AppHeader />
        <main>{children}</main>
    </>
);

export default MainLayout;
