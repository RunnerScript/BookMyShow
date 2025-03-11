import { useMemo, useEffect } from "react";
import ShowForm from "./ShowForm";
import DeleteMovieModal from "./DeleteMovieModal";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { openModal, openDeleteModal } from "../../redux/showSlice";
import { useParams } from "react-router-dom";
import { fetchShowsByTheatre } from "../../redux/showSlice";
import moment from "moment";

//import { openModal } from "../../redux/showSlice";
const ShowList = () => {
    //Fetching the Movie States
    const {
        list: shows,
        selectedShow,
        isModalOpen,
        isDeleteModalOpen,
        formType,
        status,
        error } = useSelector((store) => store.shows);

    const dispatch = useDispatch();

    const { theatre } = useParams();
    const theatreDetails = theatre.split('___');

    const theatreName = theatreDetails[0];
    const theatreId = theatreDetails[1];

    useEffect(() => {
        dispatch(fetchShowsByTheatre(theatreId));
    }, [dispatch]);

    //Adding keys to Shows
    const showsData = useMemo(() => {
        return shows.map((item) => {
            return { ...item, key: `show${item._id}` }
        })
    }, [shows]);


    if (theatreDetails.length <= 1) {
        return <>
            <h1>Invalid Route</h1>
        </>
    }
    //Table Heading for Movie Table
    const tableHeadings = [

        {
            title: "Show Name",
            dataIndex: "name",
            key: "showName"
        },
        {
            title: "Show Date",
            dataIndex: "date",
            key: "showDate",
            render: (text, data) => {
                return moment(data.date).format("MMM Do YYY");
            }
        },
        {
            title: "Time",
            dataIndex: "time",
            key: "showTime",
            render: (text, data) => {
                return moment(text, "HH:mm").format("hh:mm A");
            }
        },
        {
            title: "Movie",
            dataIndex: "movie",
            key: "movie",
            render: (text, data) => {
                if (data.movie.movieName) {
                    return data.movie.movieName;
                }
                //return data.movie.movieName;
            }

        },

        {
            title: "Total Seats",
            dataIndex: "totalSeats",
            key: "totalSeats"
        },
        {
            title: "Ticket Price",
            dataIndex: "ticketPrice",
            key: "ticketPrice"
        },
        {
            title: "Available Seats",
            dataIndex: "seats",
            key: "seats",
            render: (text, data) => {
                return data.totalSeats - data.bookedSeats;
            }
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, data) => {
                return (
                    <div>
                        <Button className="btn-tables" onClick={() => {
                            dispatch(openModal({ show: data, formType: "edit" }));
                        }} > <EditOutlined /></Button>
                        <Button className="btn-tables" onClick={() => {

                        }}><DeleteOutlined /> </Button>
                    </div>
                )
            }
        }

    ];

    if (status === 'loading') {
        return (
            <div className="d-flex justify-content-end align-end   flex-col">
                Loading ...
            </div>
        )
    }
    return (
        <div className="m-2">
            <h1>{theatreName}</h1>
            <div className="d-flex justify-content-end align-end   flex-col">
                <Button className='max-width-100 ' onClick={async () => {
                    dispatch(openModal({ show: null, formType: "add" }));
                }}>Add Show</Button>
            </div>

            <Table dataSource={showsData} columns={tableHeadings} />
            {
                isModalOpen && (<ShowForm />)
            }
            {
                isDeleteModalOpen && (<>Delete me</>)
            }

        </div>
    );


}
export default ShowList;