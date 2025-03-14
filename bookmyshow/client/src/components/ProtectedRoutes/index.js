import { message, Layout, Menu, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../../api/users";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { SetUser } from "../../redux/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HomeOutlined, ProfileOutlined, UserOutlined, LoginOutlined } from "@ant-design/icons";
import { fetchMovies } from "../../redux/movieSlice";
import { fetchTheatres } from "../../redux/theatreSlice";
import { fetchShowsByTheatre } from "../../redux/showSlice";

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(store => store.users);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    //Movies List Fetch 
    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);


    //Theatre List fetched
    useEffect(() => {
        dispatch(fetchTheatres());
    }, [dispatch]);



    //Get Current User
    const getValidUser = async () => {
        try {
            dispatch(showLoading());
            const response = await GetCurrentUser();
            dispatch(SetUser(response.data.data));
        } catch (error) {
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
                    key: 'logout'
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
                {/* <Layout>
                    <Header className="z-1 d-flex justify-content-between align-content-center sticky w-100 top-0">
                        <h1 className="text-white m-0">Book My Show</h1>
                        <Menu theme="dark" mode="horizental" className="main-nav" items={navItems} />
                    </Header>
                 
                    <div className="pading-3 min-height-300 bg-white">{children}</div>
                </Layout> */}
                <Layout>
                    <Header className="z-1  sticky px-2">
                        <Row className='justify-content-between' gutter={{ xs: 10, sm: 10, md: 16, lg: 32 }} >
                            <Col span={{ xs: 24, sm: 24, md: 16, lg: 16 }}>
                                <h1 className="text-white m-0">Book My Show</h1>
                            </Col>
                            <Col span={{ xs: 24, sm: 24, md: 8, lg: 8 }}>
                                <Menu theme="dark" mode="horizental" className="main-nav" items={navItems} />
                            </Col>
                        </Row>
                    </Header>

                    <div className="pading-3 min-height-300 bg-white">{children}</div>
                </Layout>
            </>
        )

    )
}
export default ProtectedRoute;