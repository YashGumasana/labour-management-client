import React, { useEffect, useState } from 'react'
import NotFound from '../components/NotFound'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loading from '../components/alert/Loading'

const generatePage = (pageName, category) => {
    let page = '';
    if (category === 2) {
        page = 'officer';
    }
    else if (category === 0) {
        page = 'labour';
    }
    else if (category === 1) {
        page = 'contractor';
    }
    const component = () => require(`../pages/${page}/${pageName}`).default;
    try {
        return React.createElement(component());
    } catch (error) {
        return <NotFound />;
    }
};

const PageRender = () => {
    const { page, id } = useParams();
    const { auth } = useSelector(state => state);
    const [isLoading, setIsLoading] = useState(true);
    const [pageName, setPageName] = useState('');

    useEffect(() => {
        const loadPage = async () => {
            let loadedPageName = '';
            if (auth.token) {
                if (id) {
                    loadedPageName = `${page}/[id]`;
                } else {
                    loadedPageName = `${page}`;
                }
            }
            console.log('*********************', loadedPageName, 'loadedPageName-----------------------------------------');
            setPageName(loadedPageName);
            setIsLoading(false);
        };



        loadPage();
    }, [auth.token, auth?.user?.category, id, isLoading, page]);

    if (isLoading) {
        return <Loading className='alert-container loading' />;
    }

    return <>{pageName && generatePage(pageName, auth?.user?.category)}</>;
};





export default PageRender
