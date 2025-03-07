import { message, Layout, Menu, } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../../api/users";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { SetUser } from "../../redux/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HomeOutlined, ProfileOutlined, UserOutlined, LoginOutlined } from "@ant-design/icons";
import { fetchMovies } from "../../redux/movieSlice";
import { fetchTheatres } from "../../redux/theatreSlice";

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(store => store.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Movies List Fetch 
    useEffect(() => {
        dispatch(showLoading());
        dispatch(fetchMovies()).finally(() => {
            dispatch(hideLoading());
        });
    }, [dispatch]);


    //Theatre List fetched
    useEffect(() => {
        dispatch(showLoading());
        dispatch(fetchTheatres()).finally(() => {
            dispatch(hideLoading());
        });
    }, [dispatch]);

    //Get Current User
    const getValidUser = async () => {
        try {
            dispatch(showLoading());
            const response = await GetCurrentUser();
            console.log(response);
            dispatch(SetUser(response.data.data));
        } catch (error) {
            console.log("error", error);
            message.error("Please login again");
            dispatch(hideLoading());
            dispatch(SetUser(null))
        }
    }

    // Navigation Items
    const navItems = [
        {
            label: 'Home',
            key: 'home',
            icon: <HomeOutlined />
        },
        {
            label: `${user ? user.name : ""}`,
            key: 'users',
            icon: <UserOutlined />,
            children: [
                {
                    label: (<span onClick={() => {
                        if (user.role === 'admin') {
                            navigate('/admin');
                        } else if (user.role === 'partner') {
                            navigate('/partner');
                        } else {
                            navigate('/profile');
                        }
                    }}>MyProfile</span>),
                    icon: <ProfileOutlined />,
                    key: 'dashboard'
                },
                {
                    label: (<span onClick={() => {
                        localStorage.removeItem('access_token');
                        navigate('/login');
                    }}>Logout</span>),
                    icon: <LoginOutlined />,
                    key: 'login'
                }
            ]
        },
    ];


    const { Header, Footer, Sider, Content } = Layout;



    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            getValidUser();
        } else {
            navigate('/login');
        }
    }, []);

    return (
        user && (
            <>
                <Layout>
                    <Header className="z-1 d-flex justify-content-between align-content-center sticky w-100 top-0">
                        <h1 className="text-white m-0">Book My Show</h1>
                        <Menu theme="dark" mode="horizental" className="main-nav" items={navItems} />
                    </Header>
                    <div className="pading-3 min-height-300 bg-white">{children}</div>
                </Layout>
            </>
        )

    )
}
export default ProtectedRoute;