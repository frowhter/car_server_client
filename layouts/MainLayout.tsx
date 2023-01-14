import React from "react";
import Footer from "../components/UI/Footer/footer";

interface LayoutProps {
    children?: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({children}) => {
    return (
        <>
            {children}
           <Footer/>
        </>
    );
};

export default MainLayout;